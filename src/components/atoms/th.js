import React from 'react';
import PropTypes from 'prop-types';

const Th = (props) => {
    return (
        <th scope={props.scope}>
            {props.children}
        </th>
    );
}
Th.propTypes = {
    children: PropTypes.node,
    scope: PropTypes.string,
}

export default Th;