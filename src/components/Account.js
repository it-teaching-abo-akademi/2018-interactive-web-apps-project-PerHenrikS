import React from 'react'
import PortfolioContainer from '../containers/PortfolioContainer'

// Represents the entire account - has several portfolios 
class Account extends React.Component {
  constructor(props) {
    super(props)

    this.handleInput = this.handleInput.bind(this)
    this.clearInput = this.clearInput.bind(this)
    this.state = {
      value: ""
    }
  }

  handleInput(event){
    this.setState({value: event.target.value})
  }

  clearInput() {
    this.setState({value: ""})
  }

  render(){
    return (
      <div>
        <div className="account-header">
          <h4>SPMS</h4>
          <form className="container top-form">
            <input 
              style={{width: '50%'}}
              value={this.state.value} 
              onChange={this.handleInput}></input>
            <button 
              className="spms-button"
              onClick={(ev) => {
              ev.preventDefault()                                       // To not reload page 
              this.props.onAddPortfolio(this.state.value) 
              this.clearInput()
            }}>Add Portfolio</button>
          </form>
        </div>
        <div className="container box-row">
          {this.props.portfolios.map(el => (
            <PortfolioContainer key={el.id} element={el}/>
          ))}
        </div>
      </div>      
    )
  }
}

export default Account 