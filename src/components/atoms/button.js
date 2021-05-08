import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <button
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
            class={props.class}
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
    class: PropTypes.string,
}

export default Button;