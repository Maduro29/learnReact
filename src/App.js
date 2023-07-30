import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { useState } from 'react';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
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
        </Routes>
      </Container>
    </div>
  );
}

export default App;
