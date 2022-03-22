import Link from "next/link";
import { useState } from "react";

import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

import classes from "./product.module.css";
export default function Product({ product }) {
  const [isActive, setActive] = useState(false);
  let expandORcollapse = "";
  if (isActive) {
    expandORcollapse = (
      <div
        className={classes.iconContainer}
        onClick={() => {
          setActive(false);
        }}
      >
        <AiOutlineUp className={classes.icon} />
      </div>
    );
  } else {
    expandORcollapse = (
      <div
        className={classes.iconContainer}
        onClick={() => {
          setActive(true);
        }}
      >
        <AiOutlineDown className={classes.icon} />
      </div>
    );
  }
  return (
    <li className={classes.product}>
      <Link href={"product/" + product.id}>
        <a>
          <div className={classes.productDetails}>
            <span>{product.name}</span>
            <span>{product.id}</span>
          </div>
        </a>
      </Link>
      {expandORcollapse}
      <div className={isActive ? classes.expand : classes.collapse}>
        <div className={classes.groupContainer}>
          <div className={classes.group}>
            <span className={classes.label}>Product Id :</span>
            <span className={classes.content}>{product.id}</span>
          </div>
          <div className={classes.group}>
            <span className={classes.label}>name :</span>
            <span className={classes.content}>{product.name}</span>
          </div>
          <div className={classes.group}>
            <span className={classes.label}>price :</span>
            <span className={classes.content}>{product.price}$</span>
          </div>
        </div>
      </div>
    </li>
  );
}
