import React from 'react';
import Button from '@mui/material/Button';

const ButtonCellRenderer = props => {
    const cellText = props.text;
    const cellClick = props.click;
    const cellIcon = props.icon;

    const onClick = ( ) => cellClick ( props.value );

    if ( !cellIcon ) {
        return <Button
                size = 'small'
                color = 'secondary'
                variant = 'contained' 
                onClick={ onClick } 
                style={
                    { textTransform: 'none' }
                }>
                { cellText }
            </Button>
    }

    return <Button 
                size = 'small'
                color = 'secondary'
                variant = 'contained' 
                onClick={ onClick } 
                startIcon={ cellIcon } 
                style={
                    { textTransform: 'none' }
                }>
                { cellText }
            </Button>
};

export default ButtonCellRenderer;