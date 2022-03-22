import { useRouter } from "next/router";
import { useState, useRef } from "react";
import ProductDetails from "../../components/productDetails";

import classes from "./addProduct.module.css";

const product = {
  id: "",
  lastEditDate: +new Date(),
  sale: "false",
  salePercent: 0,
  price: 0,
  brand: "",
  name: "",
  availableSizes: [],
  colors: [],
  images: {},
  description: "",
  keywords: [],
};

export default function AddProduct() {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [images, setImages] = useState({});

  const formRef = useRef();

  const submit = async () => {
    // setEdit(false);
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
    obj.colors = Object.keys(images);
    obj.keywords = obj.keywords.split(" ");

    let res = await fetch("/api/product", {
      method: "POST",
      credentials: "same-origin",

      body: JSON.stringify(obj),
    });
    const { id } = await res.json();
    router.push(`/product/${id}`);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.name}>New Product</h1>

      <ProductDetails
        isNew
        formRef={formRef}
        product={product}
        edit={true}
        setImages={setImages}
        images={images}
      />
      <div className={classes.buttonContainer}>
        <div>REMOVE</div>
        <div onClick={submit}>SAVE</div>
      </div>
    </div>
  );
}
