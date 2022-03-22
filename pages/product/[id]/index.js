import Image from "next/image";
import { useState, useRef } from "react";
import ProductDetails from "../../../components/productDetails";
import { db } from "../../../firebaseAdminConfig";

import classes from "./productId.module.css";

export default function Product({ product }) {
  const [edit, setEdit] = useState(false);
  const [images, setImages] = useState({ ...product.images });

  const formRef = useRef();

  let editORsave = "";

  const submit = async () => {
    setEdit(false);
    let obj = {};
    const data = new FormData(formRef.current);
    for (let [key, value] of data.entries()) {
      if (obj[key]) {
        let tmp = [obj[key], value];
        obj[key] = tmp.flat();
      } else {
        obj[key] = value;
      }
    }
    obj.images = images;
    obj.id = product.id;
    obj.colors = Object.keys(images);
    obj.keywords = obj.keywords.split(" ");

    let res = await fetch("/api/product", {
      method: "POST",
      credentials: "same-origin",

      body: JSON.stringify(obj),
    });
    const { id } = await res.json();
    window.location.reload();
  };

  if (edit) {
    editORsave = (
      <div style={{ cursor: "pointer" }} onClick={submit}>
        SAVE
      </div>
    );
  } else {
    editORsave = (
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setEdit(true);
        }}
      >
        EDIT
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <h1 className={classes.name}>{product.name}</h1>

      <ProductDetails
        formRef={formRef}
        product={product}
        edit={edit}
        setImages={setImages}
        images={images}
      />
      <div className={classes.buttonContainer}>
        <div style={{ cursor: "pointer" }}>REMOVE</div>
        {editORsave}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const productId = context.query.id;
  let product = await db.collection("products").doc(productId).get();
  if (product.exists) {
    product = await product.data();
  }
  return { props: { product: product } };
}
