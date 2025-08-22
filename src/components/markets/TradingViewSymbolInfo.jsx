import React, { useEffect, useRef, memo } from 'react';

const TradingViewSymbolInfo = memo(({ symbol = "NASDAQ:AAPL" }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "${symbol}",
        "width": "100%",
        "locale": "en",
        "colorTheme": "dark",
        "isTransparent": true
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
  }, [symbol]);

  return (
    <div className="tradingview-widget-container w-full h-full" ref={container}>
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
});

TradingViewSymbolInfo.displayName = 'TradingViewSymbolInfo';

export default TradingViewSymbolInfo;