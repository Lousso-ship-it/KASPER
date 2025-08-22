import React, { useEffect, useRef, memo } from 'react';

const TradingViewMiniChart = memo(({ symbol = "NASDAQ:AAPL", width = "100%", height = "120" }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "${symbol}",
        "width": "${width}",
        "height": "${height}",
        "locale": "en",
        "dateRange": "12M",
        "colorTheme": "dark",
        "isTransparent": true,
        "autosize": false,
        "largeChartUrl": ""
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
  }, [symbol, width, height]);

  return (
    <div className="tradingview-widget-container w-full" ref={container} style={{ height }}>
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
});

TradingViewMiniChart.displayName = 'TradingViewMiniChart';

export default TradingViewMiniChart;