import React from 'react'
import { Line } from 'react-chartjs-2'
import fetch from 'node-fetch'
import {key} from '../actions/stockActions'
import _ from 'lodash'

const options = {
  animation: {
    duration: 0
  },
  title: {
    display: true, 
    text: "Historical"
  },
  legend: {
    position: 'left'
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  maintainAspectRatio: false ,
  elements: {
    point: {
      radius: 2,
    }
  }
}

const initialState = {
  initialized: false, 
  loaded: [],
  symbols: [],
  selected: new Map(),
  data: {
    labels: [],
    datasets: []
  }
}

class Graph extends React.Component {
  constructor(props){
    super(props)

    this.initializeState = this.initializeState.bind(this)
    this.getHistoricalData = this.getHistoricalData.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = initialState
  }

  componentWillMount(){
    this.initializeState(this.props)
  }

  initializeState(props) {
    const stocks = props.stocks.map(el => el.ticker)
    const unique = [...new Set(stocks.map(el => el))]
    // Already exists - no need to make api call 
    const exists = this.state.data.datasets.map(el => el.label)

    // Datasets still has the element which was removed
    // Find difference to unique and remove them from datasets
    const difference = _.difference(exists, unique)
    const newDataset = this.state.data.datasets.filter(el => {
      return !difference.includes(el.label)
    })

    const newData = {
      ...this.state.data,
      datasets: newDataset
    }

    this.setState({
      symbols: unique,
      loaded: exists,
      data: newData
    }, 
    this.getHistoricalData)
  }

  getHistoricalData() {
    this.state.symbols.map((el, i) => {
      // Check if dataset already exists, no point in fetching several times 
      if(!this.state.loaded.includes(el)){
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${el}&outputsize=compact&apikey=${key}`)
        .then(res => res.json())
        .then(json => {
          if(json['Error Message'] !== undefined){
            throw Error(json['Error Message'])
          }
          if(json['Note'] !== undefined) {
            alert("API call limit, try again soon")
          }
          const stockData = json['Time Series (Daily)']
          const dates = Object.keys(stockData).map(key => key)
          
          const pricesObj = dates.map(el => stockData[el])
          const pricesStr = pricesObj.map(el => el["4. close"])
          const prices = pricesStr.map(el => parseFloat(el))
          
          const symbol = json['Meta Data']['2. Symbol']
          const newState = [...this.state.data.datasets, {label: symbol, data: prices, fill:false}]
          
          this.setState({
            initialized: true, 
            data: { 
              labels: dates,
              datasets: newState
            }
          })
        })
        .catch(err => console.log(err))
      }
    })
  }
  // Needed to update when new props received from parents 
  componentWillReceiveProps(newProps){
    //this.initializeState(newProps)
    if(newProps.show){
      this.initializeState(newProps)
    }
  }

  handleClose(){
    //this.setState(initialState)
    this.props.onClose()
  }

  render() {
    if(!this.props.show){
      return null; 
    } 

    return (
      <div className="backdrop">
        <div className="modal">
          <div className="modal-header">
            Graph
            <button className="button" onClick={this.handleClose}>Close</button>
          </div>
          <div className="modal-content">
            <div className="modal-graph">
              <Line data={this.state.data} options={options} redraw={true}/>
            </div>
          </div>
          <div className="modal-footer">
              {/*<button className="button" onClick={this.update}>Show Graph</button>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default Graph