import React from 'react';
import PropTypes from 'prop-types';

const RangeInput = (props) => {
    return (
        <input
            type="range"
            value={props.value}
            min={props.min}
            max={props.max}
            step={props.step}
            onChange={props.onChange}
        />
    );
}
RangeInput.propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
}

export default RangeInput;