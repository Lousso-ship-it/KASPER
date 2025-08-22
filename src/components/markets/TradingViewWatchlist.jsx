import React, { useEffect, useRef, memo } from 'react';

const TradingViewWatchlist = memo(({ symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA"] }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "100%",
        "symbolsGroups": [
          {
            "name": "Watchlist",
            "originalName": "Indices",
            "symbols": ${JSON.stringify(symbols.map(symbol => ({ name: `NASDAQ:${symbol}` })))}
          }
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": true,
        "locale": "en",
        "backgroundColor": "rgba(26, 26, 26, 1)"
      }`;
    
    if (container.current) {
      container.current.innerHTML = '';
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbols]);

  return (
    <div className="tradingview-widget-container w-full h-full bg-[#1a1a1a]" ref={container}>
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
});

TradingViewWatchlist.displayName = 'TradingViewWatchlist';

export default TradingViewWatchlist;