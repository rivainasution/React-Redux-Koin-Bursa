import { Link } from "react-router-dom";

export default function NameFormat(name, id, url, setExchangeId, setPage, setUrl){
    function nameHandle(){
        setExchangeId(id);
        setPage('Market Exchange');
        setUrl(url);
    }
    return <Link to={`market/${id}`} className='t-pointer' onClick={()=>nameHandle()}>{name}</Link>
}