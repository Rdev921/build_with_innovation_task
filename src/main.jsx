import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthCotextProvider from './context/AuthContext.jsx'
import SearchContextProvider from './context/SearchContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <SearchContextProvider>
    <AuthCotextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthCotextProvider>
  </SearchContextProvider>
)
