import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Li from '../atoms/li';
import Ul from '../atoms/ul';
import CheckboxInput from '../atoms/checkboxInput';
import Defines from '../../defines'

const ActiveDragonSkillSettingFunction = (props) => {
    let skillList = props.skillInfoList.concat();
    skillList = skillList.filter((s) => {
        return (s.trigger_type == Defines.SKILL_TRIGGER_TYPE.CONDITIONAL);
    })

    return (
        <div>
            {skillList.length > 0 &&
                <h4> {props.heading} </h4>
            }
            <Ul>
                {skillList.map((skill) =>
                    <Li key={skill.id}>
                        {skill.name}
                        <CheckboxInput
                            checked={skill.enable}
                            onChange={(ev) => {props.onToggleSkillActivate(skill.id, ev.target.checked)}}
                        />
                    </Li>
                )}
            </Ul>
        </div>
    );
}

ActiveDragonSkillSettingFunction.propTypes = {
    heading: PropTypes.string,
    skillInfoList: PropTypes.array,
    onToggleSkillActivate: PropTypes.func,
}

export const ActiveDragonSkillSetting = memo(ActiveDragonSkillSettingFunction);