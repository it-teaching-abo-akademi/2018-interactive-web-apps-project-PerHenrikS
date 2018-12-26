import { v1 } from 'uuid'

export const key = '7H4Y3N5POD5QYIXW'

// Portfolio related actions
export const ADD_STOCK = 'ADD_STOCK'
export const TOGGLE_SELECT = 'TOGGLE_SELECT'
export const DELETE_SELECTED = 'DELETE_SELECTED'

//TODO: Add stocks via API 
export function addStock(ticker, portfolio, amount) {
  // Add stock via api 
  return dispatch => {
    return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${key}`)
      .then(res => res.json())
      .then(json => {
        if(json['Error Message'] !== undefined){
          throw Error(json['Error Message'])
        }
        const price = json['Global Quote']['05. price']
        dispatch({type: ADD_STOCK, id: v1(), ticker, portfolio, price, amount})
      })
      .catch(err => console.log(err))
  }
} 

//TODO: remove selected item
export function deleteSelected(id) {
  return { type: DELETE_SELECTED, id }
}

export function toggleSelect(id, select) {
  return { type: TOGGLE_SELECT, id, select }
}