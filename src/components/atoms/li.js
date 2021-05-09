import React from 'react';
import PropTypes from 'prop-types';

const Li = (props) => {
    return (
        <li class={props.class}>
            {props.children}
        </li>
    );
}
Li.propTypes = {
    children: PropTypes.node,
    class: PropTypes.string,
}

export default Li;