import DragonSkill from "../data/dragon_skill.json"
import CommonFunctions from "../commonFunctions";
import Defines from "../defines"

class DragonSkillSet {
    constructor() {
        this.skills = [];
    }

    addSkill(skillID) {
        if(this.skills.find((s) => s.id == skillID)) {
            return;
        }
        const skill = DragonSkill.find((s) => s.id == skillID);
        let skillParam = {
            id: skillID,
            info: skill,
            enable: true,
        }
        this.skills.push(skillParam);
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

    removeSkillAll() {
        this.skills = [];
    }

    getSkillInfoList() {
        let ret = [];
        this.skills.forEach((s) => {
            let info = s.info;
            info.enable = s.enable;
            ret.push(info);
        });
        return ret;
    }

    getSkillEffect(elementType) {
        // Wish: 副属性未対応
        let ret = {
            addOffenseValue: 0,
            offenseCoeff: 1,
            addCriticalValue: 0,
            addElementType: 0,
            addElementValue: 0,
            elementCoeff: 1,
            physicalDamageCoeff: 1.0,
            elementDamageCoeff: 1.0,
            slayerSkills: [],
            spSkills: []
        };
        let skills = this.skills.concat();
        skills.sort((a, b) => {
            if(a.add_element == "" && b.add_element != ""){
                return 1;
            }
            return 0;
        });
        skills.forEach((skill) => {
            if (skill.enable == false) {
                return;
            }
            if (skill.info.trigger_type == Defines.SKILL_TRIGGER_TYPE.SLAYER) {
                ret.slayerSkills.push(skill.info);
                return;
            }
            if (skill.info.trigger_type == Defines.SKILL_TRIGGER_TYPE.SPECIAL) {
                ret.spSkills.push(skill.info);
                return;
            }

            if (skill.info.offense_value != "") {
                ret.addOffenseValue += skill.info.offense_value;
            }
            if (skill.info.critical_value != "") {
                ret.addCriticalValue += skill.info.critical_value;
            }
            if (elementType == 0 && skill.info.add_element != "") {
                ret.addElementType = skill.info.add_element;
                elementType = skill.info.add_element;
            }
            const elementBit = CommonFunctions.convertElementTypeToElementBit(elementType);
            if (skill.info.element_bits != "" && skill.info.element_bits & elementBit) {
                if (skill.info.element_value != "") {
                    ret.addElementValue += skill.info.element_value;
                }
            }
            if (skill.info.physical_damage_coeff != "") {
                ret.physicalDamageCoeff = skill.info.physical_damage_coeff;
            }
            if (skill.info.element_damage_coeff != "") {
                ret.elementDamageCoeff = skill.info.element_damage_coeff;
            }
        });
        return ret;
    }
}
export default DragonSkillSet;