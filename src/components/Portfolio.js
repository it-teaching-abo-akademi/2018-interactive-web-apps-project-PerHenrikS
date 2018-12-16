import React from 'react'
import Stock from './Stock'

// Represents a portfolio view - there can be many of these
class Portfolio extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="portfolio">
        <div className="portfolio-header">
          {this.props.element.name}
        </div>
        <div className="portfolio-content">
          {this.props.portfolioStocks.map(el => (
            <Stock 
              key={el.id} 
              element={el} 
              handleClick={() => this.props.onSelect(el.id, !el.selected)}/>
          ))}
        </div>
        <div className="portfolio-footer">
          {/* TODO: Add a modal box to query ticker and amount */}
          <button 
            onClick={() => {
              this.props.onAddStock("AAPL", this.props.portfolio)
            }} 
            className="button">Add stock</button>
          <button className="button">Perf Graph</button>
          <button 
            onClick={() => {
              this.props.portfolioStocks.map(el => {
                if(el.selected) {
                  this.props.onDelete(el.id)
                }
              })
              //this.props.onDelete(this.props.element.id)
            }} 
            className="button">Remove selected</button>
        </div>
      </div>
    )
  }
}

export default Portfolio