import { neon } from '@netlify/neon';

export default async () => {
  const sql = neon();

  const data = await sql`SELECT * FROM doa`;

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
};