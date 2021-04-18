import React, { Component } from 'react';
import EquipmentSetting from './equipmentSetting';
import PreQuestSetting from './preQuestSetting';
import InQuestSetting from './inQuestSetting';
import ResultArea from './resultArea';
//import PropTypes from 'prop-types';

class DamageSimulator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentParams: {
                weaponType: 0,
                skillIds: [],
                dragonSkillIds: [],
                weaponOffenseValue: 0,
                weaponCriticalRate: 0,
                weaponElement1: 0,
                weaponElement2: 0,
                weaponElementValue1: 0,
                weaponElementValue2: 0,
                addOffenseBaseValue: 0,
                multiplyOffenseBaseValue: 0,
                addCriticalBaseRate: 0,
                addElementBaseValue: 0,
                multiplyElementBaseValue: 0,
            },
            preQuestParams: {
                addOffenceValue: 0,
            },
            inQuestParams: {
                addOffenceValue: 0,
                multiplyOffenceValue: 0,
                addCriticalRate: 0,
                addElementValue: 0,
                badConditionWater: false,
            },
        }
    }

    handleUpdate() {
        alert(`handle Update!`);
    }

    handleEquipmentParamUpdate(params) {
        this.setState({equipmentParams: params});
        alert(`Update equipment param! weaponType: ${params.weaponType}`);
    }

    handlePreQuestParamUpdate(params) {
        this.setState({preQuestParams: params});
    }

    handleInQuestParamUpdate(params) {
        this.setState({inQuestParams: params});
    }

    handleEquipmentSettingUpdate() {
        alert(`handle Update!`);
    }

    render() {
        return (
            <div>
                <EquipmentSetting handleUpdate={(params) => this.handleEquipmentParamUpdate(params)} equipmentParams={this.state.equipmentParams}/>
                <InQuestSetting />
                <PreQuestSetting />
                <ResultArea equipmentParams={this.state.equipmentParams} preQuestParams={this.preQuestParams} inQuestParams={this.inQuestParams}/>
            </div>
        );
    }
}

export default DamageSimulator;