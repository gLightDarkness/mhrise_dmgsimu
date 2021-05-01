import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <button
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
}

export default Button;