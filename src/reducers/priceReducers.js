import { combineReducers } from 'redux'
import {
  ADD_PRICE,
  UPDATE_PRICE,
  DELETE_PRICE
} from '../actions/priceActions'

// util function to define the updates
function price(state, action) {
  switch(action.type){
    case UPDATE_PRICE:
      return {
        ...state, 
        price: action.price
      }
    default: 
      return state
  }
}

function allIds(state = [], action){
  switch(action.type){
    case ADD_PRICE:
      // Prevent duplicates 
      const newState = (!state.includes(action.ticker)) ? [...state, action.ticker] : state 
      return newState 
    case DELETE_PRICE: 
      return state.filter(el => el !== action.ticker)
    default: 
      return state 
  }
}

function byId(state = {}, action){
  switch(action.type) {
    case ADD_PRICE: 
      return {
        ...state,
        [action.ticker]: {id: action.ticker, price: action.price}
      }
    case UPDATE_PRICE: 
      return {
        ...state,
        [action.ticker]: price(state[action.ticker], action)
      }
    case DELETE_PRICE: 
      const { [action.ticker]: val, ...newState} = state
      return newState
    default: 
      return state
  }
}

const prices = combineReducers({
  byId,
  allIds,
})

export default prices