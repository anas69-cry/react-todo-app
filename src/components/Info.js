import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import "../index.css";
import validation from "./validation";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const Info = () => {
  const db = getDatabase();
  // Data Store
  let [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  let [updateBtn, setUpdateBtn] = useState(false);
  let [ids, setIds] = useState("");
  let [info, setInfo] = useState([]);
  const [errors, setErrors] = useState({});
  // Handle Inputs
  let handleChange = (e) => {
    let { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // handleSubmit
  let handleSubmit = () => {
    setErrors(validation(data));
  };
  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      data.name !== "" &&
      data.email !== "" &&
      data.phone !== ""
    ) {
      set(push(ref(db, "Users/")), {
        name: data.name,
        email: data.email,
        phone: data.phone,
      }).then = () => {
        setData({
          name: "",
          email: "",
          phone: "",
        });
      };
    }
  }, [errors]);
  //Get Data
  useEffect(() => {
    const starCountRef = ref(db, "Users/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((x) => {
        arr.push({ ...x.val(), id: x.key });
      });
      setInfo(arr);
    });
  }, []);
  // Get Info Value
  let handleEdit = (value) => {
    setData({
      name: value.name,
      email: value.email,
      phone: value.phone,
    });
    setUpdateBtn(true);
    setIds(value.id);
  };
  // Update Data
  let handleUpdate = () => {
    update(ref(db, "Users/" + ids), {
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    setData({
      name: "",
      email: "",
      phone: "",
    });
    setUpdateBtn(false);
  };
  // Remove Data
  let handleRemove = (id) => {
    remove(ref(db, "Users/" + id));
  };
  // Table

  return (
    <>
      <Container fixed>
        <Box sx={{ textAlign: "center" }}>
          <h1>Info</h1>
        </Box>
        <Box>
          <Grid
            className="alignCenter"
            container
            spacing={2}
            sx={{ justifyContent: "center" }}
          >
            <Grid item>
              <TextField
                onChange={handleChange}
                name="name"
                label="Full Name"
                id="outlined-size-small"
                size="small"
                value={data.name}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </Grid>

            <Grid item>
              <TextField
                onChange={handleChange}
                label="Email"
                id="outlined-size-small"
                size="small"
                value={data.email}
                name="email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </Grid>
            <Grid item>
              <TextField
                onChange={handleChange}
                label="Phone"
                id="outlined-size-small"
                size="small"
                value={data.phone}
                name="phone"
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </Grid>
          </Grid>
          <Box className="submit-btn" mt={2}>
            {updateBtn ? (
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Box>
        </Box>

        <TableContainer component={Paper} className="table-margin">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <h4 className="fwb">Full Name</h4>
                </TableCell>

                <TableCell align="center">
                  <h4 className="fwb">Email</h4>
                </TableCell>
                <TableCell align="center">
                  <h4 className="fwb">Phone</h4>
                </TableCell>
                <TableCell align="center">
                  <h4 className="fwb">Update & Delete</h4>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item.phone}</TableCell>
                  <TableCell align="center">
                    <EditIcon
                      onClick={() => handleEdit(item)}
                      className="table-padding cursor"
                      color="success"
                    />
                    <DeleteIcon
                      onClick={() => handleRemove(item.id)}
                      color="error"
                      className="cursor"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Info;
