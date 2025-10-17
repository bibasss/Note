import { pool } from "../connection/db/postgresql";

export interface Receipt {
  username: string;
  amount: number;
  text: string;
}

export const RECEIPT_TEXTS = {
  INCOME: "income",
};

export async function addReceipt(receipt: Receipt) {
  const { username, amount, text } = receipt;
  const query = `
    INSERT INTO receipts (username, amount, text, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const values = [username, amount, text];

  const { rows } = await pool.query(query, values);
  return rows[0];
}
