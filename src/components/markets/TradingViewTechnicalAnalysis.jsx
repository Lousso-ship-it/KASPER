import React, { useEffect, useRef, memo } from 'react';

const TradingViewTechnicalAnalysis = memo(({ symbol = "NASDAQ:AAPL" }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "interval": "1m",
        "width": "100%",
        "isTransparent": true,
        "height": "100%",
        "symbol": "${symbol}",
        "showIntervalTabs": true,
        "locale": "en",
        "colorTheme": "dark"
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

TradingViewTechnicalAnalysis.displayName = 'TradingViewTechnicalAnalysis';

export default TradingViewTechnicalAnalysis;