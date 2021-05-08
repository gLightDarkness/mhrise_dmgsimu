import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../atoms/select';
import Label from '../atoms/label';
import Option from '../atoms/option';
import Motion from '../../data/weapon_motion.json';

class MotionDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*
            param: {
                "value": 0,
                "element_rate": 0,
                "element_type": 0,
                "element_value": 0,
            },
            */
        }
        this.baseItems = [{ "id": 0, "name": "選択してください", "value": 0 }];
        this.items = this.baseItems.concat();
        this.handleChangeID = props.handleChangeID;
        //this.handleChangeParam = props.handleChangeParam;
    }

    setWeaponType(weaponType) {
        const motions = Motion.filter((value) => {
            return (value.weapon_type == weaponType);
        });
        this.items = this.baseItems.concat(motions);
    }

    onChangeMotion(id) {
        /*
        let motion = this.items.filter((item) => {
            return item["id"] == id;
        });
        if (motion.length == 0) {
            console.log("Error: motion not found. id -> %d", id);
            return;
        }

        motion = motion[0];
        let param = {
            value: motion.value,
            element_rate: motion.element_rate,
            element_type: motion.element_id,
            element_value: motion.element_value,
        };
        this.setState({ param: param });
        */
        this.handleChangeID(id);
    }

    render() {
        this.setWeaponType(this.props.weaponType);

        return (
            <div class="row mb-3">
                <Label class="col-xl-1 col-md-2 col-sm-3 col-form-label mb-1">アクション: </Label>
                <div class="col-sm-5">
                    <Select onChange={(ev) => { this.onChangeMotion(parseInt(ev.target.value)) }}>
                        {this.items.map((item) =>
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        )}
                    </Select>
                </div>
            </div>
        );
    }
}

MotionDropdown.propTypes = {
    weaponType: PropTypes.number,
    handleChangeID: PropTypes.func,
    //handleChangeParam: PropTypes.func,
}

export default MotionDropdown;