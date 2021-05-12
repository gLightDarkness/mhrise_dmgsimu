import React from 'react';
import PropTypes from 'prop-types';

const Ul = (props) => {
    return (
        <ul type={props.type} class={props.className}>
            {props.children}
        </ul>
    );
}
Ul.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    className: PropTypes.string,
}

export default Ul;