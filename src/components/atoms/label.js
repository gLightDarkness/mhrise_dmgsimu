import React from 'react';
import PropTypes from 'prop-types';

const Label = (props) => {
    return (
        <label class={props.class} for={props.for}>{props.children}</label>
    );
}
Label.propTypes = {
    children: PropTypes.node,
    class: PropTypes.string,
    for: PropTypes.string,
}

export default Label;