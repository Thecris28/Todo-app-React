
import { useEffect, useReducer, useState } from 'react'
import './styles/styles.css'

import { TodoList } from './components/TodoList'
import { AddTodo } from './components/AddTodo'
import { todoReducer } from './todoReducer'
import { Header } from './components/Header'

import { initialState } from './data'

const Filters = {
    all: 'all',
    active: 'active',
    completed: 'completed'
};

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || initialState;
}

export const AppTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    const [filter, setFilter] = useState(Filters.all);

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

    const handleReorder = (values) => {
        dispatch({
            type: 'reorder',
            payload: values
        });
    }

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
                <Header />
                <AddTodo newTodo={handleNewTodo} />
                
                <ul>
                <TodoList 
                todos={filteredTodos} 
                onDelete={handleDeleteTodo} 
                onToggle={handleToggleTodo} 
                onReorder={handleReorder}/>
                    <li className='todo-footer'>
                        <p>{todosPending} items left</p>
                        <div className="footer-item-block">
                            <button className={filter === Filters.all ? 'footer-item-selected' : 'footer-item-no-selected'} onClick={() => setFilter(Filters.all)}>All</button>
                            <button className={filter === Filters.active ? 'footer-item-selected' : 'footer-item-no-selected'} onClick={() => setFilter(Filters.active)}>Active</button>
                            <button className={filter === Filters.completed ? 'footer-item-selected' : 'footer-item-no-selected'} onClick={() => setFilter(Filters.completed)}>Completed</button>
                        </div>
                        <span onClick={handleDeleteAll}>Clear Completed</span>
                    </li>
                </ul>
                <ul>
                    <li className="footer-item">
                        <button className={filter === Filters.all ? 'footer-item-selected' : 'footer-item-no-selected'} onClick={() => setFilter(Filters.all)}>All</button>
                        <button className={filter === Filters.active ? 'footer-item-selected' : 'footer-item-no-selected'} onClick={() => setFilter(Filters.active)}>Active</button>
                        <button className={filter === Filters.completed ? 'footer-item-selected' : 'footer-item-no-selected'} onClick={() => setFilter(Filters.completed)}>Completed</button>
                    </li>
                </ul>
                <p className='reorder'>Drag and drop to reorder list</p>
            </main>
        </div>
    );
};
