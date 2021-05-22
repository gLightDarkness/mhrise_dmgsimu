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
            preQuestParams: props.preQuestParams,
            inQuestParams: props.inQuestParams,
        };
        this.currentWeaponType = props.weapon.type;
        this.currentWeaponID = props.weapon.weaponID;
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

    render() {
        if(this.currentWeaponType != this.props.weapon.type) {
            this.currentWeaponType = this.props.weapon.type;
            // render()の中ではsetState使わない
            this.state.motionID = 0;
        }

        if(this.currentWeaponID != this.props.weapon.weaponID) {
            this.currentWeaponID = this.props.weapon.weaponID;
            // render()の中ではsetState使わない
            this.state.sharpness = this.props.weapon.defaultSharpness;
        }

        return (
            <div>
                <div className="mb-3">
                    <h2>
                        ○戦闘状況
                    </h2>
                    <MonsterDropdown handleChange={(value) => { this.onChangeMonster(value) }} />
                    <MotionDropdown
                        weaponType={this.props.weapon.type}
                        handleChangeID={(motionID) => { this.onChangeMotionID(motionID) }}
                    />
                    <SharpnessButtons
                        type="button"
                        currentID={this.state.sharpness}
                        handleChange={(value) => { this.onChangeSharpness(value) }}
                    />
                </div>
                <ResultTable
                    weapon={this.props.weapon}
                    monsterID={this.state.monsterID}
                    motionID={this.state.motionID}
                    sharpnessID={this.state.sharpness}
                    preQuestParams={this.state.preQuestParams}
                    inQuestParams={this.state.inQuestParams}
                    dragonSkillEffect={this.props.dragonSkillEffect}
                    skillEffect={this.props.skillEffect}
                />
            </div>
        );
    }
}

ResultArea.propTypes = {
    weapon: PropTypes.object,
    preQuestParams: PropTypes.object,
    inQuestParams: PropTypes.object,
    dragonSkillEffect: PropTypes.object,
    skillEffect: PropTypes.object,
}

export default ResultArea;