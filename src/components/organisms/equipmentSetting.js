import React from 'react';
import PropTypes from 'prop-types';
import WeaponTypeDropDown from '../modecules/weaponTypeDropdown';
import SkillSetting from '../modecules/skillSetting';
import DragonSkillSetting from '../modecules/dragonSkillSetting'
import WeaponSelectDropdown from '../modecules/weaponSelectDropdown';
import WeaponParamManualSetting from '../modecules/weaponParamManualSetting';
import WeaponParamView from '../modecules/weaponParamView';

const EquipmentSetting = (props) => {
    return (
        <div>
            <h2>
                ○装備設定
            </h2>

            <WeaponTypeDropDown handleChange={(type) => props.onChangeWeaponType(type)} />

            <WeaponSelectDropdown
                handleChange={(weaponID) => props.onChangeWeapon(weaponID)}
                weaponType={props.weaponParam.type}
            />

            {props.weaponParam.weaponID == 0
                ?
                <WeaponParamManualSetting
                    weapon={props.weaponParam}
                    onChangeParam={(ov, cr, et, ev) => props.onChangeWeaponParam(ov, cr, et, ev)}
                />
                :
                <WeaponParamView
                    weapon={props.weaponParam}
                />
            }

            <div>
                <DragonSkillSetting
                    skillInfoList={props.dragonSkillInfoList}
                    onAddSkill={props.onAddDragonSkill}
                    onRemoveSkill={props.onRemoveDragonSkill}
                    skillSetID={props.weaponParam.dragonSkillSetID}
                    skillSetNum={props.weaponParam.dragonSkillSlotNum}
                />
            </div>

            <div>
                <SkillSetting
                    skillInfoList={props.skillInfoList}
                    onAddSkill={props.onAddSkill}
                    onSetSkillLevel={props.onSetSkillLevel}
                    onRemoveSkill={props.onRemoveSkill}
                />
            </div>
        </div>
    );
}

EquipmentSetting.propTypes = {
    onChangeWeaponType: PropTypes.func,
    weaponParam: PropTypes.object,
    onChangeWeapon: PropTypes.func,
    onChangeWeaponParam: PropTypes.func,
    skillInfoList: PropTypes.array,
    onAddSkill: PropTypes.func,
    onSetSkillLevel: PropTypes.func,
    onRemoveSkill: PropTypes.func,
    dragonSkillInfoList: PropTypes.array,
    onAddDragonSkill: PropTypes.func,
    onRemoveDragonSkill: PropTypes.func,
}
export default EquipmentSetting;