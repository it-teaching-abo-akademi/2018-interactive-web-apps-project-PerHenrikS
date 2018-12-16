import { combineReducers } from 'redux'
import portfolios from './accountReducer'
import stocks from './stockReducer'

const portfolioApp = combineReducers({
  portfolios,
  stocks
})

export default portfolioApp