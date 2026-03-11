import pkg from "pg";
const { Client } = pkg;

export async function handler(event) {
  const data = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();

  await client.query(
    "INSERT INTO ucapan_lebaran (nama, pesan) VALUES ($1,$2)",
    [data.nama, data.pesan]
  );

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Pesan tersimpan" })
  };
}