import { v1 } from 'uuid'

// Portfolio related actions
export const ADD_STOCK = 'ADD_STOCK'

//TODO: Add stocks via API 
export function addStock(ticker, portfolio) {
  return { type: ADD_STOCK, id: v1(), ticker, portfolio}
} 

//TODO: remove (sell) selected