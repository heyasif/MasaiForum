import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  filterContainer: {
    marginBottom: theme.spacing(2),
  },
  postContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    // color: "#fff",
    // backgroundColor: "#dfe8f7",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  mediaContainer: {
    flex: "0 0 auto",
    marginRight: theme.spacing(2),
  },
  media: {
    borderRadius: theme.shape.borderRadius,
    objectFit: "cover",
    height: 200, // Fixed height
    width: 300, // Fixed width
  },
  textContainer: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [postData, setPostData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: "",
    category: "",
    content: "",
    media: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts?page=${page}&limit=8`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPostData(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPost = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData.token;

      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPostData),
      });

      if (!response.ok) {
        throw new Error("Failed to add post");
      }
      const data = await response.json();
      setPostData([data, ...postData]);
      setOpenModal(false);
      setSnackbarMessage("Post added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error adding post:", error);
      setSnackbarMessage("Failed to add post");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const filteredPosts =
    filterCategory !== "All"
      ? postData.filter((post) => post.category === filterCategory)
      : postData;

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <FormControl fullWidth>
          <Select
            value={filterCategory}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "Category" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Innovation">Innovation</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
            <MenuItem value="Development">Development</MenuItem>
            <MenuItem value="Tutorial">Tutorial</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button variant="contained" color="primary" onClick={handleModalOpen}>
        Add Post
      </Button>
      <Grid container spacing={2}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} key={post._id}>
            <Paper elevation={0} className={classes.postContainer}>
              <div className={classes.mediaContainer}>
                {post.media && (
                  <CardMedia
                    component="img"
                    src={post.media[0]}
                    alt="Post media"
                    style={{
                      height: "200px", // Fixed height
                      width: "300px", // Fixed width
                      objectFit: "cover", // Ensures the image covers the area without distortion
                      borderRadius: "4px", // Assuming you want to maintain rounded corners
                    }}
                    imgProps={{
                      style: {
                        height: "200px",
                        width: "300px",
                      },
                    }}
                  />
                )}
              </div>
              <div className={classes.textContainer}>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Category: {post.category}
                </Typography>
                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>
                <div className={classes.iconContainer}>
                  <FavoriteIcon className={classes.icon} />
                  <Typography variant="body2">
                    Likes: {post.likes.length}
                  </Typography>
                </div>
                <div className={classes.iconContainer}>
                  <CommentIcon className={classes.icon} />
                  <Typography variant="body2">
                    Comments: {post.comments.length}
                  </Typography>
                </div>
                <div className={classes.iconContainer}>
                  <ScheduleIcon className={classes.icon} />
                  <Typography variant="body2">
                    Created at: {new Date(post.created_at).toLocaleString()}
                  </Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{ mt: 2, justifyContent: "center" }}
      />
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={newPostData.title}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <Select
              id="category"
              name="category"
              value={newPostData.category}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              <MenuItem value="Innovation">Innovation</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Development">Development</MenuItem>
              <MenuItem value="Tutorial">Tutorial</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="content"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={newPostData.content}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="media"
            name="media"
            label="Media URL"
            type="text"
            fullWidth
            value={newPostData.media}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPost} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position Snackbar at the top right
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
