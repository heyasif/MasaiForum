import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { logoutUser } from "./features/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const pages = [{ label: "Home", path: "/" }];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add useDispatch hook
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
    setOpenDrawer(false); // Close drawer after navigation
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logoutUser action
    handleCloseUserMenu();
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MASAI FORUM
            </Typography>
            {isLoggedIn ? (
              <>
                <Button
                  onClick={handleOpenUserMenu}
                  sx={{ mx: 1, color: "white" }}
                >
                  Welcome {user.username} <AccountCircleIcon />
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                sx={{ mx: 1, color: "white" }}
              >
                Login/Register
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenDrawer(false)}
          onKeyDown={() => setOpenDrawer(false)}
        >
          <MenuList />
        </Box>
      </SwipeableDrawer>
    </>
  );
}

function MenuList() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      {pages.map((page, index) => (
        <MenuItem key={index} onClick={() => handleNavigate(page.path)}>
          {page.label}
        </MenuItem>
      ))}
      {!isLoggedIn && (
        <>
          <MenuItem onClick={() => handleNavigate("/login")}>Login</MenuItem>
          <MenuItem onClick={() => handleNavigate("/signup")}>
            Register
          </MenuItem>
        </>
      )}
    </Box>
  );
}

export default ResponsiveAppBar;
