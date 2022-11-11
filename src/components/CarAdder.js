import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const CarAdder = ( props ) => {
    const addCar = props.addCar;

    const [ dialogOpen, setOpen ] = React.useState ( false );
    const [ carContext, setCarContext ] = React.useState ( {
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    } );

    const onOpen = ( ) => {
        setOpen ( true );
    };

    const onClose = ( ) => {
        setCarContext ( {
            brand: '',
            model: '',
            color: '',
            fuel: '',
            year: '',
            price: ''
        } ); // I think this is correct behavior, after all, how often do you need to add a car with the exact same parameters twice?
        setOpen ( false );
    };

    const onInput = ( ev ) => {
        setCarContext ( {
            ...carContext,
            [ ev.target.name ]: ev.target.value
        } );
    };

    return <div>
        <Button 
            variant='contained' 
            color='primary' 
            onClick={ onOpen }
            style={
                { margin: 10 }
            }
        >
            Add car
        </Button>

        <Dialog open={ dialogOpen } onClose={ onClose }>
            <DialogTitle id='car-add-title'>Car addition</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    name="brand"
                    label='Brand'

                    value={ carContext.brand }
                    onChange={ ev => onInput ( ev ) }
                />    
                
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    name="model"
                    label='Model'

                    value={ carContext.model }
                    onChange={ ev => onInput ( ev ) }
                />    

                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    name="color"
                    label='Color'

                    value={ carContext.color }
                    onChange={ ev => onInput ( ev ) }
                />

                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    name="fuel"
                    label='Fuel'

                    value={ carContext.fuel }
                    onChange={ ev => onInput ( ev ) }
                />

                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    name="year"
                    label='Year'

                    value={ carContext.year }
                    onChange={ ev => onInput ( ev ) }
                />

                <TextField        
                    autoFocus
                    fullWidth
                    margin="dense"
                    name="price"
                    label='Price'

                    value={ carContext.price }
                    onChange={ ev => onInput ( ev ) }
                />    
                
            </DialogContent>
            <DialogActions>
                <Button onClick={ onClose } color='primary'>
                    Cancel
                </Button>

                <Button onClick={ ( ) => {
                    addCar ( carContext );
                    onClose ( );
                } } color='primary'>
                    Add car
                </Button>
            </DialogActions>
        </Dialog>
    </div>
};

export default CarAdder;