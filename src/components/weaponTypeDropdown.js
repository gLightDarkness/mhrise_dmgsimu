import React from 'react';
import PropTypes from 'prop-types';
import WeaponType from "../data/weapon_type.json"

const WeaponTypeDropDown = (props) => {
    const items = WeaponType;

    return (
        <div>
            <label>武器種: </label>
            <select onChange={(ev) => {props.handleChange(ev.target.value)}}>
                {items.map((item) =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )}
            </select>
        </div>
    );
}

WeaponTypeDropDown.propTypes = {
	handleChange: PropTypes.func
}

export default WeaponTypeDropDown;