#!/usr/bin/env python3
"""
ETL pipeline retrieving price data from Pyth Network and Yahoo Finance.

This script randomly selects a subset of assets, fetches their latest prices
from the Pyth Network and Yahoo Finance, transforms the data into a unified
format and stores the combined result as JSON for the frontend.
"""

import os
import random
from datetime import UTC, datetime
from typing import List, Dict

import pandas as pd
import requests
import yfinance as yf

# Available assets. You can extend this list with any symbols supported by
# both Pyth Network and Yahoo Finance.
PYTH_SYMBOLS = ["BTC/USD", "ETH/USD", "SOL/USD", "AAPL/USD"]

# Mapping from Pyth symbol to Pyth Network price feed id
PYTH_FEEDS = {
    "BTC/USD": "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    "ETH/USD": "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    "SOL/USD": "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
    "AAPL/USD": "49f6b65cb1de6b10eaf75e7c03ca029c306d0357e91b5311b175084a5ad55688",
}

# Mapping from Pyth symbol to Yahoo Finance ticker symbol.
YFINANCE_TICKERS = {
    "BTC/USD": "BTC-USD",
    "ETH/USD": "ETH-USD",
    "SOL/USD": "SOL-USD",
    "AAPL/USD": "AAPL",
}


def extract_pyth(symbols: List[str]) -> List[Dict]:
    """Fetch latest prices for the given symbols from Pyth Network."""
    ids = [PYTH_FEEDS[s] for s in symbols]
    params = [("ids[]", pid) for pid in ids]
    url = "https://hermes.pyth.network/api/latest_price_feeds"
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    feeds = response.json()

    records = []
    for sym, feed in zip(symbols, feeds):
        price_info = feed["price"]
        # Convert price using exponent
        price = int(price_info["price"]) * (10 ** int(price_info["expo"]))
        timestamp = datetime.fromtimestamp(int(price_info["publish_time"]), tz=UTC)
        records.append(
            {
                "symbol": sym.replace("/", ""),
                "source": "pyth",
                "price": price,
                "timestamp": timestamp,
            }
        )
    return records


def extract_yfinance(symbols: List[str]) -> List[Dict]:
    """Fetch latest closing prices for the given symbols from Yahoo Finance."""
    records = []
    for sym in symbols:
        ticker = YFINANCE_TICKERS[sym]
        hist = yf.Ticker(ticker).history(period="1d")
        if not hist.empty:
            price = float(hist["Close"].iloc[-1])
            timestamp = hist.index[-1].to_pydatetime().astimezone(UTC)
            records.append(
                {
                    "symbol": sym.replace("/", ""),
                    "source": "yfinance",
                    "price": price,
                    "timestamp": timestamp,
                }
            )
    return records


def load_to_files(records: List[Dict], csv_path: str, json_path: str) -> None:
    """Save records into CSV and JSON files."""
    df = pd.DataFrame(records)
    os.makedirs(os.path.dirname(csv_path), exist_ok=True)
    df.to_csv(csv_path, index=False)
    os.makedirs(os.path.dirname(json_path), exist_ok=True)
    df.to_json(json_path, orient="records", date_format="iso")


def run_etl(sample_size: int = 2) -> None:
    """Run the ETL process for a random subset of assets."""
    if sample_size > len(PYTH_SYMBOLS):
        raise ValueError("sample_size exceeds available symbols")

    chosen = random.sample(PYTH_SYMBOLS, sample_size)
    pyth_records = extract_pyth(chosen)
    yf_records = extract_yfinance(chosen)
    combined = pyth_records + yf_records
    load_to_files(combined, "data/prices.csv", "src/data/prices.json")
    print(pd.DataFrame(combined))


if __name__ == "__main__":
    run_etl()
