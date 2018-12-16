import { connect } from 'react-redux'
import Portfolio from '../components/Portfolio'
import { addStock, deleteSelected, toggleSelect } from '../actions/stockActions';
import { getStocksInPortfolio } from '../reducers/stockReducer'

const mapStateToProps = (state, ownProps) => {
  return {
    portfolio: ownProps.element.id,
    portfolioStocks: getStocksInPortfolio(state.stocks, ownProps.element.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStock(ticker, id) {
      dispatch(addStock(ticker, id))
    },
    onDelete(portfolioId) {
      dispatch(deleteSelected(portfolioId))
    },
    onSelect(stockId, select) {
      dispatch(toggleSelect(stockId, select))
    }
  }
}

const PortfolioContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio)

export default PortfolioContainer