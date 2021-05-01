import React from 'react';
import PropTypes from 'prop-types';
import Label from '../atoms/label';
import Sharpness from '../../data/sharpness.json'
import Button from '../atoms/button';

const SharpnessButtons = (props) => {
    return (
        <div>
            <Label>斬れ味: </Label>
            {Sharpness.map((item) =>
                <Button
                    key={item.id}
                    disabled={(item.id == props.currentID)}
                    onClick={() => { props.handleChange(parseInt(item.id))}}>
                        {item.name}
                </Button>
            )}
        </div>
    );
}

SharpnessButtons.propTypes = {
    handleChange: PropTypes.func,
    currentID: PropTypes.number.isRequired,
}

export default SharpnessButtons;