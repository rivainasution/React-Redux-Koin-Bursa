import axios from "axios";
import { 
    useEffect, 
    useState 
} from "react";
import { 
    Col, 
    Container, 
    Row 
} from "react-bootstrap";
import { 
    useDispatch,
    useSelector 
} from "react-redux";
import { 
    getRates,
    rateSelector 
} from "../../features/rates/rateSlice";

export default function Modals({
  currencySymbol,
  setCurrencySymbol,
  setRates,
  setIsShow,
  setSymbol,
}) {
    const [searchSymbol, setSearchSymbol] = useState("");
    const dispatch = useDispatch();
    const dataRates = useSelector(rateSelector.selectAll);

    useEffect(()=>{
        dispatch(getRates());
    }, [dispatch]);


    const converToUppercase = (str) => {
        let words = str.split(" ");
        for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(" ");
    };

    const rateHandle = (currencySymbol, rate, symbol) => {
        setCurrencySymbol(currencySymbol);
        setRates(rate === 1 ? dataRates .find((item) => item.symbol === "USD").rateUsd : rate);
        setSymbol(symbol);
        setIsShow(false);
    };

    const getFormattedSymbol = (symbol, currencySymbol) => {
        return symbol ? `${symbol} - ${currencySymbol}` : currencySymbol;
    };

  return (
    <Container>
      <Row>
        <Col md={12} className="m p-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by symbol"
            value={searchSymbol}
            onChange={(event) => setSearchSymbol(event.target.value)}
          />
        </Col>
      </Row>
      <Row>
        {dataRates
          .filter(
            (rate) =>
              rate.symbol.toLowerCase().includes(searchSymbol.toLowerCase()) ||
              rate.id.toLowerCase().includes(searchSymbol.toLowerCase())
          )
          .map((rate) => (
            <Col
              md={4}
              className={`${
                currencySymbol === rate.symbol ? "bg-warning border" : ""
              } m p-2 rounded`}
              key={rate.id}
              onClick={() =>
                rateHandle(rate.symbol, rate.rateUsd, rate.currencySymbol)
              }
            >
              <div className="d-flex flex-column">
                <span className="fw-bold">{converToUppercase(rate.id)}</span>
                <span>{getFormattedSymbol(rate.symbol, rate.currencySymbol)}</span>
                <span>{converToUppercase(rate.type)}</span>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
