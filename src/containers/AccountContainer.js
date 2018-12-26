import { connect } from 'react-redux'
import Account from '../components/Account'
import { addPortfolio, deletePortfolio } from '../actions/accountActions'
import { getAllPortfolios } from '../reducers/accountReducer'

// Determines how state gets passed to props 
const mapStateToProps = (state) => {
  return {
    portfolios: getAllPortfolios(state.portfolios)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPortfolio: (name) => {
      dispatch(addPortfolio(name))
    }
  }
}

const AccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

export default AccountContainer