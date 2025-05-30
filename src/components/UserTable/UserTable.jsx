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
import CustomToast from "../CustomToast";

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    open: false,
    message: "",
    mode: "warning",
  });

  const showToast = (message, mode = "warning") => {
    setToast({ open: true, message, mode });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    } else if (status === "succeeded") {
      showToast("Users loaded successfully!", "success");
    } else if (status === "failed") {
      showToast(error || "Failed to load users.", "error");
    }
  }, [status, dispatch, error]);

  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    return users.slice(start, start + rowsPerPage);
  }, [users, page]);

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
      <CustomToast
        open={toast.open}
        onClose={closeToast}
        message={toast.message}
        mode={toast.mode}
      />
    </>
  );
};

export default UsersTable;
