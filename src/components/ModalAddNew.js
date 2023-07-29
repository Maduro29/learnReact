import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { addNewUser } from '../services/userService';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;

    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSubmit = async () => {
        const res = await addNewUser(name, job);
        if (res && res.id) {
            handleClose();
            setName('');
            setJob('');
            handleUpdateTable({
                id: res.id,
                first_name: res.name
            })
        }
    }

    return <>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Job</label>
                        <input type="text" className="form-control" value={job} onChange={(event) => { setJob(event.target.value) }} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default ModalAddNew;