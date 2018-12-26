import { connect } from 'react-redux'
import Portfolio from '../components/Portfolio'
import { 
  addStock, 
  deleteSelected, 
  toggleSelect, 
  deleteFromPortfolio 
} from '../actions/stockActions';
import { deletePortfolio } from '../actions/accountActions'
import { getStocksInPortfolio } from '../reducers/stockReducer'

const mapStateToProps = (state, ownProps) => {
  return {
    portfolio: ownProps.element.id,
    portfolioStocks: getStocksInPortfolio(state.stocks, ownProps.element.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStock(ticker, id, amount) {
      dispatch(addStock(ticker, id, amount))
    },
    onDelete(stockId) {
      dispatch(deleteSelected(stockId))
    },
    onRemove(id) {
      dispatch(deletePortfolio(id))
      dispatch(deleteFromPortfolio(id))
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