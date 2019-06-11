import React, { Fragment, useState, useEffect } from "react";
// import { SERVER_URL } from "./../../../config";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Switch,
  Paper,
  CircularProgress
} from "@material-ui/core";
import "./settings.css";
import "./../../../App.css";
//import axios from "axios";

const MemberList = function(props) {
  const boardMembers = [
    {
      user: { name: "John walker" },
      role: "SUPER_ADMIN"
    },
    {
      user: { name: "Peter Parker" },
      role: "ADMIN"
    },
    {
      user: { name: "Chota Bhim" },
      role: "USER"
    },
    {
      user: { name: "Theda gabbar" },
      role: "USER"
    },
    {
      user: { name: "Thakur" },
      role: "USER"
    },
    {
      user: { name: "Basanti" },
      role: "USER"
    }
  ];
  const [members, setMembers] = useState(boardMembers);
  const [isDataLoaded, setDataLoaded] = useState(true);
  setTimeout(() => {
    setDataLoaded(false);
  }, 3000);
  //useEffect(fetchBoardMembers, [props]);
  // const fetchBoardMembers = async () => {
  //   const boardMembers = await axios(SERVER_URL + "/board/members/:id");
  //   setMembers(boardMembers);
  //   setDataLoaded(false);
  // };

  // const updateBoardMember = async data => {
  //   await axios({
  //     url: `${SERVER_URL}/board/members/:id`,
  //     method: "patch",
  //     data
  //   });
  //   fetchBoardMembers();
  // };
  const setMemberRole = (isChecked, index) => {
    const boardMembers = Object.assign([], members);
    if (isChecked) {
      boardMembers[index].role = "ADMIN";
    } else {
      boardMembers[index].role = "USER";
    }
    // updateBoardMember({
    //   role: boardMembers[index].role,
    //   member: boardMembers[index].user._id
    // });
    setMembers(boardMembers);
  };
  return isDataLoaded ? (
    <CircularProgress className="loader-center" />
  ) : (
    <div className="member-table">
      <Paper>
        <Typography variant="h6" id="tableTitle" className="table-heading">
          Board Members
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Update Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((row, index) => {
              if (row.role === "ADMIN") {
                row.switch = true;
              } else {
                row.switch = false;
              }
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.user.name}
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={row.role} color="primary" />
                  </TableCell>
                  <TableCell align="center">
                    {row.role !== "SUPER_ADMIN" && (
                      <Switch
                        checked={row.switch}
                        onChange={event => {
                          setMemberRole(event.target.checked, index);
                        }}
                        value="roleSwitch"
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default MemberList;
