import { connect } from 'react-redux'
import Portfolio from '../components/Portfolio'
import { addStock } from '../actions/stockActions';
import { getStocksInPortfolio, printAllStocks } from '../reducers/stockReducer'

const mapStateToProps = (state, ownProps) => {
  return {
    portfolio: ownProps.element.id,
    stocks: getStocksInPortfolio(state.stocks, ownProps.element.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStock(ticker, id) {
      dispatch(addStock(ticker, id))
    }
  }
}

const PortfolioContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio)

export default PortfolioContainer