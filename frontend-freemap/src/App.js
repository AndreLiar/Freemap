import React from 'react';
import { Button, Container } from 'react-bootstrap';

const App = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center">Welcome to React with Bootstrap</h1>
      <p className="text-center">
        This is a simple example of integrating Bootstrap in a React app.
      </p>
      <div className="text-center">
        <Button variant="primary">Click Me</Button>
      </div>
    </Container>
  );
};

export default App;
