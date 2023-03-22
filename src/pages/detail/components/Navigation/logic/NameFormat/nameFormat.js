import { Link } from "react-router-dom";

export default function NameFormat(name, setPage, setMarketId){
    const url = name.toLowerCase();
    const nameHandle = () => {
        setPage('Detail Market');
        setMarketId(url);
    }
    return <Link to={`market/${url}`} className='t-pointer' onClick={()=>nameHandle()}>{name}</Link>
}