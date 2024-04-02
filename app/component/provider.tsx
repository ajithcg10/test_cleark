'use client'
import React from 'react'
import { Provider } from 'react-redux'; 
import {store} from '../lib/Redux/store'

export default function Reduxprovider({children}: {children:React.ReactNode}) {
  return (
    <Provider store={store} >
        {children}
    </Provider>
  )
}
