// reducers.js
const initialState = {
   count: 5,
}

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'INCREMENT':
         return { ...state, count: state.count + 1 }
      case 'DECREMENT':
         return { ...state, count: state.count - 1 }
      default:
         return state
   }
}

export default rootReducer
