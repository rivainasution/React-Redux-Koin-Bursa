import React, { 
    useEffect, 
    useState 
} from 'react';
import { 
    Container 
} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { 
    useSelector, 
    useDispatch 
} from 'react-redux';
import { 
    assetSelector, getAssets 
} from '../../features/assets/assetSlice';
import { 
    MaxSupplyFormat,
    NameFormat, 
    NumberBehindComma, 
    PriceFormat, 
    RatesFormat, 
    SupplyFormat
} from '../../logic';

const ShowMarket = ({
    currencySymbol, 
    rates, 
    symbol,
    setPage,
    setDetailId
}) => {

    const [filter, setFilter] = useState([]);
    const dispatch = useDispatch();
    const assets = useSelector(assetSelector.selectAll);

    useEffect(()=>{
        dispatch(getAssets());
    }, [dispatch]);

    function handleFilter(event){
        const newData = assets.filter(asset=>{
            const { name, symbol} = asset;

            return (
                name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                symbol.toLowerCase().includes(event.target.value.toLowerCase()) 
            );
        })
        setFilter(newData);
    }

    const columns = [
        {
            name: 'No',
            selector: row => row.rank,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => NameFormat(row.name, row.id, setPage, setDetailId),
            sortable: true,
        },
        {
            name: 'Symbol',
            selector: row => NameFormat(row.symbol, row.id),
            sortable: true,
        },
        {
            name: 'Price Usd',
            selector: row => RatesFormat(NumberBehindComma(row.priceUsd,3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Change Percent 24 Hr',
            selector: row => PriceFormat(NumberBehindComma(row.changePercent24Hr,2)),
            sortable: true,
        },
        {
            name: 'Market Cap Usd',
            selector: row => RatesFormat(NumberBehindComma(row.marketCapUsd, 3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Volume Usd 24 Hr',
            selector: row => RatesFormat(NumberBehindComma(row.volumeUsd24Hr, 3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Price Average 24 Hr',
            selector: row => RatesFormat(NumberBehindComma(row.vwap24Hr, 3), symbol, rates, currencySymbol),
            sortable: true,
        },
        {
            name: 'Supply',
            selector: row => SupplyFormat(row.supply, row.maxSupply),
            sortable: true,
        },
        {
            name: 'Max Supply',
            selector: row => MaxSupplyFormat(NumberBehindComma(row.maxSupply)),
            sortable: true,
        },
    ];

    return (
        <Container>
            <div  className='d-flex justify-content-between my-2'>
                <span className='fw-bold'>Top 100 Coin List</span>
                <input type='text' onChange={handleFilter}/>
            </div>
            <DataTable
                columns={columns}
                data={filter.length === 0 ? assets : filter}
                pagination
                paginationPerPage={100}
                paginationRowsPerPageOptions={[100]}
                paginationComponentOptions={{ rowsPerPageText: 'Data per halaman:' }}
                fixedHeader
                fixedHeaderScrollHeight='420px'
            />

        </Container>
    )
}

export default ShowMarket