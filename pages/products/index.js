import Link from "next/link";
import SearchBar from "../../components/searchBar";
import Product from "../../components/product";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "../../firebaseAdminConfig";

import classes from "./products.module.css";

export default function Products({ products }) {
  return (
    <div className={classes.container}>
      <h2 className={classes.welcome}>ALL Products</h2>
      <div className={classes.container2}>
        <span>
          ADD NEW PRODUCT
          <Link href="/addProduct">
            <a>
              <AiOutlinePlus className={classes.icon} />
            </a>
          </Link>
        </span>
        <SearchBar />
      </div>
      <ul className={classes.products}>
        {products.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const querySnapshot = await db
    .collection("products")
    .orderBy("lastEditDate", "desc")
    .get();
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  return { props: { products: products } };
}
