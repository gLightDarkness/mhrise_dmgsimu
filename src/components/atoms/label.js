import React from 'react';
import PropTypes from 'prop-types';

const Label = (props) => {
    return (
        <label className={props.className} htmlFor={props.for}>{props.children}</label>
    );
}
Label.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    for: PropTypes.string,
}

export default Label;