import React, { Component } from 'react';
import EquipmentSetting from '../organisms/equipmentSetting';
import PreQuestSetting from '../organisms/preQuestSetting';
import InQuestSetting from '../organisms/inQuestSetting';
import ResultArea from '../organisms/resultArea';
import SkillSet from '../../models/skillSet'
import { ActiveSkillSetting } from '../organisms/activeSkillSetting';
import DragonSkillSet from '../../models/dragonSkillSet';
import { ActiveDragonSkillSetting } from '../organisms/activeDragonSkillSetting';
import WeaponParam from '../../models/weaponParam';
import UpdateHistory from '../organisms/updateHistory';

class DamageSimulator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preQuestParams: {
                addOffenceValue: 0,
            },
            inQuestParams: {
                addOffenceValue: 0,
                mulOffenceCoeff: 1,
                addCriticalRate: 0,
                addElementValue: 0,
                badConditionWater: false,
            },
        }
        this.weapon = new WeaponParam();
        this.skillSet = new SkillSet();
        this.dragonSkillSet = new DragonSkillSet();
    }

    onChangeWeaponType(weaponType) {
        this.weapon.reset();
        this.weapon.type = weaponType;
        this.dragonSkillSet.removeSkillAll();
        this.forceUpdate();
    }

    onChangeWeapon(weaponID) {
        this.weapon.setWeapon(weaponID);
        this.dragonSkillSet.removeSkillAll();
        this.forceUpdate();
    }

    onChangeWeaponParam(offenseVal, criticalRate, elementType, elementVal) {
        if(this.weapon.weaponID != 0) {
            return;
        }
        this.weapon.setOffenseValue(offenseVal);
        this.weapon.setCriticalRate(criticalRate);
        this.weapon.setElementType(elementType);
        this.weapon.setElementValue(elementVal);
        this.forceUpdate();
    }

    handlePreQuestParamUpdate(params) {
        this.setState({ preQuestParams: params });
    }

    handleInQuestParamUpdate(params) {
        this.setState({ inQuestParams: params });
    }

    onUpdateSkills() {
        this.forceUpdate();
    }

    render() {
        const dragonSkillEffect = this.dragonSkillSet.getSkillEffect(
            this.weapon.elementType
        );
        const skillEffect = this.skillSet.getSkillEffect(
            this.weapon.offenseValue,
            this.weapon.elementType,
            this.weapon.elementValue,
        );
        return (
            <div>
                <EquipmentSetting
                    onChangeWeaponType={(type) => {this.onChangeWeaponType(type);}}
                    weaponParam={this.weapon}
                    onChangeWeapon={(weaponID) => {this.onChangeWeapon(weaponID);}}
                    onChangeWeaponParam={(ov, cr, et, ev) => {this.onChangeWeaponParam(ov, cr, et, ev);}}
                    skillInfoList={this.skillSet.getSkillInfoList()}
                    onAddSkill={(skillID) => { this.skillSet.addSkill(skillID); this.onUpdateSkills(); }}
                    onSetSkillLevel={(skillID, level) => { this.skillSet.setSkillLevel(skillID, level); this.onUpdateSkills(); }}
                    onRemoveSkill={(skillID) => { this.skillSet.removeSkill(skillID); this.onUpdateSkills(); }}
                    dragonSkillInfoList={this.dragonSkillSet.getSkillInfoList()}
                    onAddDragonSkill={(skillID) => { this.dragonSkillSet.addSkill(skillID); this.onUpdateSkills(); }}
                    onRemoveDragonSkill={(skillID) => { this.dragonSkillSet.removeSkill(skillID); this.onUpdateSkills(); }}
                />
                <PreQuestSetting
                    handleUpdate={(params) => this.handlePreQuestParamUpdate(params)}
                    preQuestParams={this.state.preQuestParams}
                />
                <InQuestSetting
                    handleUpdate={(params) => this.handleInQuestParamUpdate(params)}
                    inQuestParams={this.state.inQuestParams}
                />
                <ActiveDragonSkillSetting
                    heading="○クエスト中効果発動百竜スキル有効/無効化"
                    skillInfoList={this.dragonSkillSet.getSkillInfoList()}
                    onToggleSkillActivate={(skillID, enable) => { this.dragonSkillSet.setSkillEnable(skillID, enable), this.onUpdateSkills(); }}
                />
                <ActiveSkillSetting
                    heading="○クエスト中効果発動スキル有効/無効化"
                    skillInfoList={this.skillSet.getSkillInfoList()}
                    onToggleSkillActivate={(skillID, enable) => { this.skillSet.setSkillEnable(skillID, enable), this.onUpdateSkills(); }}
                />
                <ResultArea
                    weapon={this.weapon}
                    preQuestParams={this.state.preQuestParams}
                    inQuestParams={this.state.inQuestParams}
                    dragonSkillEffect={dragonSkillEffect}
                    skillEffect={skillEffect}
                />
                <UpdateHistory/>
            </div>
        );
    }
}

export default DamageSimulator;