import React from 'react';
import PropTypes from 'prop-types';

const Label = (props) => {
    return (
        <label class={props.class}>{props.children}</label>
    );
}
Label.propTypes = {
    children: PropTypes.node,
    class: PropTypes.string,
}

export default Label;