import { connect } from 'react-redux'
import Portfolio from '../components/Portfolio'
import { 
  addStock, 
  deleteSelected, 
  toggleSelect,
  addToStock, 
} from '../actions/stockActions';
import { deletePortfolio } from '../actions/accountActions'
import { deletePrice } from '../actions/priceActions'
import { getStocksInPortfolio } from '../reducers/stockReducer'

const mapStateToProps = (state, ownProps) => {
  return {
    portfolio: ownProps.element.id,
    portfolioStocks: getStocksInPortfolio(state.stocks, ownProps.element.id),
    prices: state.prices
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStock(ticker, id, amount) {
      dispatch(addStock(ticker, id, amount))
    },
    onAddToStock(id, amount) {
      // The id of the stock and amount to add 
      dispatch(addToStock(id, amount))
    },
    onDelete(stockId, ticker) {
      dispatch(deleteSelected(stockId, ticker))
    },
    onRemove(id) {
      dispatch(deletePortfolio(id))
      //dispatch(deleteFromPortfolio(id))
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