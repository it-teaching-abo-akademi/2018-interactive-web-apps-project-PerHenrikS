import React from 'react'

//Stock without container 
class Stock extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render(){
    return (
      <div className="stock">
        {this.props.element.ticker}
        --- 
        {parseFloat(this.props.element.price).toFixed(2)}
        ---
        {this.props.element.amount}
        <input defaultChecked={this.props.element.selected} type="checkbox" onChange={this.props.handleClick}></input>
      </div>
    )
  }
}

export default Stock 