/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import Image from "next/image";
import classes from "./productDetails.module.css";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

export default function ProductDetails({
  product,
  edit,
  formRef,
  images,
  setImages,
  isNew,
}) {
  // const [images, setImages] = useState({ ...product.colors });
  const colorRef = useRef();

  // const submit = (e) => {
  //   e.preventDefault();
  //   let obj = {};
  //   const data = new FormData(e.target);
  //   for (let [key, value] of data.entries()) {
  //     if (obj[key]) {
  //       let tmp = [obj[key], value];
  //       obj[key] = tmp.flat();
  //     } else {
  //       obj[key] = value;
  //     }
  //   }
  // };

  const addImageToColor = (e, color) => {
    const value = e.target.value;
    console.log("value= ", value);
    if (!value) {
      return;
    }
    setImages((images) => {
      let tmp = { ...images };
      tmp[color] = images[color].concat(value);
      return tmp;
    });
    e.target.value = "";
  };
  const removeImage = (value, color) => {
    setImages((images) => {
      let tmp = { ...images };
      tmp[color] = images[color].filter((link) => link !== value);
      return tmp;
    });
  };
  const removeColor = (color) => {
    setImages((images) => {
      let tmp = {};
      Object.keys(images).forEach((C) => {
        if (C !== color) {
          tmp[C] = images[C];
        }
      });

      return tmp;
    });
  };
  const addColor = () => {
    const value = colorRef.current.value;
    if (!value) {
      return;
    }
    setImages((images) => {
      let tmp = { ...images };
      tmp[value] = [];
      return tmp;
    });
    colorRef.current.value = "";
  };
  return (
    <form className={classes.container} ref={formRef}>
      <div className={classes.item}>
        <label className={classes.itemLabel}>Product_ID :</label>
        <input
          type="text"
          className={classes.input}
          disabled={!isNew}
          name="id"
          defaultValue={product.id}
        />
      </div>
      <div className={classes.item}>
        <label className={classes.itemLabel}>BRAND :</label>
        <input
          type="text"
          className={classes.input}
          disabled={!edit}
          name="brand"
          defaultValue={product.brand}
        />
      </div>
      <div className={classes.item}>
        <label className={classes.itemLabel}>NAME :</label>
        <input
          type="text"
          className={classes.input}
          disabled={!edit}
          name="name"
          defaultValue={product.name}
        />
      </div>
      <div className={classes.item}>
        <label className={classes.itemLabel}>Last Edit Date :</label>
        <span className={classes.input}>
          {new Date(product.lastEditDate).toLocaleDateString()}
        </span>
      </div>
      <div className={classes.item}>
        <span className={classes.itemLabel}>PRICE :</span>
        <input
          name="price"
          type="number"
          disabled={!edit}
          className={classes.input}
          defaultValue={product.price}
        />
        $
      </div>
      {!isNew && (
        <div className={classes.item}>
          <span className={classes.itemLabel}>AVAILABLE COLORS :</span>
          <input
            type="text"
            disabled
            className={classes.input}
            defaultValue={product.colors.join("-")}
          />
        </div>
      )}

      <div className={classes.item}>
        <span className={classes.itemLabel}>SALE AVAILABLE? :</span>
        <select name="sale" className={classes.input} disabled={!edit}>
          <option selected={product.sale === "true" ? true : ""} value="true">
            YES
          </option>
          <option selected={product.sale === "false" ? true : ""} value="false">
            NO
          </option>
        </select>
      </div>
      <div className={classes.item}>
        <span className={classes.itemLabel}>Sale percent</span>
        <input
          type="number"
          disabled={!edit}
          className={classes.input}
          defaultValue={product.salePercent}
          name="salePercent"
        />
        %
      </div>
      {!isNew && (
        <div className={classes.item}>
          <span className={classes.itemLabel}>SALE Price</span>
          <input
            type="number"
            disabled
            className={classes.input}
            value={product.salePrice || 0}
            name="salePrice"
          />
          %
        </div>
      )}
      <div className={classes.item}>
        <span className={classes.itemLabel}>DESCRIPTION :</span>
        <textarea
          name="description"
          className={classes.input}
          disabled={!edit}
          cols="40"
          rows="7"
          defaultValue={product.description}
        ></textarea>
      </div>
      <div className={classes.item} style={{ flexDirection: "column" }}>
        <div>
          <span className={classes.itemLabel}>Available Sizes</span>
          <span className={classes.itemContent}>
            {product.availableSizes?.join("-")}
          </span>
        </div>
        {edit && (
          <div className={classes.inputGroupContainer}>
            <div className={classes.inputGroup}>
              <label>SMALL</label>
              <input
                type="checkbox"
                name="availableSizes"
                value="S"
                defaultChecked={product.availableSizes?.includes("S")}
              />
            </div>
            <div className={classes.inputGroup}>
              <label>MEDIUM</label>
              <input
                type="checkbox"
                name="availableSizes"
                value="M"
                defaultChecked={product.availableSizes?.includes("M")}
              />
            </div>
            <div className={classes.inputGroup}>
              <label>LARGE</label>
              <input
                type="checkbox"
                name="availableSizes"
                value="L"
                defaultChecked={product.availableSizes?.includes("L")}
              />
            </div>
            <div className={classes.inputGroup}>
              <label>XLARGE</label>
              <input
                type="checkbox"
                name="availableSizes"
                value="XL"
                defaultChecked={product.availableSizes?.includes("XL")}
              />
            </div>
            <div className={classes.inputGroup}>
              <label>XXLARGE</label>
              <input
                type="checkbox"
                name="availableSizes"
                value="XXL"
                defaultChecked={product.availableSizes?.includes("XXL")}
              />
            </div>
          </div>
        )}
      </div>
      <div className={classes.item} style={{ flexDirection: "column" }}>
        <span className={classes.itemLabel}>Images</span>
        {product.colors.map((color) => (
          <div key={color} style={{ padding: "10px" }}>
            <div>{color} images :</div>
            <ul className={classes.linkContainer}>
              {product.images[color].map((link) => (
                // eslint-disable-next-line react/jsx-no-comment-textnodes
                <li key={link}>
                  {/* // eslint-disable-next-line @next/next/no-img-element */}
                  <Image
                    src={link}
                    alt="photo"
                    width={100}
                    height={100}
                    layout="fixed"
                  />
                  <span>{link}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {edit && (
          <div className={classes.editImages}>
            {Object.keys(images).map((color) => (
              <div key={color}>
                <div className={classes.container7}>
                  <span
                    className={classes.iconContainer}
                    onClick={() => {
                      removeColor(color);
                    }}
                  >
                    <AiOutlineClose />
                  </span>
                  <span>{color} :</span>
                  <div className={classes.container9}>
                    <label htmlFor={color} className={classes.container8}>
                      <AiOutlinePlus />
                    </label>
                    <input
                      onClick={(e) => addImageToColor(e, color)}
                      id={color}
                      className={classes.input}
                      type="text"
                      defaultValue=""
                      placeholder={`add new ${color} image`}
                    />
                  </div>
                </div>
                <ul className={classes.list}>
                  {images[color].map((link) => (
                    <li key={link}>
                      <span
                        className={classes.iconContainer}
                        onClick={() => {
                          removeImage(link, color);
                        }}
                      >
                        <AiOutlineClose />
                      </span>
                      <input
                        type="text"
                        className={classes.input}
                        defaultValue={link}
                        disabled
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <label className={classes.container10} onClick={addColor}>
              <span className={classes.container8}>
                <AiOutlinePlus />
              </span>

              <input
                ref={colorRef}
                className={classes.input}
                type="text"
                defaultValue=""
                placeholder="add new color"
              />
            </label>
          </div>
        )}
      </div>
      <div className={classes.item}>
        <span className={classes.itemLabel}>KeyWords:</span>

        <textarea
          name="keywords"
          className={classes.input}
          disabled={!edit}
          cols="40"
          rows="7"
          defaultValue={product.keywords.join(" ")}
        ></textarea>
      </div>
    </form>
  );
}
