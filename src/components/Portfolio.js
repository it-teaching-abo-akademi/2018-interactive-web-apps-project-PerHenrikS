import React from 'react'
import Stock from './Stock'
import AddStock from './AddStock'
import Graph from './Graph'
import fetch from 'node-fetch'
import {key} from '../actions/stockActions'

// Represents a portfolio view - there can be many of these
class Portfolio extends React.Component {
  constructor(props){
    super(props)

    this.totalValue = this.totalValue.bind(this)
    this.toggleGraph = this.toggleGraph.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.setExchangeRate = this.setExchangeRate.bind(this)
    this.addStockHandler = this.addStockHandler.bind(this)
    this.state = {
      graphOpen: false,
      addStock: false, 
      currency: 'usd',
      rate: 1
    }
  }

  toggleGraph(){
    this.setState({
      graphOpen: !this.state.graphOpen
    })
  }

  toggleAdd(){
    this.setState({
      addStock: !this.state.addStock
    })
  }

  totalValue(){
    if(this.props.portfolioStocks.length === 0){
      return 0
    }
    const val = this.props.portfolioStocks.map(el => { 
      const currentPrice = parseFloat(this.props.prices.byId[el.ticker].price).toFixed(2)
      return currentPrice * el.amount 
    })
    const total = val.reduce((total, current) => total + current)
    return parseFloat(parseFloat(total) * this.state.rate).toFixed(2)
  }

  setExchangeRate(){
    /* 
    The portfolio value is always calculated in usd, so we only 
    ever need to fetch the exchange rate between usd -> eur 

    the exchange rates could ofcourse be saved but they can 
    fluctuate during your browse time (I think) so it's 
    better to fetch them per change. 
     */
    if(this.state.currency == 'usd'){
      fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=usd&to_currency=eur&apikey=${key}`)
      .then(res => res.json())
      .then(res => {
        const exchangeRate = res['Realtime Currency Exchange Rate']['5. Exchange Rate']

        this.setState({
          currency: 'eur',
          rate: parseFloat(exchangeRate).toFixed(2)
        })
      }) 
    }else{
      this.setState({
        currency: 'usd',
        rate: 1
      })
    }
  }

  addStockHandler(ticker, portfolio, amount){
    const exists = this.props.portfolioStocks.filter(el => el.ticker === ticker) 
    if(exists.length > 0){
      const stockId = exists[0].id
      this.props.onAddToStock(stockId, amount)
    }else{
      if(this.props.portfolioStocks.length < 50){
        this.props.onAddStock(ticker, portfolio, amount)
      }else{
        alert("Only 50 symbols allowed per portfolio")
      }
    }
  }

  render(){
    return (
      <div>
      <AddStock 
        show={this.state.addStock}
        onClose={this.toggleAdd}
        handler={this.addStockHandler}
        portfolio={this.props.portfolio}
        />
      <Graph 
        show={this.state.graphOpen} 
        onClose={this.toggleGraph}
        stocks={this.props.portfolioStocks} />
      <div className="portfolio">
        <div className="portfolio-header">
          <span>{this.props.element.name}</span>
          <button 
            className="spms-button"
            onClick={() => {
              this.props.onRemove(this.props.element.id)
              this.props.portfolioStocks.map(el => {
                this.props.onDelete(el.id, el.ticker)
              })
            }}>Delete portfolio</button>
        </div>
        <div className="portfolio-content">
          <table className="portfolio-table">
            <thead>
              <tr>
                <th><span>Symbol</span></th>
                <th><span>Price</span></th>
                <th><span>Amount</span></th>
                <th><span>Selected</span></th>
              </tr>
            </thead>
            <tbody>
            {this.props.portfolioStocks.map(el => (
              <Stock 
                key={el.id} 
                element={el} 
                price={this.props.prices.byId[el.ticker]}
                handleClick={() => this.props.onSelect(el.id, !el.selected)}/>
            ))}
            </tbody>
          </table>
        </div>
        <div className="portfolio-footer container">
          <div className="portfolio-info">
            {/* Get current exchange rate and convert */}
            <p>
              Total value of {this.props.element.name} :
              {this.totalValue()}
              {(this.state.currency == 'usd') ? '$' : '€'}
              </p>  
          </div>
          {/* TODO: Add a modal box to query ticker and amount */}
          <div className="footer-buttons">
            <button 
              onClick={() => {
                this.toggleAdd()
                //this.props.onAddStock(this.state.value, this.props.portfolio)
              }} 
              className="spms-button">Add stock</button>
            <button 
              className="spms-button"
              onClick={() => {
                this.setExchangeRate()
              }}>Change currency</button>
            <button 
              className="spms-button"
              onClick={() => {
                this.toggleGraph()
              }}>Perf Graph</button>
            <button 
              onClick={() => {
                this.props.portfolioStocks.map(el => {
                  if(el.selected) {
                    this.props.onDelete(el.id, el.ticker)
                  }
                })
              }} 
              className="spms-button">Remove selected</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Portfolio