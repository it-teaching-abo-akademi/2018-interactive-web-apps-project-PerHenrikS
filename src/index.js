import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'         // This lets us manage actions easier 

// The actual application 
import AccountContainer from './containers/AccountContainer'
import portfolioApp from './reducers/reducers';

// Persistent state as per https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
import { loadState, saveState } from './localStorage'

const persistedState = loadState()
const store = createStore(
  portfolioApp,
  persistedState,
  applyMiddleware(thunk)
)

store.subscribe(() => {
  saveState(store.getState())
})

console.log("### Initial state ###")
console.log(store.getState())
console.log("#####################")
/*
SPMS - Stock Portfolio Management System 

Create and track portfolios.  
Made with React + Redux 
*/
class Index extends React.Component {
  render() {
    return(
        <div className="container">
          <AccountContainer />
        </div>
    )
  }
}

// Render the application to DOM with the store through the redux Provider component
ReactDOM.render(
  <Provider store={store}>
    <Index/>
  </Provider>,
document.getElementById("index"))