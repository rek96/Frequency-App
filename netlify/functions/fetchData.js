import fetch from "node-fetch";

export async function handler(event, context) {
  const { lat, lng } = event.queryStringParameters || {};

  try {
    const response = await fetch(
      `https://frekvens.erhvervsstyrelsen.dk/findKanalerAPI.php?output=JSON&language=da&lat=${lat}&lng=${lng}`
    );
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
}
