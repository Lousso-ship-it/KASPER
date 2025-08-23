const PYTH_API_URL = 'https://hermes.pyth.network/api/latest_price_feeds';

export async function fetchPythPrices(feedIds) {
  const params = feedIds.map(id => `ids[]=${id}`).join('&');
  const res = await fetch(`${PYTH_API_URL}?${params}`);
  if (!res.ok) {
    throw new Error('Failed to fetch Pyth prices');
  }
  const json = await res.json();
  return json.map(item => {
    const price = Number(item.price.price) * Math.pow(10, item.price.expo);
    const conf = Number(item.price.conf) * Math.pow(10, item.price.expo);
    return {
      id: item.id,
      price,
      conf,
      publishTime: item.price.publish_time,
    };
  });
}

export default fetchPythPrices;
