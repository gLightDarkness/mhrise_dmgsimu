import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = (props) => {
    return (
        <input
            type="number"
            value={parseInt(props.value)}
            min={props.min}
            max={props.max}
            step={props.step}
            onChange={props.onChange}
            className="form-control"
        />
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