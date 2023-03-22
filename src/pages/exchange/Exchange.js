import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { DetailMarket} from './Pages';
import { NumberBehindComma, PriceFormat, RatesFormat } from '../../logic';
import { useDispatch, useSelector } from 'react-redux';
import { exchangeSelector, getExchanges } from '../../features/exchange/exchangeSlice';
import { NameFormat } from './logic';

export default function Exchange({
    currencySymbol, 
    rates, 
    symbol,
    setPage,
    page,
    setExchangeId,
    setUrl
}){
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();

    const exchange = useSelector(exchangeSelector.selectAll);

    useEffect(()=>{
        dispatch(getExchanges());
    }, [dispatch]);

    const columns = [
        {
            name: 'No',
            selector: row => row.rank,
            sortable: true,
        },
        {
            name: 'Exchange',
            selector: row => NameFormat(row.name, row.exchangeId, row.exchangeUrl, setExchangeId, setPage, setUrl),
            sortable: true,
        },
        {
            name: 'Percent Total Volume',
            selector: row => PriceFormat(NumberBehindComma(row.percentTotalVolume,3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Volume Usd',
            selector: row => RatesFormat(NumberBehindComma(row.volumeUsd,3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Trading Pairs',
            selector: row => row.tradingPairs,
            sortable: true,
        },
        {
            name: 'Updated',
            selector: row => row.updated,
            sortable: true,
        }
    ];

    return (
        <Container className='my-3 bg-white p-3 border'>
            <DetailMarket
                columns={columns}
                exchange={exchange}
                filter={filter}
                setFilter={setFilter}
            />
        </Container>
    );
}
