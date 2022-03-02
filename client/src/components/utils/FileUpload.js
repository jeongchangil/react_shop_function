import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Icon } from "antd";

function FileUpload() {
  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "contemt-type": "multipart/fomr-data" },
    };

    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((res) => {
      if (res.data.success) {
        console.log("파일업로드", res.data);
      } else {
        alert("파일저장에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
    </div>
  );
}

export default FileUpload;
