import { 
    Breadcrumb, 
    OverlayTrigger, 
    Tooltip 
} from "react-bootstrap";
import { Link } from "react-router-dom";

// TODO: Start function
export default function isBreadCrumb (page, setPage) {
    if (page === 'Market'){
        return <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
    } 
    const isTooltip = (pages)=> {
        if (pages === 'Market'){
            return 'Back to Homepage';
        } 
    }

    return (
        <>  
            {/* TODO: Call Tooltips component */}
            <OverlayTrigger
                placement='bottom'
                overlay={
                    <Tooltip id='tooltip-bottom'>
                        {/* TODO: Call isTooltip function */}
                        {isTooltip('Market')}
                    </Tooltip>
                }
            > 
                <Link to='/' className='t-pointer' onClick={() => setPage('Market')}>Dashboard/</Link>
            </OverlayTrigger>
            <Breadcrumb.Item active>{page}</Breadcrumb.Item>
        </>
    );
}