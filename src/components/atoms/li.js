import React from 'react';
import PropTypes from 'prop-types';

const Li = (props) => {
    return (
        <li>
            {props.children}
        </li>
    );
}
Li.propTypes = {
    children: PropTypes.node,
}

export default Li;