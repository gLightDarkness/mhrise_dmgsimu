import React from 'react';
import PropTypes from 'prop-types';
import Monster from '../../data/monster.json'
import MonsterParts from '../../data/monster_parts.json'
import Motion from '../../data/weapon_motion.json';
import ElementType from "../../data/element_type.json"
import Sharpness from '../../data/sharpness.json'
import Table from '../atoms/table';
import Thead from '../atoms/thead';
import Th from '../atoms/th';
import Tbody from '../atoms/tbody';
import Td from '../atoms/td';
import Tr from '../atoms/tr';
import Defines from "../../defines"
import Label from '../atoms/label';
import CommonFunctions from "../../commonFunctions";

const ResultTable = (props) => {
    const headers = [
        { "id": 1, "name": "部位" },
        { "id": 2, "name": "通常ダメージ" },
        { "id": 3, "name": "会心ダメージ" },
        { "id": 4, "name": "期待値" },
    ];
    const hardnessHeaders = [
        { "id": 1, "name": "部位" },
        { "id": 2, "name": "斬" },
        { "id": 3, "name": "打" },
        { "id": 4, "name": "弾" },
        { "id": 5, "name": "火" },
        { "id": 6, "name": "水" },
        { "id": 7, "name": "雷" },
        { "id": 8, "name": "氷" },
        { "id": 9, "name": "龍" },
    ];
    const monster = Monster.find((mon) => (mon.id == props.monsterID));
    if (!monster) {
        return (
            <div></div>
        );
    }
    const monsterParts = MonsterParts.filter((mp) => {
        return (mp.monster_id == props.monsterID);
    });

    const criticalBaseRate = props.weapon.criticalRate;
    let elementType1 = props.weapon.elementType;
    if (props.dragonSkillEffect.addElementType != 0) {
        elementType1 = props.dragonSkillEffect.addElementType;
    }
    const elementBaseValue1 = props.weapon.elementValue;
    let elementTypeStr1 = ElementType.filter((e) => {
        return e["id"] == elementType1;
    });
    if (elementTypeStr1.length == 0) {
        elementTypeStr1 = "無";
    } else {
        elementTypeStr1 = elementTypeStr1[0].name;
    }

    let motion = Motion.filter((m) => {
        return (m.weapon_type == props.weapon.type && m.id == props.motionID);
    });
    if (motion.length == 0) {
        return (
            <div></div>
        );
    }
    motion = motion[0];
    const motionRate = motion.value / 100;
    const elementMotionRate = motion.element_rate;

    let sharpness = Sharpness.filter((m) => {
        return m["id"] == props.sharpnessID;
    });
    if (sharpness.length == 0) {
        return (
            <div></div>
        );
    }
    let sharpnessCoeff = 1.0;
    if(motion.sharpness_coeff != "") {
        sharpnessCoeff = motion.sharpness_coeff;
    }
    sharpness = sharpness[0];
    const sharpnessPhysicalRate = sharpness.physical_rate * sharpnessCoeff;
    const sharpnessElementRate = sharpness.element_rate * sharpnessCoeff;

    // 攻撃力計算
    let offenseValue = props.weapon.offenseValue;
    offenseValue *= props.dragonSkillEffect.offenseCoeff;
    offenseValue += props.dragonSkillEffect.addOffenseValue;
    // 百竜スキル: 無属性強化
    const normalBoostEffect = props.dragonSkillEffect.spSkills.find((eff) => (eff.id == Defines.SP_DRAGON_SKILL_ID.NORMAL_ATTACK_BOOST));
    if (normalBoostEffect) {
        offenseValue += normalBoostEffect.offense_value;
    }

    offenseValue *= props.skillEffect.offenseCoeff;
    offenseValue *= props.inQuestParams.mulOffenceCoeff;

    offenseValue += props.skillEffect.addOffenseValue;
    offenseValue += props.preQuestParams.addOffenceValue;
    offenseValue += props.inQuestParams.addOffenceValue;

    offenseValue = CommonFunctions.round89(offenseValue);

    // 会心率計算
    let criticalRate = criticalBaseRate;
    criticalRate += props.inQuestParams.addCriticalRate;
    criticalRate += props.dragonSkillEffect.addCriticalValue;
    criticalRate += props.skillEffect.addCriticalValue;
    criticalRate = Math.floor(criticalRate)
    if (criticalRate > 100) {
        criticalRate = 100;
    }

    // 属性値計算
    let elementValue1 = elementBaseValue1;
    elementValue1 *= props.dragonSkillEffect.elementCoeff;
    elementValue1 *= props.skillEffect.elementCoeff;
    elementValue1 += props.dragonSkillEffect.addElementValue;
    elementValue1 += props.skillEffect.addElementValue;
    elementValue1 = CommonFunctions.round89(elementValue1);

    // ダメージ係数
    let coeff = 1;
    coeff *= props.dragonSkillEffect.physicalDamageCoeff;
    // 百竜スキル: ***系特攻
    props.dragonSkillEffect.slayerSkills.forEach((s) => {
        const typeBit = CommonFunctions.convertTargetTypeToTypeBit(s.target_type);
        if (monster.type_bits != "" && monster.type_bits & typeBit) {
            if (s.physical_damage_coeff != "") {
                coeff *= s.physical_damage_coeff;
            }
        }
    });
    // 百竜スキル: 鉄蟲糸技強化
    if (motion.is_techu_shigi != "") {
        const techuBoostEffect = props.dragonSkillEffect.spSkills.find((eff) => (eff.id == Defines.SP_DRAGON_SKILL_ID.TECHU_SHIGI_BOOST));
        if (techuBoostEffect) {
            coeff *= techuBoostEffect.physical_damage_coeff;
        }
    }
    const physicalDamageCoeff = coeff;
    coeff = props.dragonSkillEffect.elementDamageCoeff;
    const elementDamageCoeff = coeff;
    coeff = props.skillEffect.damageCoeff;
    const damageCoeff = coeff;

    // 会心率係数(スキル情報から取得)
    const criticalPhysicalDMGRate = props.skillEffect.criticalPhysicalCoeff;
    const criticalElementDMGRate = props.skillEffect.criticalElementCoeff;

    let results = {};
    for (let key in monsterParts) {
        // 肉質計算
        let part = monsterParts[key];
        let physicalHardness = 0;
        switch (motion.physical_type) {
            case Defines.PHYSICAL_TYPE["SEVER"]:
                physicalHardness = part.sever_value;
                break;
            case Defines.PHYSICAL_TYPE["BLUNT"]:
                physicalHardness = part.blunt_value;
                break;
            case Defines.PHYSICAL_TYPE["SHOT"]:
                physicalHardness = part.shot_value;
                break;
            case Defines.PHYSICAL_TYPE["IGNORE"]:
                physicalHardness = 100;
                break;
        }
        let elementHardness1 = 0;
        switch (elementType1) {
            case 1:
                elementHardness1 = part.element_value_fire;
                break;
            case 2:
                elementHardness1 = part.element_value_water;
                break;
            case 3:
                elementHardness1 = part.element_value_thunder;
                break;
            case 4:
                elementHardness1 = part.element_value_ice;
                break;
            case 5:
                elementHardness1 = part.element_value_dragon;
                break;
        }

        // スキル: 弱点特効
        let criticalPartRate = criticalRate;
        if (physicalHardness >= Defines.WEAKNESS_HARDNESS.PHYSICAL) {
            let weaknessExploitEffect = props.skillEffect.spEffects.find((eff) => (eff.skill_id == Defines.SP_SKILL_ID.WEAKNESS_EXPLOIT));
            if (weaknessExploitEffect) {
                criticalPartRate += weaknessExploitEffect.critical_value;
                if (criticalPartRate > 100) {
                    criticalPartRate = 100;
                }
            }
        }

        // 百竜スキル: 弱点特効【属性】処理
        let elementDamageCoeffByPart = elementDamageCoeff;
        if (elementHardness1 >= Defines.WEAKNESS_HARDNESS.ELEMENT) {
            let weaknessExploitElementEffect = props.dragonSkillEffect.spSkills.find((eff) => (eff.id == Defines.SP_DRAGON_SKILL_ID.WEAKNESS_EXPLOIT_ELEMENT));
            if (weaknessExploitElementEffect) {
                elementDamageCoeffByPart *= weaknessExploitElementEffect.element_damage_coeff;
            }
        }

        // スキル: 心眼
        // TODO: 属性ダメージには影響しないかもしれぬ
        let damageCoeffByPart = damageCoeff;
        const repelValue = physicalHardness * sharpnessPhysicalRate;
        if (repelValue < 45) {
            let mindsEyeEffect = props.skillEffect.spEffects.find((eff) => (eff.skill_id == Defines.SP_SKILL_ID.MINDS_EYE));
            if (mindsEyeEffect) {
                damageCoeffByPart *= mindsEyeEffect.damage_coeff;
            }
        }

        let expectedPhysicalDMGCoeff = 1.0;
        // 百竜スキル: 鈍刃の一撃
        let dullBladeCriticalProbability = 0;
        let dullBladeCriticalCoeff = 1;
        if (sharpness.id <= 4) {
            let dullBladeCriticalEffect = props.dragonSkillEffect.spSkills.find((eff) => (eff.id == Defines.SP_DRAGON_SKILL_ID.DULL_BLADE_CRITICAL));
            if (dullBladeCriticalEffect) {
                dullBladeCriticalProbability = dullBladeCriticalEffect.probability;
                dullBladeCriticalCoeff *= dullBladeCriticalEffect.physical_damage_coeff;
                expectedPhysicalDMGCoeff *= ((1 - (dullBladeCriticalProbability / 100)) +
                    (dullBladeCriticalProbability / 100 * dullBladeCriticalCoeff));
            }
        }

        // 百竜スキル: 痛恨の一撃
        let griefBladeCriticalProbability = 0;
        let griefBladeCriticalCoeff = 1;
        if (criticalPartRate < 0) {
            let griefBladeCriticalEffect = props.dragonSkillEffect.spSkills.find((eff) => (eff.id == Defines.SP_DRAGON_SKILL_ID.GRIEF_BLADE_CRITICAL));
            if (griefBladeCriticalEffect) {
                griefBladeCriticalProbability = griefBladeCriticalEffect.probability;
                griefBladeCriticalCoeff *= griefBladeCriticalEffect.physical_damage_coeff;
            }
        }

        // ダメージ計算
        // 物理ダメージ
        let physicalDMG = offenseValue * (physicalHardness / 100) * motionRate;
        physicalDMG *= sharpnessPhysicalRate;
        physicalDMG *= physicalDamageCoeff;
        physicalDMG *= damageCoeffByPart;
        physicalDMG = Math.round(physicalDMG);
        // 物理会心
        let criticalPhysicalDMGRateByPart = criticalPhysicalDMGRate;
        if (criticalPartRate < 0) {
            // マイナス会心
            criticalPhysicalDMGRateByPart = 0.75;
            criticalPartRate = Math.abs(criticalPartRate);
        }
        let criticalPhysicalDMG = physicalDMG * criticalPhysicalDMGRateByPart;
        criticalPhysicalDMG = Math.round(criticalPhysicalDMG);
        // 鈍刃の一撃
        let dullBladeDMG = 0;
        let dullBladeCriticalDMG = 0;
        if (dullBladeCriticalProbability > 0) {
            dullBladeDMG = physicalDMG * dullBladeCriticalCoeff;
            dullBladeDMG = Math.round(dullBladeDMG);
            dullBladeCriticalDMG = criticalPhysicalDMG * dullBladeCriticalCoeff;
            dullBladeCriticalDMG = Math.round(dullBladeCriticalDMG);
        }
        // 痛恨の一撃
        let griefBladeDMG = 0;
        if (griefBladeCriticalProbability > 0) {
            griefBladeDMG = physicalDMG * griefBladeCriticalCoeff;
            griefBladeDMG = Math.round(griefBladeDMG);
        }

        // 属性ダメージ
        let elementDMG1 = elementValue1 * (elementHardness1 / 100) * elementMotionRate;
        elementDMG1 *= sharpnessElementRate;
        elementDMG1 *= elementDamageCoeffByPart;
        elementDMG1 *= damageCoeffByPart;
        elementDMG1 = Math.round(elementDMG1);
        // 属性会心
        let criticalElementDMG1 = elementDMG1 * criticalElementDMGRate;
        criticalElementDMG1 = Math.round(criticalElementDMG1);

        // 期待値
        let expectedPhysicalDMG =
            physicalDMG * (1 - (criticalPartRate / 100)) +
            criticalPhysicalDMG * (criticalPartRate / 100) * ((100 - griefBladeCriticalProbability) / 100) +
            griefBladeDMG * (criticalPartRate / 100) * ((griefBladeCriticalProbability) / 100);
        expectedPhysicalDMG *= expectedPhysicalDMGCoeff;
        expectedPhysicalDMG = Math.round(expectedPhysicalDMG * 100) / 100;
        let expectedElementDMG1 =
            elementDMG1 * (1 - (criticalPartRate / 100)) +
            criticalElementDMG1 * (criticalPartRate / 100);
        expectedElementDMG1 = Math.round(expectedElementDMG1 * 100) / 100;

        // 計算結果格納
        let dmg = {
            "id": 1,
            "physical": physicalDMG,
            "dullBladePhysical": dullBladeDMG,
            "griefBladePhysical": 0,
            "element": elementDMG1
        }
        let criticalDMG = {
            "id": 2,
            "physical": criticalPhysicalDMG,
            "dullBladePhysical": dullBladeCriticalDMG,
            "griefBladePhysical": griefBladeDMG,
            "element": criticalElementDMG1
        }
        let expectedDMG = {
            "id": 3,
            "physical": expectedPhysicalDMG,
            "dullBladePhysical": 0,
            "griefBladePhysical": 0,
            "element": expectedElementDMG1,
        }
        let resultOfPart = [
            dmg,
            criticalDMG,
            expectedDMG
        ];
        results[part.parts_id] = resultOfPart;
    }

    return (
        <div className="row">
            <h2>
                ○結果
            </h2>
            <Label className="col-4 mb-2 text-danger">
                <strong>攻撃力: {offenseValue}</strong>
            </Label>
            <Label className="col-4 text-danger">
                <strong>会心率: {criticalRate}</strong>
            </Label>
            {elementType1 != 0 &&
                <Label className="col-4 text-danger">
                    <strong>属性: {elementTypeStr1} {elementValue1}</strong>
                </Label>
            }

            <div>
                <Table className="table table-striped">
                    <Thead>
                        <Tr>
                            {headers.map((item) =>
                                <Th scope="column" key={item.id}>{item.name}</Th>
                            )}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {monsterParts.map((item) =>
                            <Tr key={item.parts_id}>
                                <Td>
                                    {item.name}
                                </Td>
                                {results[item.parts_id].map((result) =>
                                    <Td key={result.id}>
                                        <div>
                                            {result.physical + result.element}
                                            {elementType1 != 0 &&
                                                <span>
                                                    ({result.element})
                                                </span>
                                            }
                                            {result.dullBladePhysical > 0 &&
                                                <span>
                                                    [{result.dullBladePhysical + result.element}]
                                                </span>
                                            }
                                            {result.griefBladePhysical > 0 &&
                                                <span>
                                                    [{result.griefBladePhysical + result.element}]
                                                </span>
                                            }
                                        </div>
                                    </Td>
                                )}
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </div>

            <div>
                <h3>□肉質一覧</h3>
                <Table className="table table-striped">
                    <Thead>
                        <Tr>
                            {hardnessHeaders.map((item) =>
                                <Th scope="column" key={item.id}>{item.name}</Th>
                            )}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {monsterParts.map((item) =>
                            <Tr key={item.parts_id}>
                                <Td>
                                    {item.name}
                                </Td>
                                <Td>
                                    {item.sever_value}
                                </Td>
                                <Td>
                                    {item.blunt_value}
                                </Td>
                                <Td>
                                    {item.shot_value}
                                </Td>
                                <Td>
                                    {item.element_value_fire}
                                </Td>
                                <Td>
                                    {item.element_value_water}
                                </Td>
                                <Td>
                                    {item.element_value_thunder}
                                </Td>
                                <Td>
                                    {item.element_value_ice}
                                </Td>
                                <Td>
                                    {item.element_value_dragon}
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </div>
        </div>
    );
}

ResultTable.propTypes = {
    monsterID: PropTypes.number,
    motionID: PropTypes.number,
    sharpnessID: PropTypes.number,
    weapon: PropTypes.object,
    preQuestParams: PropTypes.object,
    inQuestParams: PropTypes.object,
    dragonSkillEffect: PropTypes.object,
    skillEffect: PropTypes.object,
}

export default ResultTable;