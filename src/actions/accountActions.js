import { v1 } from 'uuid'

export const ADD_PORTFOLIO = 'ADD_PORTFOLIO'
export const DELETE_PORTFOLIO = 'DELETE_PORTFOLIO'

// Returns ADD_PORTFOLIO action 
export function addPortfolio(name) {
  return { type: ADD_PORTFOLIO, id: v1(), name }
}

export function deletePortfolio(id){
  return { type: DELETE_PORTFOLIO, id }
}