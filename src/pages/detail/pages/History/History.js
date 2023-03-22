//TODO: Import Libraries or directories
import DataTable from 'react-data-table-component';
import { 
    Container, 
} from "react-bootstrap";

//TODO:Start function
export default function History({
    detailId, 
    columns, 
    records
}){

    return (
        //TODO: Show Table History 
        <Container>
            <h4 className="mx-2">Price History {detailId}</h4>
            <DataTable
                columns={columns}
                data={records}
                fixedHeader
                fixedHeaderScrollHeight='420px'
                pagination
            />
        </Container>
    );
}