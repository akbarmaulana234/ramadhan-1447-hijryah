export async function getDoa() {
  const res = await fetch('/.netlify/functions/get-doa');
  return await res.json();
}

export async function addDoa(text) {
  await fetch('/.netlify/functions/add-doa', {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}