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
        <div class="row mb-3">
            <Label class="col-xxl-1 col-md-2 col-sm-3 col-form-label">武器種: </Label>
            <div class="col-sm-5">
                <Select onChange={(ev) => { props.handleChange(parseInt(ev.target.value)) }}>
                    {items.map((item) =>
                        <Option key={item.id} value={item.id}>
                            {item.name}
                        </Option>
                    )}
                </Select>
            </div>
        </div>
    );
}

WeaponTypeDropDown.propTypes = {
    handleChange: PropTypes.func
}

export default WeaponTypeDropDown;