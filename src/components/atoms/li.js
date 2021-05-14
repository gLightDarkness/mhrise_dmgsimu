import React from 'react';
import PropTypes from 'prop-types';

const Li = (props) => {
    return (
        <li className={props.className}>
            {props.children}
        </li>
    );
}
Li.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export default Li;