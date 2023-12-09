import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import pic from '../Images/pic.jpg'
import { setLogout } from '../Redux/ActionCreator';

const Menupage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const name = useSelector((state) => state.Login.name);
    const profile = useSelector((state) => state.Login.profilephoto);
  // console.log("=",datata);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function myprofile() {
    navigate("\myprofile");
  }

  function mypost() {
    navigate("\mypost");
  }
  function editpost() {
    navigate("\editpost");
  }

  function logoutbtn() {
    localStorage.removeItem('token');
    dispatch(setLogout());
    navigate("/login")
  }


  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Account Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={profile} sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <MenuItem>
          {name}
        </MenuItem>

        <MenuItem onClick={e=>myprofile()}>
          <Avatar src={profile} /> Profile
        </MenuItem>
        
        <MenuItem onClick={mypost}>
          <Avatar src={profile} /> My post
        </MenuItem>

        <MenuItem onClick={editpost}>
          <Avatar src={profile} /> Edit Post
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logoutbtn}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default Menupage