import React, { useState, useEffect } from 'react';
import axios from "axios";
import { DetailMarket} from './Pages';
import { 
    NumberBehindComma, 
    PriceFormat, 
    RatesFormat 
} from '../../logic';

export default function CoinMarket({
    currencySymbol, 
    rates, 
    symbol, 
    marketId
}){
    const [market, setMarket] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get(`https://api.coincap.io/v2/markets?exchangeId=${marketId}&limit=2000`)
            .then((response) => {
                const dataWithNo = response.data.data.map((item, index) => ({ ...item, no: index + 1 }));
                setMarket(dataWithNo);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [filter, marketId]);

    const columns = [
        {
            name: 'No',
            selector: row => row.no,
            sortable: true,
        },
        {
            name: 'Exchange',
            selector: row => row.exchangeId,
            sortable: true,
        },
        {
            name: 'Pairs',
            selector: row => `${row.baseSymbol} / ${row.quoteSymbol}`,
            sortable: true,
        },
        {
            name: 'Price Usd',
            selector: row => RatesFormat(NumberBehindComma(row.priceUsd,3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Percent Exhange Volume',
            selector: row => PriceFormat(NumberBehindComma(row.percentExchangeVolume,2)),
            sortable: true,
        },
        {
            name: 'Volume Usd 24 Hr',
            selector: row => RatesFormat(NumberBehindComma(row.volumeUsd24Hr, 3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Trade 24 Hr',
            selector: row => RatesFormat(NumberBehindComma(row.tradesCount24Hr, 3), symbol, rates, currencySymbol),
            sortable: true,
        }
    ];
    
    return (
        <DetailMarket
            columns={columns}
            market={market}
            filter={filter}
            setFilter={setFilter}
            marketId={marketId}
        />
    );
}
