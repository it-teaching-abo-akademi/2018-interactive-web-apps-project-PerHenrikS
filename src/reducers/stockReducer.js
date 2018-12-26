import { 
ADD_STOCK, 
  TOGGLE_SELECT, 
  DELETE_SELECTED
} from '../actions/stockActions'
import { combineReducers } from 'redux'
import _ from 'lodash'

function stock(state, action) {
  switch(action.type) {
    case ADD_STOCK: 
      return {
          id: action.id,
          portfolio: action.portfolio,
          ticker: action.ticker,
          selected: false, 
          price: action.price,
          amount: action.amount
        }
    case TOGGLE_SELECT: 
      return { ...state, selected: action.select }
    default: 
      return state
  }
}

// Stocks are stored independently of portfolio (normalised)
function allStocks(state = [], action) {
  switch(action.type) {
    case ADD_STOCK:   
      return [...state, action.id]
    case DELETE_SELECTED: 
      return state.filter(el => el !== action.id)
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
    case TOGGLE_SELECT: 
      return {
        ...state,
        [action.id]: stock(state[action.id], action)
      }
    case DELETE_SELECTED:
      return _.omit(state, [action.id])
    default: 
      return state
  }
}

export function getStocksInPortfolio(state, id){
  const portfolioStocks = state.allStocks.filter(el => state.byId[el].portfolio === id)
  const stockObjects = portfolioStocks.map(el => state.byId[el])
  return stockObjects
}

const stocks = combineReducers({
  byId, 
  allStocks
})

export default stocks