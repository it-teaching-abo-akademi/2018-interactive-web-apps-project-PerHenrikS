import { connect } from 'react-redux'
import Account from '../components/Account'
import { addPortfolio } from '../actions/accountActions'
import { updatePrice } from '../actions/priceActions'
import _ from 'lodash'

// Determines how state gets passed to props 
const mapStateToProps = (state) => {
  return {
    portfolios: getAllPortfolios(state.portfolios),
    prices: state.prices
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPortfolio: (name) => {
      dispatch(addPortfolio(name))
    },
    updateInitial: (ticker) => {
      dispatch(updatePrice(ticker))
    }
  }
}

function getAllPortfolios(state) {
  return state.allIds.map(id => state.byId[id])
}

const AccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

export default AccountContainer