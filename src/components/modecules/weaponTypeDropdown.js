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
        <div className="row mb-3">
            <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label">
                武器種: 
            </Label>
            <div className="col-sm-5 col-5">
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