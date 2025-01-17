
import { useEffect, useReducer, useState } from 'react'
import './styles.css'
import imgDark from './assets/images/icon-moon.svg'
import imgLight from './assets/images/icon-sun.svg'

import { TodoList } from './components/TodoList'
import { AddTodo } from './components/AddTodo'

import { todoReducer } from './todoReducer'

const Filters = {
    all: 'all',
    active: 'active',
    completed: 'completed'
};

const initialState = [
    {
        id: crypto.randomUUID(),
        title: 'Complete online JavaScript course',
        completed: false
    }
];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || initialState;
}

export const AppTodo = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    const [filter, setFilter] = useState(Filters.all);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    useEffect(() => {
      JSON.stringify(localStorage.setItem('todos', JSON.stringify(todos)));
    }, [todos])
    

    const handleNewTodo = (todo) => {
        dispatch({
            type: 'add',
            payload: todo
        });
    };

    const handleDeleteTodo = (id) => {
        dispatch({
            type: 'delete',
            payload: id
        });
    };

    const handleToggleTodo = (id) => {
        dispatch({
            type: 'toggle',
            payload: id
        });
    };

    const handleDeleteAll = () => {
        dispatch({
            type: 'delete-all'
        });
    };

    const filterTodos = (todos, filter) => {
        switch (filter) {
            case Filters.active:
                return todos.filter(todo => !todo.completed);
            case Filters.completed:
                return todos.filter(todo => todo.completed);
            case Filters.all:
                return todos;

            default:
                return todos;
        }
    };

    const filteredTodos = filterTodos(todos, filter);

    const todosPending = todos.filter(todo => !todo.completed).length;
    

    return (
        <div>
            <div className="image"></div>
            <main className='app-container'>
                <header className='app-header'>
                    <h1>Todo</h1>
                    <button className='switch-mode' onClick={handleDarkMode}>
                    <img src={darkMode ? imgDark : imgLight} alt="darkmode-img" />
                    </button>
                </header>
                <AddTodo newTodo={handleNewTodo}/>
                <ul>
                    <TodoList todo={filteredTodos} onDelete={handleDeleteTodo} onToggle={handleToggleTodo} />
                    <li className='todo-footer'>
                        <p>{todosPending} items left</p>

                        <div className="footer-item-block">
                        <button className={filter === Filters.all ? 'footer-item-selected': 'footer-item-no-selected'} onClick={() => setFilter(Filters.all)}>All</button>
                        <button className={filter === Filters.active ? 'footer-item-selected': 'footer-item-no-selected'} onClick={() => setFilter(Filters.active)}>Active</button>
                        <button className={filter === Filters.completed ? 'footer-item-selected': 'footer-item-no-selected'} onClick={() => setFilter(Filters.completed)}>Completed</button>
                        </div>
                        
                        <span onClick={handleDeleteAll}>Clear Completed</span>
                    </li>
                </ul>
                <ul>
                    <li className="footer-item">
                        <button className={filter === Filters.all ? 'footer-item-selected': 'footer-item-no-selected'} onClick={() => setFilter(Filters.all)}>All</button>
                        <button className={filter === Filters.active ? 'footer-item-selected': 'footer-item-no-selected'} onClick={() => setFilter(Filters.active)}>Active</button>
                        <button className={filter === Filters.completed ? 'footer-item-selected': 'footer-item-no-selected'} onClick={() => setFilter(Filters.completed)}>Completed</button>
                    </li>
                </ul>
                <p className='reorder'>Drag and drop to reorder list</p>
            </main>
        </div>
    );
};
