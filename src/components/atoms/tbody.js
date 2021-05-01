import React from 'react';
import PropTypes from 'prop-types';

const Tbody = (props) => {
    return (
        <tbody>
            {props.children}
        </tbody>
    );
}
Tbody.propTypes = {
    children: PropTypes.node,
}

export default Tbody;