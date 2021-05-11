import React from 'react';
import PropTypes from 'prop-types';
import Label from '../atoms/label';
import RangeInput from '../atoms/rangeInput';

const InQuestRangeInput = (props) => {
    return (
        <div>
            <Label>{props.label}: </Label>
            <RangeInput
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={(ev) => { props.onChangeValue(ev.target.value) }}
            />
            <Label>{props.value}</Label>
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