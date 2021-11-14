import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Fade,
  makeStyles,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import cx from "classnames";
import { createPost } from "../redux/actions/profileActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSvgIcon-root": {
      marginTop: "5px",
    },
  },
  input: {
    display: "none",
  },
  inputStyle: {},
  absolute: {
    border: "2px solid #efb6b2",
    backgroundColor: "#efb6b2",
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "#efb6b2",
      border: "none",
    },
  },
}));

function FormDialog({
  isAuth,
  uploadPost,
  setShowProgress,
}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [previewFile, setPreviewFile] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleChange = (e) => {
    let file = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/jpg"];
    if (file && types.includes(file.type)) {
      setPreviewFile(URL.createObjectURL(file));
      setFile(file);
      setError("");
      setOpen(true);
    } else {
      setError("Please select an image file (png/jpeg)");
      setFile(null);
      console.log(error);
    }
  };

  const handlePost = (e) => {
    // console.log(file, caption);
    handleClose();
    const bodyFormData = new FormData();
    bodyFormData.append("caption", caption);
    bodyFormData.append("image", file);
    uploadPost(bodyFormData, setShowProgress);
    setShowProgress(true);
  };

  return (
    <div>
      <div>
        <input
          onChange={handleChange}
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <Tooltip
          className={classes.root}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="Upload a photo"
          aria-label="add"
        >
          <Fab className={cx(classes.absolute)}>
            <label htmlFor="icon-button-file">
              <AddIcon />
            </label>
          </Fab>
        </Tooltip>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="what's new with you ?"
              // style={{
              //     display: block
              // }}
              fullwidth={true}
              onChange={handleCaptionChange}
            />
          </DialogContentText>

          {previewFile && (
            <img
              src={previewFile}
              alt="uploaded"
              width={550}
              // height="40%"
            ></img>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPost: (data, setShowProgress) => {
      dispatch(createPost(data, setShowProgress));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FormDialog);
