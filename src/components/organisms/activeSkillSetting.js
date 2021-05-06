import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SkillEffect from '../../data/skill_effect'
import Li from '../atoms/li';
import Ul from '../atoms/ul';
import CheckboxInput from '../atoms/checkboxInput';

const ActiveSkillSettingFunction = (props) => {
    let skillList = props.skillInfoList.concat();
    skillList = skillList.filter((s) => {
        const conditionalEffect =  SkillEffect.find((e) => (e.skill_id == s.id && e.level == s.level && e.trigger_type == 2));
        return (conditionalEffect);
    })

    return (
        <div>
            {skillList.length > 0 &&
                <h4>
                    ○クエスト中効果発動スキル有効/無効化
                </h4>
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

ActiveSkillSettingFunction.propTypes = {
    skillInfoList: PropTypes.array,
    onToggleSkillActivate: PropTypes.func,
}

export const ActiveSkillSetting = memo(ActiveSkillSettingFunction);