import React, { Component } from 'react';
import EquipmentSetting from '../organisms/equipmentSetting';
import PreQuestSetting from '../organisms/preQuestSetting';
import InQuestSetting from '../organisms/inQuestSetting';
import ResultArea from '../organisms/resultArea';

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
            skillIds: [],
            dragonSkillIds: [],
        }
    }

    handleEquipmentParamUpdate(params) {
        this.setState({equipmentParams: params});
    }

    handlePreQuestParamUpdate(params) {
        this.setState({preQuestParams: params});
    }

    handleInQuestParamUpdate(params) {
        this.setState({inQuestParams: params});
    }

    render() {
        return (
            <div>
                <EquipmentSetting
                    handleUpdate={(params) => this.handleEquipmentParamUpdate(params)}
                    equipmentParams={this.state.equipmentParams}
                />
                <PreQuestSetting
                    handleUpdate={(params) => this.handlePreQuestParamUpdate(params)}
                    preQuestParams={this.state.preQuestParams}
                />
                <InQuestSetting
                    handleUpdate={(params) => this.handleInQuestParamUpdate(params)}
                    inQuestParams={this.state.inQuestParams}
                />
                <ResultArea
                    equipmentParams={this.state.equipmentParams}
                    preQuestParams={this.state.preQuestParams}
                    inQuestParams={this.state.inQuestParams}
                />
            </div>
        );
    }
}

export default DamageSimulator;