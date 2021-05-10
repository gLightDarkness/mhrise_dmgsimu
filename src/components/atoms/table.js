import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => {
    return (
        <table class={props.class}>
            {props.children}
        </table>
    );
}
Table.propTypes = {
    children: PropTypes.node,
    class: PropTypes.string,
}

export default Table;