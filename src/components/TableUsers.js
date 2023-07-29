import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../services/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalActions from './ModalActions';


const TableUsers = (props) => {
    const { modalStatus, handleClose } = props;
    const [actionStatus, setActionStatus] = useState();
    const [actionType, setActionType] = useState();
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [userDataAction, setUserDataAction] = useState({});

    useEffect(() => {
        getAllUsers(1);
    }, []);

    const getAllUsers = async (page) => {
        let res = await fetchAllUsers(page);
        if (res && res.data) {
            setTotalPages(res.total_pages);
            setTotalUsers(res.total);
            setListUsers(res.data);
        }

        console.log(res);
    }

    const handlePageClick = (event) => {
        getAllUsers(+event.selected + 1);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
        console.log(listUsers);
    }

    const actionClose = () => {
        setActionStatus(false);
    }

    const turnOnAction = (user, type) => {
        setActionStatus(true);
        setActionType(type);
        setUserDataAction(user);
    }

    const handleAction = (user, type) => {
        let users = [...listUsers];
        if (type === 'edit') {
            let index = users.findIndex(item => item.id === user.id);
            users[index].first_name = user.first_name;
        } else {
            let index = users.findIndex(item => item.id === user.id);
            users.splice(index, 1);
        }
        setListUsers(users);
    }


    return (
        <>
            <ModalAddNew show={modalStatus} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
            <ModalActions show={actionStatus} handleClose={actionClose} handleAction={handleAction} user={userDataAction} type={actionType} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button className='btn btn-warning mx-2 btn-edit edit' onClick={() => turnOnAction(item, 'edit')}>Edit</button>
                                        <button className='btn btn-danger mx-2 btn-delete delete' onClick={() => turnOnAction(item, 'delete')}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                marginPagesDisplayed={2}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            /></>
    )
}

export default TableUsers;