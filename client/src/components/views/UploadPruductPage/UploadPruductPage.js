import React, { useState } from "react";
import { Button, Form, Input } from "antd";

import FileUpload from "../../utils/FileUpload";

const { TextArea } = Input;

function UploadPruductPage() {
  const [Title, setTitle] = useState("");
  const [Category, setCategory] = useState("");

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

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>여행 상품 업로드</h2>
      </div>

      <Form>
        <FileUpload/>
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />

        <br />
        <br />
        <label>설명</label>
        <TextArea />

        <br />
        <br />
        <label>가격</label>
        <Input />

        <br />
        <br />
        <select onChange={selectChangeHandler} value={Category}>
          {selectItem.map((item) => (
            <option key={item.id}>{item.value}</option>
          ))}
        </select>
        <br />
        <br />
        <Button>확인</Button>
      </Form>
    </div>
  );
}

export default UploadPruductPage;
