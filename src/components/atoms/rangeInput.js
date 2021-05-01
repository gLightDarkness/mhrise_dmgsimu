import React from 'react';
import PropTypes from 'prop-types';

const RangeInput = (props) => {
    return (
        <div>
            <input
                type="range"
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={props.onChange}
            />
        </div>
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