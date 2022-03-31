import classes from "./searchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
export default function SearchBar({ productsList, setProductList }) {
  function search(e) {
    e.preventDefault();
  }
  const saveInput = (e) => {
    const searchValue = e.target.value;

    let tmp = productsList.filter(
      (ele) =>
        ele?.name?.toLowerCase().search(searchValue.toLowerCase()) >= 0 ||
        ele.id.search(searchValue) >= 0
    );
    setProductList(tmp);
  };

  return (
    <div className={classes.search_bar}>
      <input
        type="text"
        placeholder="Search products"
        className={classes.search_field}
        // value={value}
        onChange={saveInput}
      ></input>
      <div onClick={search}>
        <AiOutlineSearch className={classes.search_icon} />
      </div>
    </div>
  );
}
