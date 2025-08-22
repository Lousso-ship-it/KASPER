import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Maximize2, Save, Share2 } from "lucide-react";

const TradingViewAdvanced = ({ symbol = "AAPL", interval = "1D" }) => {
  const containerId = useRef(`tv_${Math.random().toString(36).substring(2)}`);
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return;
    chartContainerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        /* eslint-disable no-new */
        new window.TradingView.widget({
          symbol,
          interval,
          container_id: containerId.current,
          autosize: true,
          theme: "dark",
        });
      }
    };
    chartContainerRef.current.appendChild(script);
  }, [symbol, interval]);

  return (
    <div className="w-full h-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-[#3a3a3a] bg-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <Badge className="bg-[#ff6b35]/20 text-[#ff6b35] border-[#ff6b35]/30">
            {symbol}
          </Badge>
          <Badge variant="outline" className="text-[#a0a0a0] border-[#3a3a3a]">
            {interval}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-[#ff6b35]">
            <Save className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-[#ff6b35]">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-[#ff6b35]">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-[#ff6b35]">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chart Area */}
      <div ref={chartContainerRef} id={containerId.current} className="w-full h-[calc(100%-50px)]" />
    </div>
  );
};

export default TradingViewAdvanced;