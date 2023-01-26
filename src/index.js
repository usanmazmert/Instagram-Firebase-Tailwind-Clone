import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './components/ContextProvider';
import {firebase, FieldValue} from "./lib/firebase"
import "./index.css"
import "./wdyr"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider value={{firebase, FieldValue}}>
      <App />
    </ContextProvider>
  </React.StrictMode>
); 
