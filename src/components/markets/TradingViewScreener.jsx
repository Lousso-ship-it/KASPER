import React, { useEffect, useRef, memo } from 'react';

const TradingViewScreener = memo(({ market = "america" }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "100%",
        "defaultColumn": "overview",
        "defaultScreen": "general",
        "market": "${market}",
        "showToolbar": true,
        "colorTheme": "dark",
        "locale": "en",
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
  }, [market]);

  return (
    <div className="tradingview-widget-container w-full h-full" ref={container}>
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
});

TradingViewScreener.displayName = 'TradingViewScreener';

export default TradingViewScreener;