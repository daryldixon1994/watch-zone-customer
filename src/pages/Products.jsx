import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import PrivateNavBar from "../components/PrivateNavBar";
import PublicNavBar from "../components/PublicNavBar";
import { baseUrl, getToken } from "../utils";
import { Card, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
function Products() {
  const navigate = useNavigate();
  const token = getToken();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseUrl}/products`, {
        headers: {
          "access-control-allow-origin": window.location.origin,
        },
      })
      .then((res) => {
        // console.log(res);
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.dir(err);
        setLoading(false);
      });
  }, []);
  function handleAddToCart(id) {
    if (token) {
      setLoading1(true);
      axios
        .post(
          `${baseUrl}/addProductToCart/${id}`,
          {},
          {
            headers: {
              token,
              "access-control-allow-origin": window.location.origin,
            },
          }
        )
        .then((res) => {
          setLoading1(false);
          console.log(res);
        })
        .catch((err) => {
          setLoading1(false);
          console.dir(err);
        });
    } else {
      navigate("/login");
    }
  }
  return (
    <div>
      {token ? <PrivateNavBar /> : <PublicNavBar />}
      <div className="wz-page-container-p">
        {loading ? (
          <h2>Loading....</h2>
        ) : (
          products.map(({ pImg, pAvailable, pDesc, pName, pPrice, _id }) => (
            <Card
              image={pImg}
              header={pName}
              meta={
                pAvailable ? (
                  <span
                    style={{
                      color: "green",
                      fontSize: "1.1rem",
                      fontWeight: "900",
                    }}
                  >
                    Available
                  </span>
                ) : (
                  <span
                    style={{
                      color: "red",
                      fontSize: "1.1rem",
                      fontWeight: "900",
                    }}
                  >
                    Out of stock
                  </span>
                )
              }
              extra={
                <div className="product-item-extra">
                  <span
                    style={{
                      color: "black",
                      fontSize: "1.5rem",
                      fontWeight: "900",
                    }}
                  >{`${pPrice} $`}</span>
                  <Button
                    loading={loading1}
                    onClick={() => handleAddToCart(_id)}
                    color="red"
                    disabled={!pAvailable}
                  >
                    Add to cart
                  </Button>
                </div>
              }
              description={pDesc}
              className="product-item"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
