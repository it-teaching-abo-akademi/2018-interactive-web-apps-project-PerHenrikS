import React from 'react'

class AddStock extends React.Component {
  constructor(props){
    super(props)

    this.handleInput = this.handleInput.bind(this)
    this.clearInput = this.clearInput.bind(this) 
    this.handleClose = this.handleClose.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
    this.state = {
      value: "aapl",
      amount: 1
    }
  }

  handleInput(event){
    this.setState({value: event.target.value})
  }

  clearInput() {
    this.setState({
      value: "",
      amount: 1
    })
  }

  handleClose(){
    this.clearInput()
    this.props.onClose()
  }

  handleAmount(e) {
    this.setState({amount: e.target.value})
  }

  render() {
    if(!this.props.show){
      return null; 
    }

    return (
      <div className="backdrop">
        <div className="modal small">
          <div className="modal-header centered">
            Add Stock
            <button className="button" onClick={this.handleClose}>Close</button>
          </div>
          <div className="modal-content centered">
            <form className="container">
              <label>Symbol</label>
              <input value={this.state.value} onChange={this.handleInput}></input>

              <label>Amount</label>
              <input value={this.state.amount} onChange={this.handleAmount}></input>
              <button className="button" onClick={(e) => 
                {
                  e.preventDefault()
                  this.props.handler(this.state.value, this.props.portfolio, this.state.amount)
                  this.handleClose()
                }
              }>Add</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddStock