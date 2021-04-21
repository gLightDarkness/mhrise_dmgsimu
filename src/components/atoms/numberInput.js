import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = (props) => {
    return (
        <input type="number" value={props.value} min={props.min} max={props.max} step={props.step} onChange={props.onChange}/>
    );
}
NumberInput.propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
}

export default NumberInput;