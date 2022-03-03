import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";

import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { TextArea } = Input;

function UploadPruductPage(props) {
  const [Title, setTitle] = useState("");
  const [Category, setCategory] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Image, setImage] = useState([]);

  const selectItem = [
    { id: 1, value: "카테고리 1" },
    { id: 2, value: "카테고리 2" },
    { id: 3, value: "카테고리 3" },
    { id: 4, value: "카테고리 4" },
    { id: 5, value: "카테고리 5" },
  ];

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const selectChangeHandler = (event) => {
    setCategory(event.currentTarget.value);
    console.log(event.currentTarget.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const updateImage = (newImage) => {
    setImage(newImage);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Title || !Category || !Description || Price || Image) {
      return alert("모든 값을 넣어주세요.");
    }

    const body = {
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Image,
      continents: Category,
    };

    Axios.post("/api/product", body).then((res) => {
      if (res.data.success) {
        alert("상품등록에 성공했습니다.");
        props.history.push("/");
      } else {
        alert("상품등록에 실패 했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>여행 상품 업로드</h2>
      </div>

      <Form>
        <FileUpload updateImage={updateImage} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />

        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionHandler} value={Description} />

        <br />
        <br />
        <label>가격</label>
        <Input onChange={priceHandler} value={Price} />

        <br />
        <br />
        <select onChange={selectChangeHandler} value={Category}>
          {selectItem.map((item) => (
            <option key={item.id}>{item.value}</option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={submitHandler}>확인</Button>
      </Form>
    </div>
  );
}

export default UploadPruductPage;
