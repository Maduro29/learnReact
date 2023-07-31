import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './context/userContext';
import AppRoutes from './routes/AppRoutes';

function App() {

  const { user, loginContext } = useContext(UserContext);

  console.log('...', user);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
    }
  }, [])


  return (
    <div className='app'>
      <Header />
      <Container>
        <AppRoutes />
      </Container>
    </div>
  );
}

export default App;
