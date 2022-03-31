import { db } from "../../firebaseAdminConfig";

export default async function handler(req, res) {
  try {
    const { id } = JSON.parse(req.body);
    await db.collection("products").doc(id).delete();

    res.status(200).json({ ok: true });
  } catch (e) {
    console.log("e=", e);
  }
}
