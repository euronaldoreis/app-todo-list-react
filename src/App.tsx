import { useState } from 'react';
import { Container, Box } from '@mui/material';
import CardTask from './components/cardTask';
import AddTask from './components/addTask';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade X no sistema",
      createdAt: new Date(),
      author: 'Ronaldo Reis',
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      createdAt: new Date(),
      author: 'Ronaldo Reis',
      isCompleted: false,
    },
    {
      id: 3,
      text: "Aprimorar funcionalidade X no sistema",
      createdAt: new Date(),
      author: 'Ronaldo Reis',
      isCompleted: false,
    },
  ])
  return (
    <div className="App">
      <Container maxWidth="md">
        <h1>List de Tarefas</h1>
        <div className="todo-list">
          <AddTask />
          {todos.map ((todo) => (
            <Box mt={2}>
              <CardTask listData={todo}/>
            </Box>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
