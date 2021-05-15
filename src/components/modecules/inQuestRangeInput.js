import React from 'react';
import PropTypes from 'prop-types';
import Label from '../atoms/label';
import RangeInput from '../atoms/rangeInput';

const InQuestRangeInput = (props) => {
    return (
        <div className="row mb-3">
            <Label className="col-4 col-form-label mb-1">{props.label}: </Label>
            <div className="col-3">
                <RangeInput
                    value={props.value}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    onChange={(ev) => { props.onChangeValue(ev.target.value) }}
                />
            </div>
            <Label className="col-1 col-form-label">{props.value}</Label>
        </div>
    );
}

InQuestRangeInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChangeValue: PropTypes.func
}

export default InQuestRangeInput;