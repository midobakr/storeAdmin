import { useState } from "react";

import classes from "./searchBar.module.css";
import { MdClose } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
export default function SearchBar() {
  const [value, setValue] = useState("");
  function search(e) {
    e.preventDefault();
  }

  const saveInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={classes.search_bar}>
      <input
        type="text"
        placeholder="Search products"
        className={classes.search_field}
        value={value}
        onChange={saveInput}
      ></input>
      <div onClick={search}>
        <AiOutlineSearch className={classes.search_icon} />
      </div>
    </div>
  );
}
