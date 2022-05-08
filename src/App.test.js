import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './components/App';

// test('h1NotHave', () => {
//     render(<App />);
//     const h1 = screen.getByRole('heading', { level: 1 });
//     expect(h1).not.toHaveTextContent('To-Dos');
// });

// test('h1Content', () => {
//     render(<App />);
//     const h1 = screen.getByRole('heading',{ level: 1 });
//     expect(h1).toHaveTextContent('Dash');
// });

// test('getByText', () => {
//     render(<App />);
//     expect(screen.getByText('To-Do Dashboard')).toBeInTheDocument();
// });

test('placeholderText', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Enter to do | Tap to remove')).toBeInTheDocument();
});


// React Tesing Library Tutorial
// https://youtu.be/0Y11K7KSC80

const mockedSetTodo = jest.fn();
describe('input testing', () => {
    it('input renders', async () => {
        render(<App 
            todos={[]}
            setTodos={mockedSetTodo}
        />);
        const input = screen.getByPlaceholderText(/Enter to do/);
        expect(input).toBeInTheDocument();
    })

    it('input accepts chars', async () => {
        render(<App 
            todos={[]}
            setTodos={mockedSetTodo}
        />);
        const input = screen.getByPlaceholderText(/Enter to do/);
        fireEvent.change(input, { target: { value: 'test' } });
        expect(input.value).toBe('test');
    })

    it('input resets', async () => {
        render(<App 
            todos={[]}
            setTodos={mockedSetTodo}
        />);
        const input = screen.getByPlaceholderText(/Enter to do/);
        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.submit(input);
        expect(input.value).toBe('');
    })

});