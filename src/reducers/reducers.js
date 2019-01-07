import { combineReducers } from 'redux'
import portfolios from './accountReducer'
import stocks from './stockReducer'
import prices from './priceReducers'

/*
  there are some issues with 
  the normalized state removal etc. 
  fix them 
*/ 

const portfolioApp = combineReducers({
  portfolios,
  stocks,
  prices
})

export default portfolioApp