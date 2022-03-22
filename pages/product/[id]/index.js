import Image from "next/image";
import { useState, useRef } from "react";
import ProductDetails from "../../../components/productDetails";
import { db } from "../../../firebaseAdminConfig";

import classes from "./productId.module.css";

export default function Product({ product }) {
  console.log("fok kak=", product);
  // const productImages =
  //"https://assets.brantu.com/product/p4364424/1000x1500/kava-womens-boy-friend-1630498480313-3.jpeg",
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
    console.log("of", obj);
    console.log("== \n", images);
    let res = await fetch("/api/product", {
      method: "POST",
      credentials: "same-origin",

      body: JSON.stringify(obj),
    });
    const { id } = await res.json();
    // router.push(`/product/${id}`);
    window.location.reload();
    console.log("id=", id);
  };

  if (edit) {
    editORsave = <div onClick={submit}>SAVE</div>;
  } else {
    editORsave = (
      <div
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
        <div>REMOVE</div>
        {editORsave}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // return {
  //   notFound: true,
  // };

  const productId = context.query.id;
  let product = await db.collection("products").doc(productId).get();
  // console.log("query1==", productId);
  if (product.exists) {
    product = await product.data();
  }
  console.log("query==", product.exists);
  return { props: { product: product } };
}

// {
//   price: 29,
//   colors: {
//     pink: [
//       'https://assets.brantu.com/product/p4364424/1000x1500/kava-womens-boy-friend-1630492248675-3.jpeg'
//     ],
//     hazle: [
//       'https://assets.brantu.com/product/p4364424/1000x1500/kava-womens-boy-friend-1630498480313-3.jpeg'
//     ]
//   },
//   sale: { pecent: 5, available: false },
//   id: '8qWLHw5hn5j09TvgbVcU',
//   type: 'AVA Kava Womens Boy Friend',
//   color: [ 'red' ],
//   availableSizes: [ 's', 'm' ],
//   name: 'KAVA Kava Womens Boy Friend',
//   description: 'The Long Coat is sold by YOXO. This product comes in Black and has a Plainstyle. If you are looking for Coats , then this item from YOXO is for you.',
//   specifications: {
//     Product_id: '8qWLHw5hn5j09TvgbVcU',
//     Material: 'Wool',
//     Pattern: 'Plain'
//   },
//   brand: 'KAVA'
// }
