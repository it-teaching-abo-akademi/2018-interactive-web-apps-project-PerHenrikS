import React from 'react'

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
          {this.props.stocks.map(el => (
            <p key={el.id}>A stock</p>
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
          <button className="button">Remove selected</button>
        </div>
      </div>
    )
  }
}

export default Portfolio