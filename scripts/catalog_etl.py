import asyncio
import json
import requests
from pythclient.hermes import HermesClient

WB_INDICATORS_URL = "https://api.worldbank.org/v2/indicator?format=json&per_page=20000"
IMF_DATAFLOW_URL = "https://dataservices.imf.org/REST/SDMX_JSON.svc/Dataflow"


def fetch_worldbank_indicators():
    resp = requests.get(WB_INDICATORS_URL)
    resp.raise_for_status()
    data = resp.json()
    indicators = []
    for item in data[1]:
        indicators.append({"id": item.get("id"), "name": item.get("name")})
    return indicators


def fetch_imf_dataflows():
    try:
        resp = requests.get(IMF_DATAFLOW_URL)
        resp.raise_for_status()
    except requests.RequestException:
        return []

    data = resp.json()
    flows = data.get("Dataflow", {}).get("Dataflow", [])
    results = []
    for flow in flows:
        name_info = flow.get("Name")
        if isinstance(name_info, list):
            name = next((n.get("#text") for n in name_info if n.get("@xml:lang") == "en"), None)
        else:
            name = name_info.get("#text") if name_info else None
        results.append({
            "id": flow.get("KeyFamilyRef", {}).get("KeyFamilyID"),
            "name": name,
        })
    return results


async def fetch_pyth_price_feed_ids():
    client = HermesClient([])
    return await client.get_price_feed_ids()


def main():
    wb = fetch_worldbank_indicators()
    imf = fetch_imf_dataflows()
    pyth_ids = asyncio.run(fetch_pyth_price_feed_ids())

    with open("src/data/worldbank_indicators.json", "w") as f:
        json.dump(wb, f)
    with open("src/data/imf_dataflows.json", "w") as f:
        json.dump(imf, f)
    with open("src/data/pyth_price_feeds.json", "w") as f:
        json.dump(pyth_ids, f)

    print("Catalog data saved to src/data/ directory")


if __name__ == "__main__":
    main()
