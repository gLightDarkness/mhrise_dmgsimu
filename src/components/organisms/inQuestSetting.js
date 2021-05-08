import React, { Component } from 'react';
import InQuestRangeInput from '../modecules/inQuestRangeInput';
import CheckboxInput from '../atoms/checkboxInput';
import Label from '../atoms/label';
import Select from '../atoms/select';
import Option from '../atoms/option';
import PropTypes from 'prop-types';

class InQuestSetting extends Component {
    constructor(props) {
        super(props);
        this.inQuestParams = props.inQuestParams;
        this.handleUpdate = props.handleUpdate;
        this.param = {
            isPowerPowder: false,
            isPowerSeed: false,
            powerDrugType: 0,
            catSkillType: 0,
            soulBirdAddValue: 0,
            shiranuiSquidAddValue: 0,
            isHomuraButterFly: false,
            isAmikiriDragonFly: false,
        }
    }

    calcAddOffenceValue() {
        let value = 0;
        value += this.param.soulBirdAddValue;
        if (this.param.isPowerPowder) {
            value += 10;
        }
        if (this.param.isPowerSeed) {
            value += 10;
        }
        if (this.param.isHomuraButterFly) {
            value += 25;
        }

        this.inQuestParams.addOffenceValue = value;
        this.handleUpdate(this.inQuestParams);
    }

    calcMulOffenceCoeff() {
        let coeff = 1;
        if (this.param.catSkillType == 1) {
            coeff *= 1.05;
        }

        this.inQuestParams.mulOffenceCoeff = coeff;
        this.handleUpdate(this.inQuestParams);
    }

    calcAddCriticalRate() {
        let rate = 0;
        rate += this.param.shiranuiSquidAddValue;
        if (this.param.isAmikiriDragonFly) {
            rate += 50;
        }
        if (this.param.catSkillType == 2) {
            rate += 30;
        }

        this.inQuestParams.addCriticalRate = rate;
        this.handleUpdate(this.inQuestParams);
    }

    onTogglePowerPowder(enable) {
        this.param.isPowerPowder = enable;
        this.calcAddOffenceValue();
    }

    onTogglePowerSeed(enable) {
        this.param.isPowerSeed = enable;
        this.calcAddOffenceValue();
    }

    onToggleHomuraButterFly(enable) {
        this.param.isHomuraButterFly = enable;
        this.calcAddOffenceValue();
    }

    onToggleAmikiriDragonFly(enable) {
        this.param.isAmikiriDragonFly = enable;
        this.calcAddCriticalRate();
    }

    onSelectPowerDrug(opt) {
        this.param.powerDrugType = parseInt(opt);
        this.calcAddOffenceValue();
    }

    onSelectCatSkill(opt) {
        this.param.catSkillType = parseInt(opt);
        this.calcAddCriticalRate();
        this.calcMulOffenceCoeff();
    }

    onUpdateSoulVird(value) {
        value = parseInt(value);
        this.param.soulBirdAddValue = value;
        this.calcAddOffenceValue();
    }

    onUpdateShiranuiSquid(value) {
        value = parseInt(value);
        this.param.shiranuiSquidAddValue = value;
        this.calcAddCriticalRate();
    }

    render() {
        return (
            <div>
                <h4>
                    ○クエスト中効果
                </h4>
                <div>
                    <Label>鬼人の粉塵: </Label>
                    <CheckboxInput
                        checked={this.param.isPowerPowder}
                        onChange={(ev) => { this.onTogglePowerPowder(ev.target.checked) }}
                    />
                </div>
                <div>
                    <Label>怪力の種: </Label>
                    <CheckboxInput
                        checked={this.param.isPowerSeed}
                        onChange={(ev) => { this.onTogglePowerSeed(ev.target.checked) }}
                    />
                </div>
                <div class="row mb-3">
                    <Label class="col-xl-1 col-md-2 col-sm-3 col-form-label mb-1">鬼人薬: </Label>
                    <div class="col-sm-5">
                        <Select onChange={(ev) => { this.onSelectPowerDrug(ev.target.value) }}>
                            <Option value={0}>なし</Option>
                            <Option value={1}>鬼人薬</Option>
                            <Option value={2}>鬼人薬グレート</Option>
                        </Select>
                    </div>
                </div>
                <div class="row mb-3">
                    <Label class="col-xl-1 col-md-2 col-sm-3 col-form-label mb-1">オトモアイルー: </Label>
                    <div class="col-sm-5">
                        <Select onChange={(ev) => { this.onSelectCatSkill(ev.target.value) }}>
                            <Option value={0}>なし</Option>
                            <Option value={1}>強化太鼓の技</Option>
                            <Option value={2}>強化咆哮の技</Option>
                        </Select>
                    </div>
                </div>
                <div>
                    <InQuestRangeInput
                        label="ヒトダマドリ"
                        value={this.param.soulBirdAddValue}
                        min={0}
                        max={20}
                        step={1}
                        onChangeValue={(value) => { this.onUpdateSoulVird(value) }}
                    />
                </div>
                <div>
                    <InQuestRangeInput
                        label="シラヌイカ"
                        value={this.param.shiranuiSquidAddValue}
                        min={0}
                        max={50}
                        step={5}
                        onChangeValue={(value) => { this.onUpdateShiranuiSquid(value) }}
                    />
                </div>
                <div>
                    <Label>ホムラチョウ: </Label>
                    <CheckboxInput
                        checked={this.param.isHomuraButterFly}
                        onChange={(ev) => { this.onToggleHomuraButterFly(ev.target.checked) }}
                    />
                </div>
                <div>
                    <Label>アミキリアカネ: </Label>
                    <CheckboxInput
                        checked={this.param.isAmikiriDragonFly}
                        onChange={(ev) => { this.onToggleAmikiriDragonFly(ev.target.checked) }}
                    />
                </div>
            </div>
        );
    }
}

InQuestSetting.propTypes = {
    inQuestParams: PropTypes.object,
    handleUpdate: PropTypes.func
}

export default InQuestSetting;