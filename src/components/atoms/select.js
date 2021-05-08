import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
    return (
        <select onChange={props.onChange} class="form-select">{props.children}</select>
    );
}
Select.propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
}

export default Select;