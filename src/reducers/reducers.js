import { combineReducers } from 'redux'
import portfolios from './accountReducer'
import stocks from './stockReducer'

/*
  there are some issues with 
  the normalized state removal etc. 
  fix them 
*/ 

const portfolioApp = combineReducers({
  portfolios,
  stocks
})

export default portfolioApp