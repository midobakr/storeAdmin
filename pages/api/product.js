import { db } from "../../firebaseAdminConfig";

export default async function handler(req, res) {
  try {
    const product = JSON.parse(req.body);
    let productDoc = "";
    if (product.id) {
      productDoc = await db.collection("products").doc(product.id);
    } else {
      productDoc = await db.collection("products").doc();
    }

    let ttt = await productDoc.set({
      ...product,
      id: productDoc.id,
      salePrice: Math.round(
        product.price - (product.salePercent / 100) * product.price
      ),
      lastEditDate: +new Date(),
    });
    res.status(200).json({ id: productDoc.id });
  } catch (e) {
    console.log("e=", e);
  }
}
