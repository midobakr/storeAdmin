import { db } from "../../firebaseAdminConfig";

export default async function handler(req, res) {
  const { id, status } = JSON.parse(req.body);
  const order = await db
    .collection("orders")
    .doc(id)
    .update({ status: status });

  res.status(200).json({ done: true });
}
