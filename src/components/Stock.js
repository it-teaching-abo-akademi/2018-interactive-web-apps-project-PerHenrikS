import React from 'react'

//Stock without container 
class Stock extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render(){
    return (
      <tr className="stock">
        <td>{this.props.element.ticker}</td>
        <td>{parseFloat(this.props.element.price).toFixed(2)}</td>
        <td>{this.props.element.amount}</td>
        <td><input defaultChecked={this.props.element.selected} type="checkbox" onChange={this.props.handleClick}></input></td>
      </tr>
    )
  }
}

export default Stock 