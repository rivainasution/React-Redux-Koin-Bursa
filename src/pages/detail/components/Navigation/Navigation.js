//TODO: Import libraries or dicrectories
import axios from "axios";
import { useEffect, useState } from "react";
import { DateFormat, NumberBehindComma, PairsFormat, PriceFormat, RatesFormat, TimeFormat } from "../../../../logic";
import { History, Market, Overview } from "../../pages";
import { Headers } from "./components";
import { NameFormat } from "./logic";

//TODO: Start function
export default function SubNavbar ({
    detailId, 
    data, 
    currencySymbol, 
    rates, 
    symbol,
    setPage,
    setMarketId
}){
    const [menu, setMenu] = useState('Overview');
    const [history, setHistory] = useState([]);
    const [market, setMarket] = useState([]);
    const [interval, setInterval] = useState('m1');
    const [filter, setFilter] = useState([]);

    //TODO: FETCH API
    useEffect(() => {
        axios.get(`https://api.coincap.io/v2/assets/${detailId}/history?interval=${interval}`)
          .then((response) => {
            const dataWithNo = response.data.data.map((item, index) => ({ ...item, no: index + 1 }));
            setHistory(dataWithNo);
          })
          .catch((error) => {
            console.log(error);
          });
    }, [detailId, interval]);


    useEffect(() => {
        axios.get(`https://api.coincap.io/v2/assets/${detailId}/markets?limit=2000`)
          .then((response) => {
            const dataWithNo = response.data.data.map((item, index) => ({ ...item, no: index + 1 }));
            setMarket(dataWithNo);
          })
          .catch((error) => {
            console.log(error);
          });
    }, [detailId, filter]);

    const columns = [
        {
            name: 'No',
            selector: row => row.no,
            sortable: true,
        },
        {
            name: 'Exchange',
            selector: row => NameFormat(row.exchangeId, setPage, setMarketId),
            sortable: true,
        },
        {
            name: 'Pairs',
            selector: row => PairsFormat(row.baseSymbol, row.quoteSymbol),
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => RatesFormat(NumberBehindComma(row.priceUsd,3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Volume 24Hr',
            selector: row => RatesFormat(NumberBehindComma(row.volumeUsd24Hr,2), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Volume %',
            selector: row => PriceFormat(NumberBehindComma(row.volumePercent, 2)),
            sortable: true,
        }
    ];

    const columnHistory = [
        {
            name: 'No',
            selector: row => row.no,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => RatesFormat(NumberBehindComma(row.priceUsd,3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Time',
            selector: row => TimeFormat(row.time),
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => DateFormat(row.date),
            sortable: true,
        }
    ];

    //TODO: Content selection
    const content = () => {
        if (menu === "Overview"){
            return (
                <Overview 
                    detailId={detailId} 
                    history={history} 
                    data={data}
                    setInterval={setInterval}
                    interval={interval}
                />
            );
        } else if (menu === 'Market'){
            return (
                <Market 
                    detailId={detailId}  
                    columns={columns} 
                    market={market}
                    filter={filter}
                    setFilter={setFilter}
                />
            );
        } else if (menu === 'History'){
            return (
                <History 
                    detailId={detailId}  
                    columns={columnHistory} 
                    records={history} 
                />
            );
        } 
    }

    return (
        //ToDO: Show detail navbar
        <div className="my-3 row">
            <h1>{menu}</h1>
            <Headers 
                navbar={menu}
                setNavbar={setMenu} 
            />
            {content()}
        </div>
    );
}
