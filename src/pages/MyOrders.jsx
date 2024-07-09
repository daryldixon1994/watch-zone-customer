import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  PlaceholderLine,
  Placeholder,
  ItemImage,
  ItemHeader,
  ItemContent,
  Item,
  Image,
  ItemMeta,
} from "semantic-ui-react";
import { baseUrl, getToken } from "../utils";
function MyOrders() {
  let token = getToken();
  const [myOrders, setMyOrders] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseUrl}/myOrders`, {
        headers: {
          token,
          "access-control-allow-origin": window.location.origin,
        },
      })
      .then((res) => {
        setMyOrders(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.dir(err));
  }, [myOrders, token]);

  return (
    <div className="wz-page-container-orders">
      <Table size="large" basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Products</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Canceled</TableHeaderCell>
            <TableHeaderCell>Confirmed</TableHeaderCell>
            <TableHeaderCell>Delivered</TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myOrders.length > 0 ? (
            myOrders.map((order) => (
              <TableRow>
                <TableCell>
                  {order.cart.map((elt) => (
                    <Item className="table-cell-wz ">
                      <ItemImage>
                        <Image size="tiny" src={elt.productId.pImg} />
                      </ItemImage>
                      <ItemContent>
                        <ItemHeader as="a">{elt.productId.pName}</ItemHeader>
                        <ItemMeta>Quanity : {elt.qte}</ItemMeta>
                      </ItemContent>
                    </Item>
                  ))}
                </TableCell>
                <TableCell>
                  {" "}
                  {order.createdAt.substr(0, order.createdAt.indexOf("T"))}
                </TableCell>
                <TableCell> {order.isCanceled ? "Yes" : "No"} </TableCell>
                <TableCell> {order.isConfirmed ? "Yes" : "No"} </TableCell>
                <TableCell> {order.isDelivered ? "Yes" : "No"} </TableCell>
                <TableCell> {order.total} </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableRow>
                <TableCell>
                  <Placeholder>
                    <PlaceholderLine />
                  </Placeholder>
                </TableCell>
                <TableCell>
                  <Placeholder>
                    <PlaceholderLine />
                  </Placeholder>
                </TableCell>
                <TableCell>
                  <Placeholder>
                    <PlaceholderLine />
                  </Placeholder>
                </TableCell>
                <TableCell>
                  <Placeholder>
                    <PlaceholderLine />
                  </Placeholder>
                </TableCell>
                <TableCell>
                  <Placeholder>
                    <PlaceholderLine />
                  </Placeholder>
                </TableCell>
                <TableCell>
                  <Placeholder>
                    <PlaceholderLine />
                  </Placeholder>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default MyOrders;
