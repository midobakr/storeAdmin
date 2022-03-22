import Link from "next/link";
import { AiOutlineDropbox } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";

import classes from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={classes.container}>
      <h2 className={classes.welcome}>Welcome Boss</h2>
      <div className={classes.container2}>
        <Link href="/products">
          <a className={classes.products}>
            <FaTshirt className={classes.icon} />
            Products
          </a>
        </Link>
        <Link href="/orders">
          <a className={classes.products}>
            <AiOutlineDropbox className={classes.icon} />
            Orders
          </a>
        </Link>
      </div>
    </div>
  );
}
