import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { List, Plus, X, TrendingUp, TrendingDown } from "lucide-react";

const initialStocks = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: 170.12, change: -0.8, changePercent: -0.47 },
  { ticker: 'MSFT', name: 'Microsoft Corp.', price: 420.72, change: 1.5, changePercent: 0.36 },
  { ticker: 'LVMH', name: 'LVMH Moët Hennessy', price: 750.40, change: 5.2, changePercent: 0.70 },
  { ticker: 'TSLA', name: 'Tesla, Inc.', price: 180.01, change: -2.1, changePercent: -1.15 },
];

const StockRow = ({ stock, onRemove }) => {
  const isPositive = stock.change >= 0;
  return (
    <TableRow>
      <TableCell className="font-bold">{stock.ticker}</TableCell>
      <TableCell>{stock.name}</TableCell>
      <TableCell className="text-right">{stock.price.toFixed(2)}€</TableCell>
      <TableCell className={`text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {stock.change.toFixed(2)}€
      </TableCell>
      <TableCell className={`text-right font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <div className="flex items-center justify-end gap-1">
          {isPositive ? <TrendingUp className="w-4 h-4"/> : <TrendingDown className="w-4 h-4"/>}
          {stock.changePercent.toFixed(2)}%
        </div>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="icon" onClick={() => onRemove(stock.ticker)}>
          <X className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default function Watchlist() {
  const [stocks, setStocks] = useState(initialStocks);
  const [newTicker, setNewTicker] = useState('');

  const handleAddStock = () => {
    if (newTicker && !stocks.some(s => s.ticker.toUpperCase() === newTicker.toUpperCase())) {
      // Simuler l'ajout d'une nouvelle action avec des données aléatoires
      const newStock = {
        ticker: newTicker.toUpperCase(),
        name: `${newTicker.toUpperCase()} Company`,
        price: Math.random() * 1000,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 5,
      };
      setStocks([...stocks, newStock]);
      setNewTicker('');
    }
  };

  const handleRemoveStock = (ticker) => {
    setStocks(stocks.filter(stock => stock.ticker !== ticker));
  };

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="w-6 h-6 text-blue-600" />
          <span>Ma Watchlist</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead className="text-right">Prix</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">% Change</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map(stock => (
              <StockRow key={stock.ticker} stock={stock} onRemove={handleRemoveStock} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center gap-2">
          <Input 
            placeholder="Ajouter un ticker (ex: GOOGL)"
            value={newTicker}
            onChange={(e) => setNewTicker(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStock()}
          />
          <Button onClick={handleAddStock}>
            <Plus className="w-4 h-4 mr-2"/>
            Ajouter
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}