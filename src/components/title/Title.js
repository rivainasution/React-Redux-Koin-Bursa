import { 
    Breadcrumb,
    Container 
} from "react-bootstrap";
import { isBreadCrumb } from "../../logic";

export default function Title({page, name, setPage}){
    return (
        <Container>
            <div className="d-flex justify-content-between  align-items-center">
                {page === 'Market'? <h2 className="fw-bold">{page}</h2>: <h2 className="fw-bold">{page} {name}</h2>}
                <Breadcrumb>
                    {isBreadCrumb(page, setPage)}
                </Breadcrumb>
            </div>
            <h5 className="text-secondary">Tracking harga coin favoritmu dalam satu aplikasi</h5>
        </Container>
    );
}