import React from 'react';
import PropTypes from 'prop-types';

const Tr = (props) => {
    return (
        <tr>
            {props.children}
        </tr>
    );
}
Tr.propTypes = {
    children: PropTypes.node,
}

export default Tr;