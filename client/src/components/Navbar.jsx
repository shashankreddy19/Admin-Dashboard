import React,{useState} from 'react'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search, SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import Flex from './Flex'
import { setMode } from 'states/state'
import image from "assets/wallpaperflare.com_wallpaper (1).jpg"
import {
  AppBar, IconButton, InputBase, Toolbar, useTheme,
Button,Box,Menu,MenuItem,Typography} from '@mui/material'

const Navbar = ({user,isSideBarOpen, setIsSideBarOpen}) => {
    const dispatch = useDispatch()
  const theme = useTheme();
  const [anchor, setAnchor] = useState(null);
  const isOpen = Boolean(anchor);
  // console.log(isOpen)
  const handleClick = (e) =>
  {
    setAnchor(e.currentTarget);
    // console.log(e.currentTarget,isOpen)
  }
  const handleClose = () =>
  {
    setAnchor(null);
  }
return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <Flex>
          <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
          <Flex
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </Flex>
        </Flex>

        {/* RIGHT SIDE */}
        <Flex gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        <Flex>
          <Button onClick={handleClick} sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}>
                 <Box
                component="img"
                alt="profile"
                src={image}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
          </Button>
          <Menu anchorEl={anchor} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:"bottom" , horizontal:"center"}}>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
            </Flex>
            </Flex>
        </Toolbar>
        </AppBar>)
}

export default Navbar;
