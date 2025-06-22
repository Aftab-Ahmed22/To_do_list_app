// App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);  // stores tasks
  const [text, setText] = useState('');    // input value

  // Load todos from backend
  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Add new task
  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setTodos([...todos, data]);
    setText('');
  };

  // Delete task
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h2>📝 My To-Do List</h2>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a task..."
        style={{ padding: '8px', width: '70%' }}
      />
      <button onClick={addTodo} style={{ padding: '8px' }}>Add</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ marginTop: 10 }}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 10 }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
