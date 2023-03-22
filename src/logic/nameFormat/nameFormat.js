import { Link } from "react-router-dom";

export default function NameFormat(name, id, setPage, setName){
    const nameHandle = () => {
        setPage('Detail');
        setName(id);
    }
    return <Link to={`detail/${id}`} className='t-pointer' onClick={()=>nameHandle()}>{name}</Link>
}