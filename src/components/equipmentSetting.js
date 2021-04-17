import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WeaponTypeDropDown from './weaponTypeDropdown';

class EquipmentSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weaponType: 0
        }
        this.equipmentParams = props.equipmentParams;
        this.handleUpdate = props.handleUpdate;
    }

    onChangeWeaponType(type) {
        this.setState({
            weaponType: type
        });
        this.equipmentParams.weaponType = type;
        this.handleUpdate(this.equipmentParams);
    }

    render() {
        return (
            <div>
                <h4>
                    ○装備設定
                </h4>
                <WeaponTypeDropDown handleChange={(type) => this.onChangeWeaponType(type)} />
            </div>
        );
    }
}

EquipmentSetting.propTypes = {
    equipmentParams: PropTypes.object,
    handleUpdate: PropTypes.func
}

export default EquipmentSetting;