import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../UserTable/users/usersSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TablePagination,
} from "@mui/material";
import Modal from "./Model";
import UserModal from "./UserModel";
import { USER_TABLE_HEADERS } from "../../constants/tableHeaders";
import { useNavigate } from "react-router-dom";
//import Toast from "../Toast";
import { useToast } from "../../context/ToastContext";
import { debounce } from "lodash";

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const showToast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const filterUsers = (users, term) => {
    if (!term) return users;

    const lowerTerm = term.toLowerCase();
    return users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(lowerTerm)
    );
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    } else if (status === "succeeded") {
      setFilteredUsers(users);
      showToast("Users loaded successfully", "success")
    } else if (status === "failed") {
      showToast("Failed to load data", "error")
    }
  }, [status, dispatch, users, error, showToast]);

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      const result = filterUsers(users, searchTerm);
      setFilteredUsers(result);
    }, 300);

    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [searchTerm, users]);

  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, page]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    //navigate(`/user/${user.id}`);
    navigate("/profile", { state: user });
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <Paper elevation={3} sx={{ margin: 4, padding: 2 }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            fontSize: "1rem",
            width: "300px",
          }}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {USER_TABLE_HEADERS.map((header) => (
                  <TableCell key={header.id}>{header.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => handleRowClick(user)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Avatar src={user.image} />
                  </TableCell>
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
        {selectedUser && (
          <Modal onClose={closeModal}>
            <UserModal user={selectedUser} />
          </Modal>
        )}
      </Paper>
    </>
  );
};

export default UsersTable;
