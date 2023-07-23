import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { useState } from 'react';

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
        <div className='my-3 add-new'>
          <span> <b>List users:</b></span>
          <button className='btn btn-success' onClick={turnOnModal}> Add new user</button>
        </div>
        <TableUsers modalStatus={modalStatus} handleClose={handleClose} />
      </Container>
    </div>
  );
}

export default App;
