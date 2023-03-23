import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation, Title } from './components';
import { CoinExchange, CoinMarket, Detail, Exchange, Markets } from './pages';

function App() {
  const [page, setPage] = useState('Market');
  const [detailId, setDetailId] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [rates, setRates] = useState(1);
  const [marketId, setMarketId] = useState();
  const [exchangeId, setExchangeId] = useState();
  const [url, setUrl] = useState('');

  return (
    <BrowserRouter>
      <Navigation 
        page={page}
        setPage={setPage}
        currencySymbol={currencySymbol}
        setCurrencySymbol={setCurrencySymbol}
        setRates={setRates}
        setSymbol={setSymbol}
      />
      <Container>
        <div className='my-5 p-3 shadow bg-white'>
          <Title 
            page={page} 
            detailId={detailId}
            setPage={setPage}
          />
          <Routes>
          <Route 
            path='/' 
            element={<Markets 
              currencySymbol={currencySymbol} 
              rates={rates} 
              symbol={symbol} 
              setPage={setPage} 
              setDetailId={setDetailId}
            />} 
          />
          <Route 
            path={`detail/${detailId}`} 
            element={<Detail 
              detailId={detailId}
              currencySymbol={currencySymbol}
              rates={rates} 
              symbol={symbol}
              setPage={setPage}
              setMarketId={setMarketId}
            />} 
          />
          <Route 
            path={`detail/${detailId}/market/${marketId}`} 
            element={<CoinMarket 
              currencySymbol={currencySymbol}
              rates={rates} 
              symbol={symbol}
              marketId={marketId}
            />} 
          />
          <Route 
            path='exchange' 
            element={<Exchange 
              currencySymbol={currencySymbol}
              rates={rates} 
              symbol={symbol}
              setPage={setPage}
              page={page}
              setExchangeId={setExchangeId}
              setUrl={setUrl}
            />} 
          />
          <Route 
            path={`exchange/market/${exchangeId}`} 
            element={<CoinExchange 
              currencySymbol={currencySymbol} 
              rates={rates} 
              symbol={symbol}
              exchangeId={exchangeId}
              url={url}
          />} 
          />
        </Routes>
        </div>
      </Container>
    </BrowserRouter>
  );
}

export default App;
