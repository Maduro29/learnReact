import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../services/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalActions from './ModalActions';
import _ from 'lodash';
import { debounce } from 'lodash';
import './TableUsers.scss';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';

const TableUsers = (props) => {
    // const { modalStatus, handleClose } = props;
    const [actionStatus, setActionStatus] = useState();
    const [actionType, setActionType] = useState();
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [userDataAction, setUserDataAction] = useState({});
    const [sortType, setSortType] = useState('');
    const [sortField, setSortField] = useState('id');
    const [exportData, setExportData] = useState([]);
    const [modalStatus, setModalStatus] = useState(false);


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

    const handleSort = (type, field) => {
        setSortField(field);
        setSortType(type);
        let users = _.cloneDeep(listUsers);
        users = _.orderBy(users, [field], [type]);
        setListUsers(users);
    }

    const handleSearch = debounce((event) => {
        let word = event.target.value;
        let users = [...listUsers];
        console.log(users);
        if (word) {
            users = users.filter(user => {
                if (user.email) {
                    return user.email.includes(word)
                }
            }); // unable to fix the error when change search from 'emmaaa' to 'emma'
            setListUsers(users);
        } else {
            getAllUsers(1);
        }
    }, 200)

    const getExportData = (event, done) => {
        let data = [];
        if (listUsers && listUsers.length > 0) {
            data.push(['Id', 'Email', 'First Name', 'Last Name']);
            listUsers.map(user => {
                data.push([
                    user.id,
                    user.email,
                    user.first_name,
                    user.last_name
                ])
            })
            console.log(data);
            setExportData(data);
            done();
        }
    }

    const handleImportData = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            // header: true,
            // skipEmptyLines: true,
            complete: function (results) {
                let raw = results.data
                if (raw.length > 0) {
                    if (raw[0] && raw[0].length === 3) {
                        let result = [];
                        if (raw[0][0] === 'email' && raw[0][1] === 'first_name' && raw[0][2] === 'last_name') {
                            raw.map((item, index) => {
                                if (index > 0 && item[0]) {
                                    result.push({
                                        email: item[0],
                                        first_name: item[1],
                                        last_name: item[2]
                                    })
                                }
                            })

                            console.log(result)
                            setListUsers(result.concat(...listUsers));
                        } else {
                            console.error('Wrong header');
                        }
                    } else {
                        console.error('Wrong format');
                    }
                } else {
                    console.error('No data in file')
                }
                console.log(raw);
            }
        });
    };

    const turnOnModal = () => {
        setModalStatus(true);
    }

    const handleClose = () => {
        setModalStatus(false);
    }

    return (
        <>
            <div className='my-3 add-new'>
                <span> <b>List users:</b></span>
                <button className='btn btn-success' onClick={turnOnModal}>
                    <i className="fa-solid fa-circle-plus"></i> Add new user
                </button>
            </div>
            <div className='d-sm-flex my-3'>
                <div className='col-sm-4 col-12'>
                    <input
                        className='form-control'
                        placeholder='Search by email'
                        onChange={(event) => handleSearch(event)}
                    />
                </div>
                <div className='col-sm-8 col-12 mt-sm-0 mt-3 group-btn'>
                    <label htmlFor='import' className='btn btn-secondary'>
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input type='file' id='import' hidden onChange={(event) => handleImportData(event)} />
                    <CSVLink
                        data={exportData}
                        filename={"my-file.csv"}
                        className="btn btn-info"
                        asyncOnClick={true}
                        onClick={(event, done) => getExportData(event, done)}
                    >
                        <i className="fa-solid fa-file-export"></i> Export
                    </CSVLink>
                </div>
            </div>
            <ModalAddNew show={modalStatus} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
            <ModalActions show={actionStatus} handleClose={actionClose} handleAction={handleAction} user={userDataAction} type={actionType} />
            <div className='table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='sort-header'>
                                <span>
                                    ID
                                </span>
                                <span>
                                    <i className="fas fa-arrow-down-long" onClick={() => handleSort('desc', 'id')}></i>
                                    <i className="fas fa-arrow-up-long" onClick={() => handleSort('asc', 'id')}></i>
                                </span>
                            </th>
                            <th>Email</th>
                            <th className='sort-header'>
                                <span>
                                    Fisrt Name
                                </span>
                                <span>
                                    <i className="fas fa-arrow-down-long" onClick={() => handleSort('desc', 'first_name')}></i>
                                    <i className="fas fa-arrow-up-long" onClick={() => handleSort('asc', 'first_name')}></i>
                                </span>
                            </th>
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
                                            <button className='btn btn-warning mx-2 btn-edit edit' onClick={() => turnOnAction(item, 'edit')}>
                                                <i className="fa-solid fa-pen-to-square"></i> Edit
                                            </button>
                                            <button className='btn btn-danger mx-2 btn-delete delete' onClick={() => turnOnAction(item, 'delete')}>
                                                <i className="fa-solid fa-user-xmark"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </div>
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