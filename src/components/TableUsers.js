import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../services/userService';
import ReactPaginate from 'react-paginate';


const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const [totalPages, setTotalPages] = useState([]);

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

    console.log(totalUsers);
    return (
        <><Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
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