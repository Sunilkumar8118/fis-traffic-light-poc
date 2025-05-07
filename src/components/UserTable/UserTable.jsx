import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../UserTable/users/usersSlice'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, TablePagination
} from '@mui/material';

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.data);
  const status = useSelector(state => state.users.status);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    return users.slice(start, start + rowsPerPage);
  }, [users, page]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper elevation={3} sx={{ margin: 4, padding: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell><Avatar src={user.image} /></TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.birthDate}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </Paper>
  );
};

export default UsersTable;
