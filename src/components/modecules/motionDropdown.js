import React from 'react';
import PropTypes from 'prop-types';
import Select from '../atoms/select';
import Label from '../atoms/label';
import Option from '../atoms/option';
import Motion from '../../data/weapon_motion.json';

const MotionDropdown = (props) => {
    const baseItems = [{ "id": 0, "name": "選択してください", "value": 0 }];
    let items = baseItems.concat();
    const motions = Motion.filter((value) => {
        return (value.weapon_type == props.weaponType);
    });
    items = items.concat(motions);

    return (
        <div className="row mb-3">
            <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">ｱｸｼｮﾝ: </Label>
            <div className="col-sm-5 col-5">
                <Select onChange={(ev) => { props.handleChangeID(parseInt(ev.target.value)) }}>
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

MotionDropdown.propTypes = {
    weaponType: PropTypes.number,
    handleChangeID: PropTypes.func,
}

export default MotionDropdown;