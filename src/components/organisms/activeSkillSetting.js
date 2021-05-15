import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SkillEffect from '../../data/skill_effect'
import Li from '../atoms/li';
import Ul from '../atoms/ul';
import CheckboxInput from '../atoms/checkboxInput';
import Defines from '../../defines'
import Label from '../atoms/label';

const ActiveSkillSettingFunction = (props) => {
    let skillList = props.skillInfoList.concat();
    skillList = skillList.filter((s) => {
        const conditionalEffect =  SkillEffect.find((e) => (e.skill_id == s.id && e.level == s.level && e.trigger_type == Defines.SKILL_TRIGGER_TYPE.CONDITIONAL));
        return (conditionalEffect);
    })

    return (
        <div>
            {skillList.length > 0 &&
                <h2> {props.heading} </h2>
            }
            <Ul>
                {skillList.map((skill) =>
                    <Li key={skill.id} className="form-check">
                        <CheckboxInput
                            checked={skill.enable}
                            onChange={(ev) => {props.onToggleSkillActivate(skill.id, ev.target.checked)}}
                            className="form-check-input"
                        />
                        <Label className="form-check-label" for={skill.id}>
                            {skill.name}
                        </Label>
                    </Li>
                )}
            </Ul>
        </div>
    );
}

ActiveSkillSettingFunction.propTypes = {
    heading: PropTypes.string,
    skillInfoList: PropTypes.array,
    onToggleSkillActivate: PropTypes.func,
}

export const ActiveSkillSetting = memo(ActiveSkillSettingFunction);