

export const todoReducer = (initialState = [] , action) => {

    switch (action.type) {

        case 'add':
            return [...initialState, action.payload]
        
        case 'delete':
            return initialState.filter(todo => todo.id !== action.payload)
        
        case 'toggle':
            return initialState.map(todo => 
                (todo.id === action.payload)
                ? {...todo, completed: !todo.completed}
                : todo)

        case 'delete-all':
            return initialState.filter(todo => !todo.completed)
        
        default:
            return initialState
    }
  
}
