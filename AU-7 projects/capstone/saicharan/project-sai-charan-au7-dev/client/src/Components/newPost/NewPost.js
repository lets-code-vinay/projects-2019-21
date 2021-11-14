import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import authHeader from "../../Services/authHeader";
import axios from "axios";

function NewPost() {
  const header = {
    "Content-Type": "application/json",
    authorization: authHeader(),
  };
  const URL = "https://mcsocialmedia.herokuapp.com";
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [body, setBody] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  console.log(body);
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      console.log("reader", reader);
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    await axios
      .post(
        URL + "/post/createpost",
        JSON.stringify({ pic: base64EncodedImage, body: body }),

        {
          headers: header,
        }
      )
      .then((result) => {
        console.log(result.data);
        setSelectedFile('')
        setBody('')

      })
      .catch((err) => {
        console.log(err);
      }); /*
    try {
      await fetch("//upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }*/
  };
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <form encType="multipart/form-data" onSubmit={handleSubmitFile}>
          <input
            className="w3-input w3-border w3-light-grey"
            type="text"
            placeholder="Enter your text here!!!"
            name="body"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></input>

          <input
            className="w3-input w3-border w3-light-grey"
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
          ></input>

          <br />
          <button type="submit" className="w3-button w3-theme">
             Post
          </button>
        </form>
        {previewSource && (
          <img
            src={previewSource}
            alt="choosen"
            style={{ height: "100px", width: "100px" }}
          />
        )}
      </div>
    </div>
  );
}

export default NewPost;
