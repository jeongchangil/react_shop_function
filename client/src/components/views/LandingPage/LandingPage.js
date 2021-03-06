import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCode, FaHandHolding } from "react-icons/fa";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { category, price } from "./Sections/Data";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";

function LandingPage() {
  const [Product, setProduct] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [Filters, setFilters] = useState({
    category: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");
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
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider image={product.images} />
            </a>
          }
        >
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

  const handlePrice = (value) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
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

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* {CheckBox} */}
          <CheckBox
            list={category}
            hadleFilters={(filters) => handleFilters(filters, "category")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* {RadioBox} */}
          <RadioBox
            list={price}
            hadleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      {/* {Search} */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>
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
