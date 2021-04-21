import React from 'react';
import PropTypes from 'prop-types';

const Option = (props) => {
    return (
        <option value={props.value}>{props.children}</option>
    );
}
Option.propTypes = {
    value: PropTypes.number.isRequired,
    children: PropTypes.node,
}

export default Option;