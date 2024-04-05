// App.js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Apps = () => {
   const count = useSelector((state) => state.count)
   const dispatch = useDispatch()

   return (
      <div>
         <h1>Count: {count}</h1>
         <button onClick={() => dispatch({ type: 'INCREMENT' })}>
            Increment
         </button>
         <button onClick={() => dispatch({ type: 'DECREMENT' })}>
            Decrement
         </button>
      </div>
   )
}

export default Apps
