import React from 'react';
import PropTypes from 'prop-types';
import WeaponType from "../../data/weapon_type.json"
import Select from '../atoms/select';
import Label from '../atoms/label';
import Option from '../atoms/option';

const WeaponTypeDropDown = (props) => {
    const baseItems = [{ "id": 0, "name": "選択してください" }];
    const items = baseItems.concat(WeaponType);

    return (
        <div>
            <Label>武器種: </Label>
            <Select onChange={(ev) => { props.handleChange(parseInt(ev.target.value)) }}>
                {items.map((item) =>
                    <Option key={item.id} value={item.id}>
                        {item.name}
                    </Option>
                )}
            </Select>
        </div>
    );
}

WeaponTypeDropDown.propTypes = {
    handleChange: PropTypes.func
}

export default WeaponTypeDropDown;