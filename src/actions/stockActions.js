import { v1 } from 'uuid'

// Portfolio related actions
export const ADD_STOCK = 'ADD_STOCK'
export const TOGGLE_SELECT = 'TOGGLE_SELECT'
export const DELETE_SELECTED = 'DELETE_SELECTED'

//TODO: Add stocks via API 
export function addStock(ticker, portfolio) {
  return { type: ADD_STOCK, id: v1(), ticker, portfolio}
} 

//TODO: remove selected item
export function deleteSelected(id) {
  return { type: DELETE_SELECTED, id }
}

export function toggleSelect(id, select) {
  return { type: TOGGLE_SELECT, id, select }
}