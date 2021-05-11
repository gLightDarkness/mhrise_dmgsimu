import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = (props) => {
    return (
        <input
            type="checkbox"
            value={props.value}
            checked={props.checked}
            onChange={props.onChange}
        />
    );
}
CheckboxInput.propTypes = {
    value: PropTypes.number,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
}

export default CheckboxInput;