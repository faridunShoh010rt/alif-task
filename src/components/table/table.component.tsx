import React, { useEffect, useRef, UIEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { getUsers } from "../../store/reducers/user.slice";
import { Box } from "@mui/material";
import { RootState } from "../../store";
import "./table.style.css";

export const TableComponent: React.FC = () => {
  const { users } = useAppSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  const isStoppedFetchMore = useRef(false);
  const pagination = useRef(1);

  useEffect(() => {
    dispatch(getUsers(pagination.current));
  }, []);

  const fetchMore = async (event: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } =
      event.target as HTMLDivElement;

    if (isStoppedFetchMore.current) {
      return;
    }

    const scrollCoordinates = scrollHeight - (scrollTop + clientHeight);

    if (scrollCoordinates <= 100) {
      pagination.current += 1;
      isStoppedFetchMore.current = true;

      const { payload } = await dispatch(getUsers(pagination.current));
      if (Array.isArray(payload) && !payload.length) {
        isStoppedFetchMore.current = false;
      }
    }
  };

  return (
    <Box>
      <TableContainer
        onScroll={fetchMore}
        sx={{ height: "450px" }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Возраст</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Адрес</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
