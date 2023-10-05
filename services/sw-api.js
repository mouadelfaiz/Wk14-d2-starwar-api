export async function getUrl(url) {
  try {
    let responde = await fetch(url);
    if (responde.ok) {
      const json = await responde.json();
      return json;
    }
  } catch (error) {
    console.log(error);
  }
}