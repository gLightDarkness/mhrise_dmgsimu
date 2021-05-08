import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragonSkill from "../../data/dragon_skill.json"
import Select from '../atoms/select';
import Label from '../atoms/label';
import Option from '../atoms/option';
import Button from '../atoms/button';
import Ul from '../atoms/ul';
import Li from '../atoms/li';

class DragonSkillFree extends Component {
    constructor(props) {
        super(props);
        this.currentSkillID = 0;

        this.MAX_SLOT_NUM = 3; // 最大セット可能数
    }

    getSelectableSkillList() {
        const baseSkillList = [{ "id": 0, "name": "選択してください" }];
        let list = baseSkillList.concat(DragonSkill);
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
        if (this.props.skillInfoList.length >= this.MAX_SLOT_NUM) {
            return;
        }
        this.props.onAddSkill(this.currentSkillID);
        this.currentSkillID = 0;
    }

    render() {
        const selectableList = this.getSelectableSkillList();
        return (
            <div>
                <Label>百竜スキル: </Label>
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
                            {item.name}                            <Label>{item.level}</Label>
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

DragonSkillFree.propTypes = {
    skillInfoList: PropTypes.array,
    onAddSkill: PropTypes.func,
    onRemoveSkill: PropTypes.func,
}

export default DragonSkillFree;