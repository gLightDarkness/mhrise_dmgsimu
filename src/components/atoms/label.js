import React from 'react';
import PropTypes from 'prop-types';

const Label = (props) => {
    return (
        <label>{props.children}</label>
    );
}
Label.propTypes = {
    children: PropTypes.node,
}

export default Label;