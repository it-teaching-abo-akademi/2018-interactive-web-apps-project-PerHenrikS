import React from 'react'
import Stock from './Stock'
import AddStock from './AddStock'
import Graph from './Graph'

// Represents a portfolio view - there can be many of these
class Portfolio extends React.Component {
  constructor(props){
    super(props)

    this.totalValue = this.totalValue.bind(this)
    this.toggleGraph = this.toggleGraph.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.state = {
      graphOpen: false,
      addStock: false, 
      currency: '$'
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
    const val = this.props.portfolioStocks.map(el => { return parseFloat(el.price) * el.amount })
    const total = val.reduce((total, current) => total + current)
    return parseFloat(total).toFixed(2)
  }

  render(){
    this.totalValue()
    return (
      <div>
      <AddStock 
        show={this.state.addStock}
        onClose={this.toggleAdd}
        handler={this.props.onAddStock}
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
                this.props.onDelete(el.id)
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
                handleClick={() => this.props.onSelect(el.id, !el.selected)}/>
            ))}
            </tbody>
          </table>
        </div>
        <div className="portfolio-footer container">
          <div className="portfolio-info">
            <p>Total value of {this.props.element.name} Portfolio: {this.totalValue()} {this.state.currency}</p>  
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
                this.toggleGraph()
              }}>Perf Graph</button>
            <button 
              onClick={() => {
                this.props.portfolioStocks.map(el => {
                  if(el.selected) {
                    this.props.onDelete(el.id)
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