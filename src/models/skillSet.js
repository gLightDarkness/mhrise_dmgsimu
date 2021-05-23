import Skill from "../data/skill"
import SkillEffect from "../data/skill_effect.json"
import CommonFunctions from "../commonFunctions"
import Defines from "../defines"

class SkillSet {
    constructor() {
        this.skills = [];
    }

    addSkill(skillID) {
        if(this.skills.find((skill) => skill.id == skillID)) {
            return;
        }
        let skillParam = {
            id: skillID,
            level: 1,
            enable: true,
        }
        this.skills.push(skillParam);
    }

    setSkillLevel(skillID, level) {
        this.skills.forEach((s) => {
            if (s.id == skillID) {
                s.level = level;
            }
        });
    }

    setSkillEnable(skillID, enable) {
        this.skills.forEach((s) => {
            if (s.id == skillID) {
                s.enable = enable;
            }
        });
    }

    removeSkill(skillID) {
        this.skills = this.skills.filter((s) => {
            return (s.id != skillID);
        });
    }

    getSkillInfoList() {
        let ret = [];
        this.skills.forEach((s) => {
            let info = Skill.find((skillInfo) => skillInfo.id == s.id);
            info.level = s.level;
            info.enable = s.enable;
            ret.push(info);
        });
        return ret;
    }

    getSkillEffect(elementType, baseElementValue) {
        // Wish: 副属性未対応
        let ret = {
            addOffenseValue: 0,
            offenseCoeff: 1,
            addCriticalValue: 0,
            addElementValue: 0,
            elementCoeff: 1,
            damageCoeff: 1.0,
            criticalPhysicalCoeff: 1.25,
            criticalElementCoeff: 1.0,
            spEffects: []
        };
        this.skills.forEach((s) => {
            if (s.enable == false) {
                return;
            }
            const effect = SkillEffect.find((e) => (
                e.skill_id == s.id &&
                e.level == s.level
            ));
            if (!effect) {
                console.log("Error: not find skill. ID: %d, level: %d", s.id, s.level);
                return;
            }
            if (effect.trigger_type == Defines.SKILL_TRIGGER_TYPE.SPECIAL) {
                ret.spEffects.push(effect);
                return;
            }

            if (effect.offense_value != "") {
                ret.addOffenseValue += effect.offense_value;
            }
            if (effect.offense_coeff != "") {
                ret.offenseCoeff *= effect.offense_coeff;
            }
            if (effect.critical_value != "") {
                ret.addCriticalValue += effect.critical_value;
            }
            const elementBit = CommonFunctions.convertElementTypeToElementBit(elementType);
            if (effect.element_bits != "" && effect.element_bits & elementBit) {
                if (effect.element_value != "") {
                    ret.addElementValue += effect.element_value;
                }
                if (effect.base_element_coeff != "") {
                    ret.addElementValue += ((effect.base_element_coeff - 1) * baseElementValue);
                }
                if (effect.element_coeff != "") {
                    ret.elementCoeff *= effect.element_coeff;
                }
            }
            if (effect.damage_coeff != "") {
                ret.damageCoeff = effect.damage_coeff;
            }
            if (effect.critical_physical_coeff != "") {
                ret.criticalPhysicalCoeff = effect.critical_physical_coeff;
            }
            if (effect.critical_element_coeff != "") {
                ret.criticalElementCoeff = effect.critical_element_coeff;
            }
        });
        return ret;
    }
}
export default SkillSet;