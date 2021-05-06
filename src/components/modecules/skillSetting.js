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

        this.onAddSkill = props.onAddSkill;
        this.onSetSkillLevel = props.onSetSkillLevel;
        this.onRemoveSkill = props.onRemoveSkill;
    }

    getSelectableSkillList() {
        const baseSkillList = [{ "id": 0, "name": "選択してください" }];
        let list = baseSkillList.concat(Skill);
        list.filter((s) => {
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
    }

    render() {
        const selectableList = this.getSelectableSkillList();
        return (
            <div>
                <Label>スキル: </Label>
                <Select onChange={(ev) => { this.onSelectSkill(ev.target.value); }}>
                    {selectableList.map((item) =>
                        <Option key={item.id} value={item.id}>
                            {item.name}
                        </Option>
                    )}
                </Select>
                <Button type="button" onClick={() => { this.onClickAddButton(); }}>
                    追加
                </Button>
                <Ul>
                    {this.props.skillInfoList.map((item) =>
                        <Li key={item.id}>
                            {item.name} Lv.
                            <RangeInput
                                value={item.level}
                                min={1}
                                max={item.max_level}
                                onChange={(ev) => { this.props.onSetSkillLevel(item.id, parseInt(ev.target.value)) }}
                            />
                            <Label>{item.level}</Label>
                            <Button type="button" onClick={() => { this.props.onRemoveSkill(item.id); }}>
                                削除
                            </Button>
                        </Li>
                    )}
                </Ul>
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