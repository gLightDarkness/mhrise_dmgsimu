import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => {
    return (
        <table className={props.className}>
            {props.children}
        </table>
    );
}
Table.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export default Table;