import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = (props) => {
    return (
        <input
            type="checkbox"
            value={props.value}
            checked={props.checked}
            onChange={props.onChange}
            class={props.class}
            id={props.id}
        />
    );
}
CheckboxInput.propTypes = {
    value: PropTypes.number,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    class: PropTypes.string,
    id: PropTypes.id,
}

export default CheckboxInput;