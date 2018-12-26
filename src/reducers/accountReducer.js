import { combineReducers } from 'redux'
import { 
  ADD_PORTFOLIO,
  DELETE_PORTFOLIO
} from '../actions/accountActions'

function portfolio(state, action) {
  switch(action.type) {
    case ADD_PORTFOLIO: 
      return {
        id: action.id,
        name: action.name
      }
    default: 
      return state
  }
}

function allIds(state = [], action) {
  if(state.length == 10) {
    // dispatch an error action 
    return state
  }
  switch(action.type) {
    case ADD_PORTFOLIO: 
      return [...state, action.id]
    case DELETE_PORTFOLIO: 
      return state.filter(el => el !== action.id)
    default: 
      return state
  }
}

function byId(state = {}, action){
  switch(action.type) {
    case ADD_PORTFOLIO:
      return {
        ...state,
        [action.id]: portfolio(state[action.id], action)
      }
    case DELETE_PORTFOLIO: 
      const { [action.id]: val, ...newState} = state
      return newState
    default: 
      return state    
  }
}

export function getAllPortfolios(state) {
  return state.allIds.map(id => state.byId[id])
}

const portfolios = combineReducers({
  byId,
  allIds
})

export default portfolios