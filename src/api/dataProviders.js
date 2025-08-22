export async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }
  return response.json();
}
