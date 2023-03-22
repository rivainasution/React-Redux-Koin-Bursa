//TODO: Import libraries or directories
import DataTable from 'react-data-table-component';
import { 
    Container, 
} from "react-bootstrap";

//TODO: Start function
export default function Market({
    detailId, 
    columns, 
    market, 
    filter, 
    setFilter
}){

    function handleFilter(event){
        const newData = market.filter(item=>{
            const { exchangeId, quoteSymbol} = item;

            return (
                exchangeId.toLowerCase().includes(event.target.value.toLowerCase()) ||
                quoteSymbol.toLowerCase().includes(event.target.value.toLowerCase()) 
            );
        })
        setFilter(newData);
    }
    return (
        //TODO: Show table market
        <Container>
            <h4 className="mt-3">Market {detailId}</h4>
            <div  className='d-flex justify-content-between my-2'>
                <span className='fw-bold'>Anda bisa jual - beli coin {detailId} favoritmu di market berikut</span>
                <input type='text' onChange={handleFilter}/>
            </div>
            <DataTable
                columns={columns}
                data={filter.length === 0? market: filter}
                fixedHeader
                fixedHeaderScrollHeight='420px'
                pagination
            />
        </Container>
    );
}