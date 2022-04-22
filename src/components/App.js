import React from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { Weather } from './Weather';
import { Footer } from './Footer';
import '../styles/App.css';

export const App = () => {
    const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem('todos')) || [
        {
            text: 'code',
            isCompleted: false,
        },
        {
            text: 'track macros',
            isCompleted: false,
        },
        {
            text: 'lift weights',
            isCompleted: false,
        }
    ]);

    const addTodo = text => {
        const newTodos = [...todos, { text, isCompleted: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    const removeTodo = index => {
        let temp = [...todos];
        temp.splice(index, 1);
        setTodos(temp);
        localStorage.setItem('todos', JSON.stringify(temp));
    }

    return (
        <div className="app">
            <Weather />
            <div className="todo-list" >
                {todos.map((todo, i) => (
                    <Todo key={i} index={i} todo={todo} remove={removeTodo} />
                ))}
                <TodoForm addTodo={addTodo} />
            </div>
            <Footer />
        </div>
    );
}