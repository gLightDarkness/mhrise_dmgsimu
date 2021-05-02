import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WeaponTypeDropDown from '../modecules/weaponTypeDropdown';
import NumberInput from '../atoms/numberInput';
import Label from '../atoms/label';
import ElementTypeDropdown from '../modecules/elementTypeDropdown';

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

    onChangeWeaponOffenseValue(value) {
        if(value) {
            value = parseInt(value);
        } else {
            return;
        }
        this.equipmentParams.weaponOffenseValue = value;
        this.handleUpdate(this.equipmentParams);
    }

    onChangeWeaponCriticalRate(value) {
        if(value) {
            value = parseInt(value);
        } else {
            return;
        }
        this.equipmentParams.weaponCriticalRate = value;
        this.handleUpdate(this.equipmentParams);
    }

    onChangeElementType1(type) {
        this.equipmentParams.weaponElement1 = type;
        this.handleUpdate(this.equipmentParams);
    }

    onChangeElementValue1(value) {
        this.equipmentParams.weaponCriticalRate = value;
        this.handleUpdate(this.equipmentParams);
    }

    render() {
        return (
            <div>
                <h4>
                    ○装備設定
                </h4>

                <WeaponTypeDropDown handleChange={(type) => this.onChangeWeaponType(type)} />

                <div>
                    <Label>攻撃力: </Label>
                    <NumberInput value={this.equipmentParams.weaponOffenseValue} min={0} onChange={(ev) => { this.onChangeWeaponOffenseValue(ev.target.value) }} />
                </div>

                <div>
                    <Label>会心率: </Label>
                    <NumberInput value={this.equipmentParams.weaponCriticalRate} min={-100} max={100} onChange={(ev) => { this.onChangeWeaponCriticalRate(ev.target.value) }} />
                </div>

                <ElementTypeDropdown handleChange={(type) => this.onChangeElementType1(type)} />

                <div>
                    <Label>属性値: </Label>
                    <NumberInput value={this.equipmentParams.weaponElementValue1} min={0} onChange={(ev) => { this.onChangeElementValue1(ev.target.value) }} />
                </div>
            </div>
        );
    }
}

EquipmentSetting.propTypes = {
    equipmentParams: PropTypes.object,
    handleUpdate: PropTypes.func
}

export default EquipmentSetting;