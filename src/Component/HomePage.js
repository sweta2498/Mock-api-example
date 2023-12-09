
import { Avatar, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { setRegister, setSnackbar } from '../Redux/ActionCreator';
import { useDispatch } from 'react-redux';

const HomePage = () => {

    const [data, setData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/UserData").then((result) => {
            result.json().then((resp) => {
                setData(resp);
                console.log(resp);
            })
        })
    }
   
    function DeleteUser(id) {
      fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/UserData/${id}`, {
          method: 'DELETE'
      }).then((result) => {
          result.json().then((resp) => {
              console.log(resp);
              getData();
              dispatch(setSnackbar({
                  open: true,
                  message: "Record Delete Sucessfully..!!",
                  type: "success"
              }))
          })
      })
    }

  return (
    <div>
      <TableContainer component={Paper} sx={{ width: '120vh', mt: 12, mx: 35, border: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="center" width={40}>Sr. No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="center" width={30}>Profile</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="center" width={60}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="center" width={50}>Contact No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="center" width={40}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="center" width={40}>Option</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="center" width={40}>Option</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              data.map((row, i) => (
                <TableRow
                  key={i}>
                  <TableCell align="center" component="th" scope="row">{i + 1}</TableCell>
                  <TableCell align="center"><Avatar src={row.profilephoto} /></TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.contact}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton><Link to={"/update/" + row.id}><EditIcon /></Link></IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <IconButton onClick={() => DeleteUser(row.id)}><DeleteIcon /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default HomePage