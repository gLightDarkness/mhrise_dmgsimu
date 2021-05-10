import React from 'react';
import PropTypes from 'prop-types';
import Label from '../atoms/label';
import Sharpness from '../../data/sharpness.json'
import Button from '../atoms/button';

const SharpnessButtons = (props) => {
    return (
        <div>
            <Label>斬れ味: </Label>
            {Sharpness.map((item) => {
                let btnCss = item.id == 1 ? "btn sharpness-red" :
                item.id == 2 ? "btn sharpness-orange" :
                item.id == 3 ? "btn sharpness-yellow" :
                item.id == 4 ? "btn sharpness-green" :
                item.id == 5 ? "btn sharpness-blue" :
                item.id == 6 ? "btn sharpness-white" : "";
                return (
                    <Button
                        key={item.id}
                        onClick={() => { props.handleChange(parseInt(item.id))}}
                        class={(item.id == props.currentID) ? btnCss  + " sharpness-selected" : btnCss }>
                            {item.name}
                    </Button>
                )
            })}
        </div>
    );
}

SharpnessButtons.propTypes = {
    handleChange: PropTypes.func,
    currentID: PropTypes.number.isRequired
}

export default SharpnessButtons;