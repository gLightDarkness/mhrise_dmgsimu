import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragonSkill from "../../data/dragon_skill"
import DragonSkillSet from "../../data/dragon_skill_set"
import Select from '../atoms/select';
import Label from '../atoms/label';
import Option from '../atoms/option';
import Button from '../atoms/button';
import Ul from '../atoms/ul';
import Li from '../atoms/li';

class DragonSkillSetting extends Component {
    constructor(props) {
        super(props);
        this.currentSkillID = 0;
    }

    getSelectableSkillList() {
        const baseSkillList = [{ "id": 0, "name": "選択してください" }];
        let setList = [];
        if (this.props.skillSetID != 0) {
            setList = DragonSkillSet.filter((set) => {
                return (set.set_id == this.props.skillSetID);
            });
        }
        let skillList = DragonSkill.concat();
        skillList = skillList.filter((skill) => {
            if (this.props.skillSetID != 0) {
                const inSet = setList.find((set) => (set.d_skill_id == skill.id));
                if (!inSet) {
                    return false;
                }
            }
            const info = this.props.skillInfoList.find((i) => i.id == skill.id);
            return (!info);
        });
        const selectableList = baseSkillList.concat(skillList);
        return selectableList;
    }

    onSelectSkill(skillID) {
        skillID = parseInt(skillID);
        this.currentSkillID = skillID;
    }

    onClickAddButton() {
        if (this.currentSkillID == 0) {
            return;
        }
        if (this.props.skillInfoList.length >= this.props.skillSetNum) {
            return;
        }
        this.props.onAddSkill(this.currentSkillID);
        this.currentSkillID = 0;
    }

    render() {
        const selectableList = this.getSelectableSkillList();
        return (
            <div className="row mb-3">
                <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">百竜ｽｷﾙ: </Label>
                <div className="col-sm-5 col-5">
                    <Select onChange={(ev) => { this.onSelectSkill(ev.target.value); }}>
                        {selectableList.map((item) =>
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        )}
                    </Select>
                </div>
                <div className="col-sm-3 col-4">
                    <Button type="button" onClick={() => { this.onClickAddButton(); }} className="btn btn-primary">
                        追加
                    </Button>
                </div>
                <div className="col-sm-8 col-12">
                    <Ul className="list-group list-group-flush">
                        {this.props.skillInfoList.map((item) =>
                            <Li key={item.id} className="list-group-item">
                                <div className="row">
                                    <div className="col-8 col-form-label mb-1">
                                        {item.name}
                                    </div>
                                    <div className="col-4">
                                        <Button type="button"
                                            onClick={() => { this.props.onRemoveSkill(item.id); }}
                                            className="btn btn-danger">
                                            削除
                                        </Button>
                                    </div>
                                </div>
                            </Li>
                        )}
                    </Ul>
                </div>
            </div>
        );
    }
}

DragonSkillSetting.propTypes = {
    skillInfoList: PropTypes.array,
    onAddSkill: PropTypes.func,
    onRemoveSkill: PropTypes.func,
    skillSetID: PropTypes.number,
    skillSetNum: PropTypes.number,
}

export default DragonSkillSetting;