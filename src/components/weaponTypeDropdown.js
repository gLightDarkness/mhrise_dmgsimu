import React from 'react';
import PropTypes from 'prop-types';

const WeaponTypeDropDown = (props) => {
    const items = [
        { id: 0, label: "武器種選択" },
        { id: 1, label: "大剣" },
        { id: 2, label: "太刀" },
        { id: 3, label: "片手剣" },
        { id: 4, label: "双剣" },
    ];

    return (
        <div>
            <label>武器種: </label>
            <select onChange={(ev) => {props.handleChange(ev.target.value)}}>
                {items.map((item) =>
                    <option key={item.id} value={item.id}>{item.label}</option>
                )}
            </select>
        </div>
    );
}

WeaponTypeDropDown.propTypes = {
	handleChange: PropTypes.func
}

export default WeaponTypeDropDown;