import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonsterDropdown from '../modecules/monsterDropdown';
import ResultTable from '../modecules/resultTable';
import MotionDropdown from '../modecules/motionDropdown';
import SharpnessButtons from '../modecules/sharpnessButtons';

class ResultArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monsterID: 0,
            motionID: 0,
            sharpness: 1,
            equipmentParams: props.equipmentParams,
            preQuestParams: props.preQuestParams,
            inQuestParams: props.inQuestParams,
            skillIDs: props.skillIDs,
            dragonSkillIDs: props.dragonSkillIDs,
        };
        this.resultObj = {
            motionValue: 0,
            physicalType: 0,
            offenseValue: 0,
            elementType: 0,
            elementValue: 0,
            criticalRate: 0,
            criticalPhysicalRate: 0,
            criticalElementRate: 0,
            flags: 0,
        };
    }

    onChangeMonster(monsterID) {
        this.setState({ monsterID: monsterID });
    }

    onChangeMotionID(id) {
        this.setState({ motionID: id });
    }

    onChangeSharpness(id) {
        this.setState({ sharpness: id });
    }

    calcResultObj() {
        let resultObj = {
            motionValue: 0,
            physicalType: 0,
            offenseValue: 0,
            elementType: 0,
            elementValue: 0,
            criticalRate: 0,
            criticalPhysicalRate: 0,
            criticalElementRate: 0,
            sharpness: 0,
            flags: 0,
        }
        resultObj.offenseValue = this.state.equipmentParams.weaponOffenseValue;
        this.resultObj = resultObj;
    }

    render() {
        this.calcResultObj();
        return (
            <div>
                <h4>
                    ○結果
                </h4>
                <MonsterDropdown handleChange={(value) => { this.onChangeMonster(value) }} />
                <MotionDropdown
                    weaponType={this.state.equipmentParams.weaponType}
                    handleChangeID={(motionID) => { this.onChangeMotionID(motionID) }}
                />
                <SharpnessButtons
                    type="button"
                    currentID={this.state.sharpness}
                    handleChange={(value) => { this.onChangeSharpness(value) }}
                />
                <ResultTable
                    monsterID={this.state.monsterID}
                    motionID={this.state.motionID}
                    sharpnessID={this.state.sharpness}
                    equipmentParams={this.state.equipmentParams}
                    preQuestParams={this.state.preQuestParams}
                    inQuestParams={this.state.inQuestParams}
                    skillIDs={this.state.skillIDs}
                    dragonSkillIDs={this.state.dragonSkillIDs}
                    flags={this.resultObj.flags}

                    // ----------------------- old
                    offenseValue={this.resultObj.offenseValue}
                    elementType={this.resultObj.elementType}
                    elementValue={this.resultObj.elementValue}
                    criticalRate={this.resultObj.criticalRate}
                    criticalPhysicalRate={this.resultObj.criticalPhysicalRate}
                    criticalElementRate={this.resultObj.criticalElementRate}
                />
            </div>
        );
    }
}

ResultArea.propTypes = {
    equipmentParams: PropTypes.object,
    preQuestParams: PropTypes.object,
    inQuestParams: PropTypes.object,
    skillIDs: PropTypes.array,
    dragonSkillIDs: PropTypes.array,
}

export default ResultArea;