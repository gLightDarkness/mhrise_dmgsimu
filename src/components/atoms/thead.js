import React from 'react';
import PropTypes from 'prop-types';

const Thead = (props) => {
    return (
        <thead>
            {props.children}
        </thead>
    );
}
Thead.propTypes = {
    children: PropTypes.node,
}

export default Thead;