import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CheckboxInput from '../atoms/checkboxInput';
import Label from '../atoms/label';

class PreQuestSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.param = {
            isPowerAmulet: true,
            isPowerClaws: true,
            isHypnosisMeal: true,
        }
        this.preQuestParams = props.preQuestParams;
        this.handleUpdate = props.handleUpdate;
        this.calcAddOffenceValue();
    }

    calcAddOffenceValue() {
        let value = 0;
        if (this.param.isPowerAmulet) {
            value += 6;
        }
        if (this.param.isPowerClaws) {
            value += 9;
        }
        if (this.param.isHypnosisMeal) {
            value += 9;
        }
        this.preQuestParams.addOffenceValue = value;
        this.handleUpdate(this.preQuestParams);
    }

    onTogglePowerAmulet(enable) {
        this.param.isPowerAmulet = enable;
        this.calcAddOffenceValue();
    }

    onTogglePowerClaws(enable) {
        this.param.isPowerClaws = enable;
        this.calcAddOffenceValue();
    }

    onToggleHypnosisMeal(enable) {
        this.param.isHypnosisMeal = enable;
        this.calcAddOffenceValue();
    }

    render() {
        return (
            <div>
                <h4>
                    ○準備効果
                </h4>
                <div>
                    <Label>力の護符: </Label>
                    <CheckboxInput
                        checked={this.param.isPowerAmulet}
                        onChange={(ev) => { this.onTogglePowerAmulet(ev.target.checked) }}
                    />
                </div>
                <div>
                    <Label>力の爪: </Label>
                    <CheckboxInput
                        checked={this.param.isPowerClaws}
                        onChange={(ev) => { this.onTogglePowerClaws(ev.target.checked) }}
                    />
                </div>
                <div>
                    <Label>お団子短期催眠術: </Label>
                    <CheckboxInput
                        checked={this.param.isHypnosisMeal}
                        onChange={(ev) => { this.onToggleHypnosisMeal(ev.target.checked) }}
                    />
                </div>
            </div>
        );
    }
}

PreQuestSetting.propTypes = {
    preQuestParams: PropTypes.object,
    handleUpdate: PropTypes.func
}

export default PreQuestSetting;