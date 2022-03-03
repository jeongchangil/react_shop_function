import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Icon } from "antd";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/fomr-data" },
    };

    formData.append("file", files[0]);

    axios
      .post("http://localhost:5000/api/product/image", formData, config)
      .then((res) => {
        if (res.data.success) {
          console.log("파일업로드", res.data);
          setImages([...Images, res.data.filePath]);
          props.updateImage([...Images, res.data.filePath]);
        } else {
          alert("파일저장에 실패했습니다.");
        }
      });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.updateImage(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div style={{ display: "flex" }} key={index}>
            <Icon
              onClick={() => deleteHandler(image)}
              type="close"
              style={{
                position: "relative",
                left: "10px",
                fontSize: "1rem",
              }}
            />
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
