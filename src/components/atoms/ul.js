import React from 'react';
import PropTypes from 'prop-types';

const Ul = (props) => {
    return (
        <ul type={props.type} class={props.class}>
            {props.children}
        </ul>
    );
}
Ul.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    class: PropTypes.string,
}

export default Ul;