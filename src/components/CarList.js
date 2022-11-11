import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';

import Container from '@mui/material/Container'

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

import DeleteIcon from '@mui/icons-material/Delete';
import ButtonCellRenderer from './ButtonCellRenderer';

import CarAdder from './CarAdder';
import CarEditor from './CarEditor';

const CarList = ( ) => {
    const [ cars, setCars ] = React.useState ( [ ] );
    const [ snackbar, setSnackbar ] = React.useState ( false );

    const fetchFn = ( ) => {
        fetch ( 'https://carstockrest.herokuapp.com/cars' )
            .then ( resp => resp.json ( ) )
            .then ( resp => setCars ( resp._embedded.cars ) )
            .catch ( err => console.error ( err ) );
    };

    const addCar = ( context ) => {
        fetch ( 'https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ( context )
        } )
        .then ( ( ) => fetchFn ( ) )
        .catch ( err => console.error ( err ) );
    };

    const editCar = ( context ) => {
        fetch ( context._links.self.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ( context )
        } )
        .then ( ( ) => fetchFn ( ) )
        .catch ( err => console.error ( err ) )
    };

    const deleteCar = ( href ) => {
        if ( window.confirm ( 'Are you sure you want to delete this car?' ) ) {
            fetch ( href, { method: 'DELETE' } )
                .then ( ( ) => fetchFn ( ) )
                .catch ( err => console.error ( err ) );
            
            setSnackbar ( true );
        }
    };

    React.useEffect ( ( ) => fetchFn ( ), [ ] );

    const handleSnackbarClose = ( ev, reason ) => {
        if ( reason === 'clickaway' ) {
            return;
        }

        setSnackbar ( false );
    };

    const gridRef = React.useRef ( );

    const columns = [
        {
            field: 'brand',
            sortable: true,
            filter: true,
            floatingFilter: true
        },

        {
            field: 'model',
            sortable: false, // Doesn't make sense to sort by model
            filter: true,
            floatingFilter: true
        },

        {
            field: 'color',
            sortable: true,
            filter: true,
            floatingFilter: true
        },

        {
            field: 'fuel',
            sortable: true,
            filter: true,
            floatingFilter: true
        },

        {
            field: 'year',
            sortable: true,
            filter: true,
            floatingFilter: true
        },

        {
            field: 'price',
            sortable: true,
            filter: true,
            floatingFilter: true
        },

        {
            field: '_links.car.href',
            headerName: '',

            valueGetter: params => params.data,
            cellRenderer: CarEditor,
            cellRendererParams: {
                editCar: ( carContext ) => {
                    console.log ( 'called, ctx: ', carContext )
                    editCar ( carContext );
                }
            }
        },

        {
            field: '_links.self.href',
            headerName: '',
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: {
                click: ( arg ) => {
                    deleteCar ( arg );
                },

                text: 'Delete',
                icon: <DeleteIcon />
            }
        }
    ];

    return  ( <Container maxWidth='xl'>
            <CarAdder addCar={ addCar }/>
            <div className="ag-theme-material" style={ {
                    height: '1080px', 
                    width: 'auto',
                    margin: 'auto',
                    } 
                } >
                <AgGridReact
                    ref={ gridRef }
                    onGridReady={ ctx => gridRef.current = ctx.api }

                    rowSelection='single'
                    columnDefs={ columns }
                    rowData={ cars }
                    suppressAggFuncInHeader={ true }
                    animateRows={ true }
                >
                </AgGridReact>
            </div>
            <Snackbar
                open={ snackbar }
                onClose={ handleSnackbarClose }
                autoHideDuration={ 6000 }
                message='Car deleted!'
            ></Snackbar>
    </Container> )
};

export default CarList;