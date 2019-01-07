import key from './accountActions'

export const ADD_PRICE = 'ADD_PRICE'
export const UPDATE_PRICE = 'UPDATE_PRICE'
export const DELETE_PRICE = 'DELETE_PRICE'

export function updatePrice(ticker) {
  // Fetch the price and dispatch the action 
  return dispatch => {
    return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${key}`)
      .then(res => res.json())
      .then(json => {
        if(json['Error Message'] !== undefined){
          alert(json['Note'])
          throw Error(json['Error Message'])
        }
        if(json['Note'] !== undefined){
          alert(json['Note'])
          throw Error(json['Note'])
        }
        const price = json['Global Quote']['05. price']

        dispatch({type: UPDATE_PRICE, ticker, price})
      })
      .catch(err => console.log(err))
  }
}