import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCode, FaHandHolding } from "react-icons/fa";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { category } from "./Sections/Data";

function LandingPage() {
  const [Product, setProduct] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [Filters, setFilters] = useState({
    category: [],
    price: [],
  });
  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((res) => {
      if (res.data.success) {
        console.log("main productList : ", res.data.productInfo);
        if (res.data.loadMore) {
          setProduct([...Product, ...res.data.productInfo]);
        } else {
          setProduct(res.data.productInfo);
        }
        setPostSize(res.data.postSize);
      } else {
        alert("상품을 가져오는데 실패 했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip,
      limit: Limit,
      loadMore: true,
    };
    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Product.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider image={product.images} />}>
          <Meta title={product.title} description={product.price} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;
    showFilteredResults(newFilters);
  };

  return (
    <div
      style={{
        width: "75%",
        margin: "3rem auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>상품 리스트</h2>
      </div>
      {/* {Filter} */}

      {/* {CheckBox} */}
      <CheckBox
        list={category}
        hadleFilters={(filters) => handleFilters(filters, "category")}
      />
      {/* {RadioBox} */}

      {/* {Search} */}
      {/* {Card} */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      {PostSize >= Limit && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
