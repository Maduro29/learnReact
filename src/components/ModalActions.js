import { useState, useTransition } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { editUser, deleteUser } from '../services/userService';

const ModalActions = (props) => {
    const { show, handleClose, handleAction, user, type } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSubmit = async () => {
        if (type === 'edit') {
            const res = await editUser(name, job);
            if (res) {
                handleClose();
                handleAction({
                    id: user.id,
                    first_name: res.name
                }, 'edit')
            }
        } else {
            const res = await deleteUser();
            console.log(res);
            if (!res) {
                handleClose();
                handleAction({
                    id: user.id,
                }, 'delete')
            }
        }
    }

    let htmlModalAction = <></>

    if (type === 'edit') {
        htmlModalAction = <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
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
            </Modal></>;
    } else {
        htmlModalAction = <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                            <input type="text" className="form-control" readOnly value={user.first_name} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                            <input type="text" className="form-control" readOnly value={user.last_name} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal></>;
    }

    return htmlModalAction;
}

export default ModalActions;