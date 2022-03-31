import { useState } from "react";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";

import OrderItems from "../../components/orderItems";
import SearchBar from "../../components/searchBar";

import { db } from "../../firebaseAdminConfig";

import classes from "./myOrders.module.css";

export default function MyOrders({ orders }) {
  const [activeOrder, setActiveOrder] = useState("");
  const [ordersList, setOrdersList] = useState(orders);
  const updateOrder = async (e, id) => {
    const value = e.target.value;
    let res = await fetch("/api/order", {
      method: "POST",
      credentials: "same-origin",

      body: JSON.stringify({ id: id, status: value }),
    });
    if (res.ok) {
      window.location.reload();
    }
  };
  return (
    <div className={classes.container}>
      <h1>My Orders</h1>
      <SearchBar productsList={orders} setProductList={setOrdersList} />

      <div className={classes.ordersContainer}>
        {ordersList.map((order) => (
          <div key={order.id} className={classes.order}>
            <div className={classes.orderDetails}>
              <span className={classes.orderId}>{order.id}</span>
              <span className={classes.orderDate}>
                {formatDate(order.date)}
              </span>
            </div>
            <div className={classes.orderStatus}>
              <select
                name="sale"
                className={classes.input}
                onChange={(e) => {
                  updateOrder(e, order.id);
                }}
              >
                <option
                  selected={order.status === "processing" ? true : ""}
                  value="processing"
                >
                  PROCESSING
                </option>
                <option
                  selected={order.status === "rejected" ? true : ""}
                  value="rejected"
                >
                  REJECTED
                </option>
                <option
                  selected={order.status === "delivered" ? true : ""}
                  value="delivered"
                >
                  DELIVERED
                </option>
                <option
                  selected={order.status === "onWay" ? true : ""}
                  value="onWay"
                >
                  On Its WAY
                </option>
              </select>
            </div>
            <div className={classes.orderAddress}>
              <div className={classes.contacts}>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Order Name: </span>
                  <span className={classes.info}>
                    {order.shippingDetails.name}
                  </span>
                </div>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Phone Number : </span>
                  <span className={classes.info}>
                    {order.shippingDetails.phone}
                  </span>
                </div>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Order Price : </span>
                  <span className={classes.info}>
                    {order.products.totalPrice}
                  </span>
                </div>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Address : </span>
                  <span className={classes.info}>
                    {order.shippingDetails.building}{" "}
                    {order.shippingDetails.street} ST &nbsp;{" "}
                    {order.shippingDetails.city}
                  </span>
                </div>
                <div className={classes.orderInfo}>
                  <span className={classes.label}>Appartment : </span>
                  <span className={classes.info}>
                    {order.shippingDetails.apartment}
                  </span>
                </div>
              </div>
            </div>

            {activeOrder === order.id ? (
              <div className={classes.collapse}>
                <span
                  className={classes.test}
                  onClick={() => {
                    setActiveOrder("");
                  }}
                >
                  <AiOutlineUpCircle />
                </span>
              </div>
            ) : (
              <div className={classes.expand}>
                <span
                  className={classes.test}
                  onClick={() => {
                    setActiveOrder(order.id);
                  }}
                >
                  <AiOutlineDownCircle />
                </span>
              </div>
            )}
            <OrderItems
              active={activeOrder === order.id}
              items={order.products.cart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

export async function getServerSideProps(context) {
  let ordersSnapshot = await db
    .collection("orders")
    .orderBy("date", "desc")
    .get();

  let orders = [];
  ordersSnapshot.forEach((doc) => {
    orders.push(doc.data());
  });

  return { props: { orders: orders } };
}
