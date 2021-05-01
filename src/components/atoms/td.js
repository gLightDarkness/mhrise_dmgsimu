import React from 'react';
import PropTypes from 'prop-types';

const Td = (props) => {
    return (
        <td>
            {props.children}
        </td>
    );
}
Td.propTypes = {
    children: PropTypes.node,
}

export default Td;