import { ADD_STOCK } from '../actions/stockActions'
import { combineReducers } from 'redux'

function stock(state, action) {
  switch(action.type) {
    case ADD_STOCK: 
      return {
          id: action.id,
          portfolio: action.portfolio,
          ticker: action.ticker,
          price: 199
        }
    default: 
      return state
  }
}

// Stocks are stored independently of portfolio (normalised)
function allStocks(state = [], action) {
  switch(action.type) {
    case ADD_STOCK:   
      return [...state, action.id]
    default: 
      return state
  }
}

function byId(state = {}, action) {
  switch(action.type) {
    case ADD_STOCK: 
      return {
        ...state, 
        [action.id]: stock(state[action.id], action)
      }
    default: 
      return state
  }
}

export function getStocksInPortfolio(state, id){
  const portfolioStocks = state.allStocks.filter(el => el.portfolio !== id)
  const stockObjects = portfolioStocks.map(el => state.byId[el])
  return stockObjects
}

const stocks = combineReducers({
  byId, 
  allStocks
})

export default stocks