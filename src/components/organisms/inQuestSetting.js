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
            isCatDrum: false,
            isCatYell: false,
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
        switch(this.param.powerDrugType) {
            case 1:
                value += 5;
                break;
            case 2:
                value += 7;
                break;
        }

        this.inQuestParams.addOffenceValue = value;
        this.handleUpdate(this.inQuestParams);
    }

    calcMulOffenceCoeff() {
        let coeff = 1;
        if (this.param.isCatDrum) {
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
        if (this.param.isCatYell) {
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

    onToggleCatDrum(enable) {
        this.param.isCatDrum = enable;
        this.calcMulOffenceCoeff();
    }

    onToggleCatYell(enable) {
        this.param.isCatYell = enable;
        this.calcAddCriticalRate();
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
                <h2>
                    ????????????????????????
                </h2>
                <div className="form-check">
                    <CheckboxInput
                        id="PowerPowder"
                        checked={this.param.isPowerPowder}
                        onChange={(ev) => { this.onTogglePowerPowder(ev.target.checked) }}
                        className="form-check-input"
                    />
                    <Label className="form-check-label" for="PowerPowder">???????????????</Label>
                </div>
                <div className="form-check">
                    <CheckboxInput
                        id="PowerSeed"
                        checked={this.param.isPowerSeed}
                        onChange={(ev) => { this.onTogglePowerSeed(ev.target.checked) }}
                        className="form-check-input"
                    />
                    <Label className="form-check-label" for="PowerSeed">????????????</Label>
                </div>
                <div className="row mb-3">
                    <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">?????????: </Label>
                    <div className="col-sm-5 col-5">
                        <Select
                            onChange={(ev) => { this.onSelectPowerDrug(ev.target.value) }}
                            currentValue={this.param.powerDrugType.toString()}
                        >
                            <Option value={0}>??????</Option>
                            <Option value={1}>?????????</Option>
                            <Option value={2}>?????????????????????</Option>
                        </Select>
                    </div>
                </div>
                <div className="form-check">
                    <CheckboxInput
                        id="CatDrum"
                        checked={this.param.isCatDrum}
                        onChange={(ev) => { this.onToggleCatDrum(ev.target.checked) }}
                        className="form-check-input"
                    />
                    <Label className="form-check-label" for="CatDrum">??????????????????</Label>
                </div>
                <div className="form-check">
                    <CheckboxInput
                        id="CatYell"
                        checked={this.param.isCatYell}
                        onChange={(ev) => { this.onToggleCatYell(ev.target.checked) }}
                        className="form-check-input"
                    />
                    <Label className="form-check-label" for="CatYell">??????????????????</Label>
                </div>
                <div>
                    <InQuestRangeInput
                        label="????????????????????????"
                        value={this.param.soulBirdAddValue}
                        min={0}
                        max={20}
                        step={1}
                        onChangeValue={(value) => { this.onUpdateSoulVird(value) }}
                    />
                </div>
                <div>
                    <InQuestRangeInput
                        label="???????????????"
                        value={this.param.shiranuiSquidAddValue}
                        min={0}
                        max={50}
                        step={5}
                        onChangeValue={(value) => { this.onUpdateShiranuiSquid(value) }}
                    />
                </div>
                <div className="form-check">
                    <CheckboxInput
                        id="HomuraButterFly"
                        checked={this.param.isHomuraButterFly}
                        onChange={(ev) => { this.onToggleHomuraButterFly(ev.target.checked) }}
                        className="form-check-input"
                    />
                    <Label className="form-check-label" for="HomuraButterFly">??????????????????</Label>
                </div>
                <div className="form-check">
                    <CheckboxInput
                        id="AmikiriDragonFly"
                        checked={this.param.isAmikiriDragonFly}
                        onChange={(ev) => { this.onToggleAmikiriDragonFly(ev.target.checked) }}
                        className="form-check-input"
                    />
                    <Label className="form-check-label" for="AmikiriDragonFly">?????????????????????</Label>
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