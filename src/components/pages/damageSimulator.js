import React, { Component } from 'react';
import EquipmentSetting from '../organisms/equipmentSetting';
import PreQuestSetting from '../organisms/preQuestSetting';
import InQuestSetting from '../organisms/inQuestSetting';
import ResultArea from '../organisms/resultArea';
import SkillSet from '../../models/skillSet'
import { ActiveSkillSetting } from '../organisms/activeSkillSetting';
import DragonSkillSet from '../../models/dragonSkillSet';
import { ActiveDragonSkillSetting } from '../organisms/activeDragonSkillSetting';

class DamageSimulator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentParams: {
                weaponType: 0,
                weaponOffenseValue: 0,
                weaponCriticalRate: 0,
                weaponElement1: 0,
                weaponElementValue1: 0,
                weaponElement2: 0,
                weaponElementValue2: 0,

                // 素の値をベースに上昇させる系。使わないかも
                addOffenseBaseValue: 0,
                mulOffenseBaseCoeff: 0,
                addCriticalBaseRate: 0,
                addElementBaseValue: 0,
                mulElementBaseCoeff: 0,
            },
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
            dragonSkillIds: [],
        }
        this.skillSet = new SkillSet();
        this.dragonSkillSet = new DragonSkillSet();
    }

    handleEquipmentParamUpdate(params) {
        this.setState({ equipmentParams: params });
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
            this.state.equipmentParams.weaponElement1,
        );
        const skillEffect = this.skillSet.getSkillEffect(
            this.state.equipmentParams.weaponOffenseValue,
            this.state.equipmentParams.weaponElement1,
            this.state.equipmentParams.weaponElementValue1,
        );
        return (
            <div>
                <EquipmentSetting
                    handleUpdate={(params) => this.handleEquipmentParamUpdate(params)}
                    equipmentParams={this.state.equipmentParams}
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
                    equipmentParams={this.state.equipmentParams}
                    preQuestParams={this.state.preQuestParams}
                    inQuestParams={this.state.inQuestParams}
                    dragonSkillEffect={dragonSkillEffect}
                    skillEffect={skillEffect}
                />
            </div>
        );
    }
}

export default DamageSimulator;