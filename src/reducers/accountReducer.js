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
  switch(action.type) {
    case ADD_PORTFOLIO: 
      // This should still be pure
      if(state.length == 10) {
        return state
      }
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

const portfolios = combineReducers({
  byId,
  allIds
})

export default portfolios