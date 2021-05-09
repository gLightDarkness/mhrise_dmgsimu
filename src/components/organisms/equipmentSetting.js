import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WeaponTypeDropDown from '../modecules/weaponTypeDropdown';
import NumberInput from '../atoms/numberInput';
import Label from '../atoms/label';
import ElementTypeDropdown from '../modecules/elementTypeDropdown';
import SkillSetting from '../modecules/skillSetting';
import DragonSkillSettingFree from '../modecules/dragonSkillSettingFree';

class EquipmentSetting extends Component {
    constructor(props) {
        super(props);
        this.equipmentParams = props.equipmentParams;
        this.handleUpdate = props.handleUpdate;
    }

    onChangeWeaponType(type) {
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
        if(type) {
            type = parseInt(type);
        } else {
            return;
        }
        this.equipmentParams.weaponElement1 = type;
        this.handleUpdate(this.equipmentParams);
    }

    onChangeElementValue1(value) {
        if(value) {
            value = parseInt(value);
        } else {
            return;
        }
        this.equipmentParams.weaponElementValue1 = value;
        this.handleUpdate(this.equipmentParams);
    }

    render() {
        return (
            <div>
                <h4>
                    ○装備設定
                </h4>

                <WeaponTypeDropDown handleChange={(type) => this.onChangeWeaponType(type)} />

                <div class="row mb-3">
                    <Label class="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">攻撃力: </Label>
                    <div class="col-sm-3 col-5">
                        <NumberInput value={this.equipmentParams.weaponOffenseValue} min={0} onChange={(ev) => { this.onChangeWeaponOffenseValue(ev.target.value) }} />
                    </div>
                </div>

                <div class="row mb-3">
                    <Label class="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">会心率: </Label>
                    <div class="col-sm-3 col-5">
                        <NumberInput value={this.equipmentParams.weaponCriticalRate} min={-100} max={100} onChange={(ev) => { this.onChangeWeaponCriticalRate(ev.target.value) }} />
                    </div>
                </div>

                <ElementTypeDropdown handleChange={(type) => this.onChangeElementType1(type)} />

                <div class="row mb-3">
                    <Label class="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">属性値: </Label>
                    <div class="col-sm-3 col-5">
                        <NumberInput value={this.equipmentParams.weaponElementValue1} min={0} onChange={(ev) => { this.onChangeElementValue1(ev.target.value) }} />
                    </div>
                </div>

                <div>
                    <DragonSkillSettingFree
                        skillInfoList={this.props.dragonSkillInfoList}
                        onAddSkill={this.props.onAddDragonSkill}
                        onRemoveSkill={this.props.onRemoveDragonSkill}
                    />
                </div>

                <div>
                    <SkillSetting
                        skillInfoList={this.props.skillInfoList}
                        onAddSkill={this.props.onAddSkill}
                        onSetSkillLevel={this.props.onSetSkillLevel}
                        onRemoveSkill={this.props.onRemoveSkill}
                    />
                </div>
            </div>
        );
    }
}

EquipmentSetting.propTypes = {
    equipmentParams: PropTypes.object,
    handleUpdate: PropTypes.func,
    skillInfoList: PropTypes.array,
    onAddSkill: PropTypes.func,
    onSetSkillLevel: PropTypes.func,
    onRemoveSkill: PropTypes.func,
    dragonSkillInfoList: PropTypes.array,
    onAddDragonSkill: PropTypes.func,
    onRemoveDragonSkill: PropTypes.func,
}

export default EquipmentSetting;