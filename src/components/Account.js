import React from 'react'
import PortfolioContainer from '../containers/PortfolioContainer'
import key from '../actions/stockActions'
import _ from 'lodash'

// Represents the entire account - has several portfolios 
class Account extends React.Component {
  constructor(props) {
    super(props)

    this.handleInput = this.handleInput.bind(this)
    this.clearInput = this.clearInput.bind(this)
    this.changeTheme = this.changeTheme.bind(this)
    this.state = {
      value: "",
      mode: ''
    }
  }

  // Small hack to switch between light and dark modes
  componentDidMount(){
    document.body.className = this.state.mode
    this.props.prices.allIds.map(symbol => {
      this.props.updateInitial(symbol)
    })
  }
  componentWillUnmount(){
    document.body.className = null
  }
  componentDidUpdate(){
    document.body.className = this.state.mode
  }

  changeTheme(){
    const newMode = (this.state.mode === '') ? 'light' : ''
    this.setState({
      mode: newMode
    })
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
          <div style={{display: 'flex'}}>
            <h4>SPMS</h4>
            <button 
              style={{height: '50%'}} 
              onClick={this.changeTheme} 
              className="spms-button">
              {(this.state.mode == '') ? 'Day mode' : 'Night mode'}
              </button>
          </div>
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