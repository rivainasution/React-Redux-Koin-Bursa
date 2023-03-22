import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Image, Modal, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Modals from '../modal/Modal';

export default function Navigation({
    page, 
    setPage, 
    currencySymbol,
    setCurrencySymbol,
    setRates,
    setSymbol
}){
    const [isShow, setIsShow] = useState(false);

    const menu = [
        {
            id: 0,
            value: "Market",
            link: '/' 
        },
        {
            id: 1,
            value: "Exchange",
            link: 'exchange'
        }
    ];

    const menuHandle = () => {
        return menu.map(item=>(
            <Link 
                to={item.link} 
                className={`t-3 t-pointer my-2 mx-3 ${page === item.value ? "bg-primary text-light p-2 " : ""}`}
                key={item.id}
                onClick={()=>setPage(item.value)}
            >
                {item.value}
            </Link>
        ))
    }


  return (
    <div className='
        d-flex 
        flex-column flex-lg-row flex-md-row flex-sm-column
        border
        shadow-sm
        py-2
    '>
        <Link to="/" className="
                col-lg-2
                col-md-3
                col-sm-12
                text-center
                d-flex flex-row 
                align-items-center justify-content-center
                t-pointer
            " onClick={()=>setPage('Market')}>
                <Image src={logo} 
                    width="45" 
                    alt="logo koin burs"
                    className="rounded-circle mx-1" 
                />
                <span className="mx-1 t-3 t-hover">
                    Koin Bursa
                </span>
            </Link>
            <div className="
                d-flex
                flex-column flex-lg-row flex-md-row flex-sm-row
                justify-content-around align-items-center
                col-lg-10
                col-md-9
                col-sm-12
            ">
                <Nav className='
                    col-lg-7
                    col-md-5
                    col-sm-5
                    d-flex flex-row 
                    align-items-center justify-content-start
                    '
                >
                    {menuHandle()}
                    
                </Nav>
                <Nav className='
                    col-lg-5
                    col-md-7
                    col-sm-7
                    d-flex flex-row 
                    align-items-center justify-content-end
                    '
                >
                    <div className='d-flex align-items-start justify-content-center t-4 t-hover mx-3'>
                        <FontAwesomeIcon icon={faSortDown} className='mx-2' onClick={()=>setIsShow(true)}/>
                        <span>{currencySymbol}</span>
                    </div>

                    <Modal
                        size="lg"
                        show={isShow}
                        onHide={() => setIsShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Pilih Currency
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Modals 
                                currencySymbol={currencySymbol}
                                setCurrencySymbol={setCurrencySymbol}
                                setRates={setRates}
                                setIsShow={setIsShow}
                                setSymbol={setSymbol}
                            />
                        </Modal.Body>
                    </Modal>
                </Nav>
            </div>
    </div>
  )
}
