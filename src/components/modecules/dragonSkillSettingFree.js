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
            <div class="row mb-3">
                <Label class="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">百竜ｽｷﾙ: </Label>
                <div class="col-sm-5 col-5">
                    <Select onChange={(ev) => { this.onSelectSkill(ev.target.value); }}>
                        {selectableList.map((item) =>
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        )}
                    </Select>
                </div>
                <div class="col-sm-3 col-4">
                    <Button type="button" onClick={() => { this.onClickAddButton(); }} class="btn btn-primary">
                        追加
                    </Button>
                </div>
                <div class="col-sm-8 col-12">
                    <Ul class="list-group list-group-flush">
                        {this.props.skillInfoList.map((item) =>
                            <Li key={item.id} class="list-group-item">
                                <div class="row">
                                    <div class="col-8 col-form-label mb-1">
                                        {item.name}
                                    </div>
                                    <div class="col-4">
                                        <Button type="button" onClick={() => { this.props.onRemoveSkill(item.id); }} class="btn btn-danger">
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

DragonSkillFree.propTypes = {
    skillInfoList: PropTypes.array,
    onAddSkill: PropTypes.func,
    onRemoveSkill: PropTypes.func,
}

export default DragonSkillFree;