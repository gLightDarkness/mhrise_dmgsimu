import Data from '../data/weapon'

class WeaponParam {
    constructor() {
        this.reset();
    }

    reset() {
        this.weaponID = 0;
        this.type = 0;
        this.name = "任意入力";
        this.offenseValue = 0;
        this.defaultSharpness = 1;
        this.elementType = 0;
        this.elementValue = 0;
        this.criticalRate = 0;
        this.dragonSkillSetID = 0;
        this.dragonSkillSlotNum = 3;
        this.finally = 0;
    }

    setWeapon(weaponID) {
        const tmpType = this.type;
        this.reset();
        this.type = tmpType;
        const weapon = Data.find((w) => {
            return (w.id == weaponID);
        });
        if(!weapon){
            return;
        }

        this.weaponID = weaponID;
        this.type = weapon.weapon_type;
        this.name = weapon.name;
        this.offenseValue = weapon.offense_value;
        this.defaultSharpness = weapon.default_sharpness;
        if(weapon.element_type != ''){
            this.elementType = weapon.element_type;
        }
        if(weapon.element_value != ''){
            this.elementValue = weapon.element_value;
        }
        if(weapon.critical_rate != ''){
            this.criticalRate = weapon.critical_rate;
        }
        if(weapon.dragon_skill_set_id != ''){
            this.dragonSkillSetID = weapon.dragon_skill_set_id;
        }
        if(weapon.dragon_skill_slot != ''){
            this.dragonSkillSlotNum = weapon.dragon_skill_slot;
        }
        this.finally = weapon.finally;
    }

    setOffenseValue(offenseValue) {
        if(this.weaponID != 0) {
            // 任意入力以外受け付けない
            return;
        }
        this.offenseValue = offenseValue;
    }

    setCriticalRate(criticalRate) {
        if(this.weaponID != 0) {
            // 任意入力以外受け付けない
            return;
        }
        this.criticalRate = criticalRate;
    }

    setElementType(elementType) {
        if(this.weaponID != 0) {
            // 任意入力以外受け付けない
            return;
        }
        this.elementType = elementType;
    }

    setElementValue(elementValue) {
        if(this.weaponID != 0) {
            // 任意入力以外受け付けない
            return;
        }
        this.elementValue = elementValue;
    }
}
export default WeaponParam;