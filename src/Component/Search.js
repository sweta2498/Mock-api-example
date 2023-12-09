import { Avatar, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import pic from '../Images/pic.jpg';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    // const [search, setSearch] = useState("")
    const [data, setData] = useState("")

    async function searchdata(key) {
        let result = await fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/UserData?search=` + key);
        result = await result.json();
        console.log("search===", result);
        setData(result);
    }
    return (
        <div>
            <TextField sx={{ mt: 10, justifyContent: 'center', alignItems: 'center' }}
                label="Search Detail"
                onChange={(e) => searchdata(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            {
                data.length > 0 ?
                    <TableContainer component={Paper} sx={{width:'100vh', mt: 5, mx:40,border: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Table sx={{}} aria-label="simple table">
                            <TableHead >
                                <TableRow >
                                    <TableCell sx={{fontWeight:'bold',fontSize:16}} width={100}align="center">Sr. No.</TableCell>
                                    <TableCell sx={{fontWeight:'bold',fontSize:16}} width={100} align="center">Profile</TableCell>
                                    <TableCell sx={{fontWeight:'bold',fontSize:16}} align="center">Name</TableCell>
                                    <TableCell sx={{fontWeight:'bold',fontSize:16}} align="center">Contact No</TableCell>
                                    <TableCell sx={{fontWeight:'bold',fontSize:16}} align="center">Email</TableCell>
                        
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    data.map((row, i) => (
                                        <TableRow
                                            key={i}>
                                            <TableCell align="center" component="th" scope="row">{i + 1}</TableCell>
                                            <TableCell align="center"><Avatar src={pic} /></TableCell>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.contact}</TableCell>
                                            <TableCell align="center">{row.email}</TableCell>

                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : null
            }
        </div>
    )
}

export default Search