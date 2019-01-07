import { v1 } from 'uuid'
import {
  ADD_PRICE,
  DELETE_PRICE
} from './priceActions'

export const key = '7H4Y3N5POD5QYIXW'

// Portfolio related actions
export const ADD_STOCK = 'ADD_STOCK'
export const ADD_TO_STOCK = 'ADD_TO_STOCK'
export const UPDATE_PRICE = 'UPDATE_PRICE'
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
          alert(json['Error Message'])
          throw Error(json['Error Message'])
        }
        if(json['Note'] !== undefined){
          alert(json['Note'])
          throw Error(json['Note'])
        }
        const price = json['Global Quote']['05. price']
        //This order is important 
        dispatch({type: ADD_PRICE, ticker, price})
        dispatch({type: ADD_STOCK, id: v1(), ticker, portfolio, price, amount})
      })
      .catch(err => console.log(err))
  }
}

// Id of stock and amount to add 
export function addToStock(id, amount){
  return { type: ADD_TO_STOCK, id, amount }
}

export function deleteSelected(id, ticker) {
  return (dispatch, getState) => {
    dispatch({type: DELETE_SELECTED, id})
    const stocks = getState().stocks
    const exists = stocks.allStocks.filter(el => {
      return stocks.byId[el].ticker === ticker
    })
    if(exists.length == 0){
      dispatch({type: DELETE_PRICE, ticker})
    }
  }
}

export function toggleSelect(id, select) {
  return { type: TOGGLE_SELECT, id, select }
}