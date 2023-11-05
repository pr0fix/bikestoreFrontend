import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Productcontainer() {

    const [productList, setProductList] = useState([]);
    const REST_URL = 'http://localhost:8080'
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        listProducts();
    }, []);

    const listProducts = () => {
        axios.get(`${REST_URL}/api/products`)
            .then((response) => {
                setProductList(response.data._embedded.products);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
                setLoading(false);
            });
    }

    const columns = [
        { headerName: 'Product name', field: 'name' },
        { headerName: 'Price', field: 'price' },
        { headerName: 'Description', field: 'description' },
        { headerName: 'Color', field: 'color' },
        { headerName: 'Year of manufacturing', field: 'manifacturingYear' }
    ];

    const defaultColDef = useMemo(() => ({
        resizable: true,
        flex: 1,
        minWidth: 250
    }));

    const gridOptions = {
        domLayout: 'autoHeight'
    };

    return (
        <>
        <h1>Bikestore</h1>
        <div className='ag-theme-material' style={{height: '100%', width: '1500px' }}>
            <AgGridReact
                defaultColDef={defaultColDef}
                rowData={productList}
                columnDefs={columns}
                gridOptions={gridOptions}
                pagination={true}
                paginationPageSize={5}
            >

            </AgGridReact>

        </div>
        </>
    )
}