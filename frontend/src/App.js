import "./App.css";
import {
  IconButton,
  Stack,
  TextField,
  Button,
  ImageList,
  ImageListItem,
  Paper,
  InputAdornment,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  ImageListItemBar,
} from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useState } from "react";
import { storage } from "./fireBase-config/fireBaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [refresh, setRefresh] = useState(true);

  console.log({ search });

  const searchBar = (e) => {
    setSearch(e.target.value);
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const storageRef = ref(
        storage,
        `images/img${Math.floor(Math.random() * 10000)}.jpg`
      );
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
        },
        (error) => {
          console.log("===>", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
          });
        }
      );
    }
  };
  const getData = async (search) => {
    const response = await axios.get(
      `http://localhost:3001/getImage?searchTitle=${search}`
    );
    setImageList(response.data);
  };

  useEffect(() => {
    if (refresh) {
      getData(search);
    }
  }, [search, refresh]);

  const handleClickOpen = () => {
    setOpen(true);
    setRefresh(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const postImage = () => {
    if (open) {
      const urlReq = "http://localhost:3001/upload";

      const data = {
        title: title,
        imgURL: url,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios

        .post(urlReq, data, config)

        .then((response) => {
          console.log("Response:", response.data);
          setRefresh(true);
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    }
    setOpen(false);
  };

  console.log("===>", imageList);
  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        py={2}
        className="navbar"
      >
        <ButtonGroup>
          <TextField
            onChange={searchBar}
            color="secondary"
            size="small"
            label="Search"
            variant="outlined"
            className="search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ImageSearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            component="label"
            disableElevation
            color="secondary"
            endIcon={<UploadIcon />}
            onClick={handleClickOpen}
          >
            Upload
          </Button>
        </ButtonGroup>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Upload Image</DialogTitle>

          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Title of your Photo"
              type="text"
              fullWidth
              color="secondary"
              variant="standard"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              component="label"
              disableElevation
              color="secondary"
              endIcon={<UploadIcon />}
            >
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
            </Button>
            <LinearProgress
              variant="determinate"
              value={progress}
              className="loader"
              color="secondary"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button onClick={postImage} color="success">
              Upload
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
      <Paper
        sx={{
          padding: "32px",
          width: "700px",
          margin: "40px auto",
          border: "1px solid black",
          backgroundColor: "#7a777794",
        }}
      >
        <ImageList
          sx={{
            width: 650,
            height: 430,
            margin: "auto",
            scrollSnapType: "y mandatory",
          }}
          cols={3}
          rowHeight={317}
          gap={8}
          className="imagelist"
        >
          {imageList &&
            imageList.map((item) => (
              <ImageListItem
                key={item.title}
                sx={{
                  scrollSnapAlign: "start",
                  border: "1px solid black",
                }}
              >
                <img
                  src={`${item.imgURL}?w=164&h=164`}
                  srcSet={`${item.imgURL}?w=164&h=164`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar title={item.title} />
              </ImageListItem>
            ))}
        </ImageList>
      </Paper>
    </Stack>
  );
}

export default App;
