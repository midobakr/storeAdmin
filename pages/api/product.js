import { db } from "../../firebaseAdminConfig";

export default async function handler(req, res) {
  const product = JSON.parse(req.body);
  console.log("req.body=", JSON.parse(req.body));
  let productDoc = "";
  if (product.id) {
    console.log("elmfrod mb2ash hna");
    productDoc = await db.collection("products").doc(product.id);
  } else {
    productDoc = await db.collection("products").doc();
    console.log("productDoc=", productDoc.id);
  }
  productDoc.set({
    ...product,
    id: productDoc.id,
    salePrice: Math.round(
      product.price - (product.salePercent / 100) * product.price
    ),
    lastEditDate: +new Date(),
  });
  console.log("da kda kda=", productDoc.id);
  res.status(200).json({ id: productDoc.id });
}
