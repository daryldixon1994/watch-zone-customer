import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils";
import "./style.css";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  ButtonOr,
  ButtonGroup,
  Button,
  ItemImage,
  ItemHeader,
  ItemContent,
  Item,
  Image,
  PlaceholderParagraph,
  PlaceholderLine,
  PlaceholderHeader,
  Placeholder,
} from "semantic-ui-react";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Cart() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [cart, setCart] = useState([]);
  // const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  // console.log(cart);
  // console.log("loading:", loading);
  useEffect(() => {
    axios
      .get(`${baseUrl}/cart`, {
        headers: {
          token,
          "access-control-allow-origin": window.location.origin,
        },
      })
      .then((res) => {
        setLoadingCart(false);
        setCart(res.data.data);
        // console.log(res);
      })
      .catch((err) => {
        setLoadingCart(true);
        console.dir(err);
      });
  }, [cart, token]);
  const tab = [1, 2, 3];
  function handleIncProduct(id) {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/incProductOfCart/${id}`,
        {},
        {
          headers: {
            token,
            "access-control-allow-origin": window.location.origin,
          },
        }
      )
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }
  function handleDecProduct(id, qte) {
    if (qte > 1) {
      setLoading(true);
      return axios
        .put(
          `${baseUrl}/decProductOfCart/${id}`,
          {},
          {
            headers: {
              token,
              "access-control-allow-origin": window.location.origin,
            },
          }
        )
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      return alert("Minimum one item should be selected");
    }
  }
  function handleCreateOrder(total) {
    setLoadingOrder(true);
    axios
      .post(
        `${baseUrl}/createOrder`,
        { total },
        {
          headers: {
            token,
            "access-control-allow-origin": window.location.origin,
          },
        }
      )
      .then(() => {
        setLoadingOrder(false);
        navigate("/orders");
      })
      .catch(() => setLoadingOrder(false));
  }
  function handleDeleteProduct(id) {
    setLoadingDelete(true);
    axios
      .delete(`${baseUrl}/deleteProductFromCart/${id}`, {
        headers: {
          token,
          "access-control-allow-origin": window.location.origin,
        },
      })
      .then(() => setLoadingDelete(false))
      .catch((err) => {
        setLoadingDelete(false);
        console.dir(err);
      });
  }
  return (
    <div className="wz-page-container-p">
      <div className="wz-cart-table">
        <Table columns={4} basic>
          <TableHeader>
            <TableRow textAlign="center">
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Remove</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            <>
              {!loadingCart
                ? cart.map((elt) => (
                    <TableRow textAlign="center">
                      <TableCell>
                        <Item className="table-cell-wz ">
                          <ItemImage>
                            <Image size="tiny" src={elt.productId.pImg} />
                          </ItemImage>
                          <ItemContent>
                            <ItemHeader as="a">
                              {elt.productId.pName}
                            </ItemHeader>
                            {/* <ItemMeta>Description</ItemMeta> */}
                          </ItemContent>
                        </Item>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <ButtonGroup size="medium">
                          <Button
                            loading={loading}
                            color="black"
                            onClick={() => handleIncProduct(elt._id)}
                          >
                            +
                          </Button>
                          <ButtonOr
                            style={{ color: "black" }}
                            className="qte-btn"
                            text={elt.qte}
                          />
                          <Button
                            loading={loading}
                            onClick={() => handleDecProduct(elt._id, elt.qte)}
                          >
                            -
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteProduct(elt._id)}
                          loading={loadingDelete}
                          icon
                        >
                          <FaTrash />
                        </Button>
                      </TableCell>
                      <TableCell>{elt.productId.pPrice} $</TableCell>
                    </TableRow>
                  ))
                : tab.map(() => (
                    <TableRow>
                      <TableCell>
                        <Placeholder>
                          <PlaceholderHeader image>
                            <PlaceholderLine />
                            <PlaceholderLine />
                          </PlaceholderHeader>
                          <PlaceholderParagraph>
                            <PlaceholderLine length="medium" />
                            <PlaceholderLine length="short" />
                          </PlaceholderParagraph>
                        </Placeholder>
                      </TableCell>
                      <TableCell>
                        <Placeholder>
                          <PlaceholderLine length="short" />
                        </Placeholder>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Placeholder>
                          <PlaceholderLine length="short" />
                        </Placeholder>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Placeholder>
                          <PlaceholderLine length="short" />
                        </Placeholder>
                      </TableCell>
                    </TableRow>
                  ))}
              <TableRow>
                <TableCell textAlign="right" colSpan="4">
                  <span
                    style={{
                      color: "red",
                      fontWeight: 900,
                      fontSize: "1.5rem",
                    }}
                  >
                    Total :{" "}
                    {cart.reduce(
                      (acc, cur) => acc + cur.qte * cur.productId.pPrice,
                      0
                    )}
                    $
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell textAlign="right" colSpan="4">
                  <Button
                    loading={loadingOrder}
                    onClick={() =>
                      handleCreateOrder(
                        cart.reduce(
                          (acc, cur) => acc + cur.qte * cur.productId.pPrice,
                          0
                        )
                      )
                    }
                    color="red"
                    disabled={cart.length === 0}
                  >
                    Purshase
                  </Button>
                </TableCell>
              </TableRow>
            </>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Cart;
