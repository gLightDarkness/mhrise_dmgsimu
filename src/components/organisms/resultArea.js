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
        };
        this.sharpness = props.weapon.defaultSharpness;
        this.currentWeaponID = props.weapon.weaponID;
    }

    onChangeMonster(monsterID) {
        this.setState({ monsterID: monsterID });
    }

    onChangeMotionID(id) {
        this.setState({ motionID: id });
    }

    onChangeSharpness(id) {
        this.sharpness = id;
        this.forceUpdate();
    }

    render() {
        if(this.currentWeaponID != this.props.weapon.weaponID) {
            this.currentWeaponID = this.props.weapon.weaponID;
            this.sharpness = this.props.weapon.defaultSharpness;
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
                        currentID={this.sharpness}
                        handleChange={(value) => { this.onChangeSharpness(value) }}
                    />
                </div>
                <ResultTable
                    weapon={this.props.weapon}
                    monsterID={this.state.monsterID}
                    motionID={this.state.motionID}
                    sharpnessID={this.sharpness}
                    preQuestParams={this.props.preQuestParams}
                    inQuestParams={this.props.inQuestParams}
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