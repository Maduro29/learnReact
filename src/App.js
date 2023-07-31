import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import { useContext } from 'react';
import { UserContext } from './context/userContext';

function App() {

  const { user, loginContext } = useContext(UserContext);

  console.log('...', user);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
    }
  }, [])

  const [modalStatus, setModalStatus] = useState(false);

  const handleClose = () => {
    setModalStatus(false);
  }

  const turnOnModal = () => {
    setModalStatus(true);
  }

  return (
    <div className='app'>
      <Header />
      <Container>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/users' element={<>
            <div className='my-3 add-new'>
              <span> <b>List users:</b></span>
              <button className='btn btn-success' onClick={turnOnModal}>
                <i className="fa-solid fa-circle-plus"></i> Add new user
              </button>
            </div>
            <TableUsers modalStatus={modalStatus} handleClose={handleClose} /></>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
