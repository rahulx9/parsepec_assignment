export async function getRequest(url) {
  try {
    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
