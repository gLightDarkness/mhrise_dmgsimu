import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
    return (
        <select onChange={props.onChange} className="form-select" value={props.currentValue}>{props.children}</select>
    );
}
Select.propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    currentValue: PropTypes.string
}

export default Select;