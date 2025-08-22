import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MarketAssetCard from './MarketAssetCard';
import { Bitcoin, Waves } from 'lucide-react';

function EthereumIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l6 7-6 7-6-7 6-7z"/>
      <path d="M12 2v20"/>
      <path d="M6 9l6 7 6-7"/>
      <path d="M6 16l6-7 6 7"/>
    </svg>
  );
}

const cryptos = [
  { name: 'Bitcoin', price: '65,345.12 EUR', changePercent: 2.75, icon: Bitcoin },
  { name: 'Ethereum', price: '3,450.80 EUR', changePercent: 1.90, icon: EthereumIcon },
  { name: 'Solana', price: '145.20 EUR', changePercent: -1.10, icon: Waves },
];

export default function CryptoSection() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bitcoin className="w-6 h-6 text-yellow-500" />
          <span>Crypto-monnaies</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {cryptos.map(item => (
          <MarketAssetCard key={item.name} {...item} />
        ))}
      </CardContent>
    </Card>
  );
}