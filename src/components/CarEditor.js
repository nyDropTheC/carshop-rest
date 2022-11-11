import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import EditIcon from '@mui/icons-material/Edit';

const CarEditor = ( props ) => {
    const editCar = props.editCar;

    const [ dialogOpen, setOpen ] = React.useState ( false );
    const [ carContext, setCarContext ] = React.useState ( {
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: '',

        _links: {
            self: {
                href: ''
            },

            car: {
                href: ''
            }
        } // nasty hack to get the link to the car into editCar, could be done better 100%
    } );

    const onOpen = ( ) => {
        setOpen ( true );
        setCarContext ( {
            ...props.value
        } );
    };

    const onClose = ( ) => {
        setCarContext ( {
            brand: '',
            model: '',
            color: '',
            fuel: '',
            year: '',
            price: '',
    
            _links: {
                self: {
                    href: ''
                },
    
                car: {
                    href: ''
                }
            }
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
            startIcon={ <EditIcon /> }
            size='small'
            variant='contained' 
            color='primary' 
            style={
                { textTransform: 'none' }
            }
            onClick={ onOpen }
        >
            Edit car
        </Button>

        <Dialog open={ dialogOpen } onClose={ onClose }>
            <DialogTitle id='car-add-title'>Car editor</DialogTitle>
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
                    editCar ( carContext );
                    onClose ( );
                } } color='primary'>
                    Apply edit
                </Button>
            </DialogActions>
        </Dialog>
    </div>
};

export default CarEditor;