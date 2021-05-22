import React from 'react';
import PropTypes from 'prop-types';
import Label from '../atoms/label';
import ElementTypeDropdown from '../modecules/elementTypeDropdown';
import NumberInput from '../atoms/numberInput'

const WeaponParamManualSetting = (props) => {
    const offenseValue = props.weapon.offenseValue;
    const criticalRate = props.weapon.criticalRate
    const elementType = props.weapon.elementType;
    const elementValue = props.weapon.elementValue;
    return (
        <div>
            <div className="row mb-3">
                <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">攻撃力: </Label>
                <div className="col-sm-3 col-5">
                    <NumberInput
                        value={offenseValue}
                        min={0}
                        onChange={(ev) => {
                            props.onChangeParam(
                                parseInt(ev.target.value),
                                criticalRate,
                                elementType,
                                elementValue
                            )
                        }}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">会心率: </Label>
                <div className="col-sm-3 col-5">
                    <NumberInput
                        value={criticalRate}
                        min={0}
                        onChange={(ev) => {
                            props.onChangeParam(
                                offenseValue,
                                parseInt(ev.target.value),
                                elementType,
                                elementValue
                            )
                        }}
                    />
                </div>
            </div>

            <ElementTypeDropdown
                handleChange={(type) => {
                    props.onChangeParam(
                        offenseValue,
                        criticalRate,
                        type,
                        elementValue,
                    )
                }}
            />

            <div className="row mb-3">
                <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label mb-1">属性値: </Label>
                <div className="col-sm-3 col-5">
                    <NumberInput
                        value={elementValue}
                        min={0}
                        onChange={(ev) => {
                            props.onChangeParam(
                                offenseValue,
                                criticalRate,
                                elementType,
                                parseInt(ev.target.value),
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

WeaponParamManualSetting.propTypes = {
    weapon: PropTypes.object,
    onChangeParam: PropTypes.func
}

export default WeaponParamManualSetting;