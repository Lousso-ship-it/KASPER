import React, { useEffect, useRef, memo } from 'react';

const TradingViewChart = memo(({ symbol = "NASDAQ:AAPL", interval = "1D", theme = "dark", width = "100%", height = "100%" }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "${interval}",
        "timezone": "Etc/UTC",
        "theme": "${theme}",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "backgroundColor": "rgba(26, 26, 26, 1)",
        "gridColor": "rgba(58, 58, 58, 0.6)",
        "hide_top_toolbar": false,
        "hide_legend": false,
        "save_image": false,
        "hide_volume": false,
        "support_host": "https://www.tradingview.com"
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
  }, [symbol, interval, theme]);

  return (
    <div 
      className="tradingview-widget-container w-full h-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg overflow-hidden"
      ref={container}
      style={{ width, height }}
    >
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
});

TradingViewChart.displayName = 'TradingViewChart';

export default TradingViewChart;