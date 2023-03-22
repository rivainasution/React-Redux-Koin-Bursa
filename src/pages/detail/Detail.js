import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { 
    Cards, 
    Navigation, 
    Price 
} from "./components";

export default function Detail({
    detailId, 
    currencySymbol, 
    rates, 
    symbol,
    setPage,
    setMarketId 
}){
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(`https://api.coincap.io/v2/assets/${detailId}`)
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [detailId]);

    return(
        <Container>
            <Price 
                data={data} 
                currencySymbol={currencySymbol} 
                rates={rates} 
                symbol={symbol}
            />
            <Cards 
                data={data}
                currencySymbol={currencySymbol} 
                rates={rates} 
                symbol={symbol}
            />
            <Navigation 
                detailId={detailId} 
                data={data} 
                currencySymbol={currencySymbol} 
                rates={rates} 
                symbol={symbol} 
                setPage={setPage}
                setMarketId={setMarketId}
            />
        </Container>
    );
}
