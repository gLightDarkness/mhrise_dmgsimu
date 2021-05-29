import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Skill from "../../data/skill"
import Select from '../atoms/select';
import Label from '../atoms/label';
import Option from '../atoms/option';
import Button from '../atoms/button';
import RangeInput from '../atoms/rangeInput';
import Ul from '../atoms/ul';
import Li from '../atoms/li';

class SkillSetting extends Component {
    constructor(props) {
        super(props);
        this.currentSkillID = 0;
    }

    getSelectableSkillList() {
        const baseSkillList = [{ "id": 0, "name": "選択してください" }];
        let skills = Skill.concat();
        skills.sort((a, b) => {
            return (a.order - b.order);
        });
        let list = baseSkillList.concat(Skill);
        list = list.filter((s) => {
            const info = this.props.skillInfoList.find((i) => i.id == s.id);
            return (!info);
        });
        return list;
    }

    onSelectSkill(skillID) {
        skillID = parseInt(skillID);
        this.currentSkillID = skillID;
    }

    onClickAddButton() {
        if (this.currentSkillID == 0) {
            return;
        }
        this.props.onAddSkill(this.currentSkillID);
        this.currentSkillID = 0;
    }

    render() {
        const selectableList = this.getSelectableSkillList();
        return (
            <div className="row mb-3">
                <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">
                    ｽｷﾙ: 
                </Label>
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
                                    <div className="col-4 col-form-label">{item.name} Lv.</div>
                                    <div className="col-3">
                                        <RangeInput
                                            value={item.level}
                                            min={1}
                                            max={item.max_level}
                                            onChange={(ev) => { this.props.onSetSkillLevel(item.id, parseInt(ev.target.value)) }}
                                        />
                                    </div>
                                    <Label className="col-1 col-form-label">{item.level}</Label>
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

SkillSetting.propTypes = {
    skillInfoList: PropTypes.array,
    onAddSkill: PropTypes.func,
    onSetSkillLevel: PropTypes.func,
    onRemoveSkill: PropTypes.func,
}

export default SkillSetting;