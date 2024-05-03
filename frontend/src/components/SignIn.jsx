import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/authSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(loginUser(userData))
      .unwrap()
      .then((userData) => {
        setSuccessMessage("Login successful!");
        setOpenSuccessSnackbar(true);
        setTimeout(() => {
          navigate("/");
        }, 2000); // Delay navigation to ensure the Snackbar is visible
      })
      .catch((error) => {
        setErrorMessage(error || "Error logging in");
        setOpenErrorSnackbar(true);
      });
  };

  const handleCloseSnackbar = (type) => {
    if (type === "success") {
      setOpenSuccessSnackbar(false);
    } else {
      setOpenErrorSnackbar(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => handleCloseSnackbar("success")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => handleCloseSnackbar("success")}
          severity="success"
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => handleCloseSnackbar("error")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => handleCloseSnackbar("error")}
          severity="error"
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}
