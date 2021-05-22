import React from 'react';
import PropTypes from 'prop-types';
import Label from '../atoms/label';
import ElementType from "../../data/element_type.json"

const WeaponParamView = (props) => {
    const element = ElementType.find((e) => (e.id == props.weapon.elementType));
    let elementStr = "無";
    if(element){
        elementStr = element.name;
    }
    return (
        <div>
            <div className="row mb-3">
                <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label">
                    攻撃力:
                </Label>
                <Label className="col-sm-3 col-5 col-form-label">
                    {props.weapon.offenseValue}
                </Label>
            </div>
            <div className="row mb-3">
                <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label">
                    会心率:
                </Label>
                <Label className="col-sm-3 col-5 col-form-label">
                    {props.weapon.criticalRate}
                </Label>
            </div>
            <div className="row mb-3">
                <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label">
                    属性:
                </Label>
                <Label className="col-sm-3 col-5 col-form-label">
                    {elementStr}
                </Label>
            </div>
            <div className="row mb-3">
                <Label className="col-xxl-1 col-md-2 col-sm-3 col-3 col-form-label">
                    属性値:
                </Label>
                <Label className="col-sm-3 col-5 col-form-label">
                    {props.weapon.elementValue}
                </Label>
            </div>
        </div>
    );
}

WeaponParamView.propTypes = {
    weapon: PropTypes.object
}

export default WeaponParamView;