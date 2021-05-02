import React from 'react';
import PropTypes from 'prop-types';
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
import defines from "../../defines"
import Label from '../atoms/label';

const ResultTable = (props) => {
    const headers = [
        { "id": 1, "name": "部位" },
        { "id": 2, "name": "通常ダメージ" },
        { "id": 3, "name": "会心ダメージ" },
        { "id": 4, "name": "期待値" },
    ];
    const monsterParts = MonsterParts.filter((value) => {
        return (value.monster_id == props.monsterID);
    });

    const offenseBaseValue = props.equipmentParams.weaponOffenseValue;
    const criticalBaseRate = props.equipmentParams.weaponCriticalRate;
    const elementType1 = props.equipmentParams.weaponElement1;
    const elementBaseValue1 = props.equipmentParams.weaponElementValue1;
    let elementTypeStr1 = ElementType.filter((e) => {
        return e["id"] == elementType1;
    });
    if(elementTypeStr1.length == 0) {
        elementTypeStr1 = "無";
    } else {
        elementTypeStr1 = elementTypeStr1[0].name;
    }
    let criticalPhysicalDMGRate = 1.25;
    let criticalElementDMGRate = 1;

    let motion = Motion.filter((m) => {
        return m["id"] == props.motionID;
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
    sharpness = sharpness[0];
    const sharpnessPhysicalRate = sharpness.physical_rate;
    const sharpnessElementRate = sharpness.element_rate;

    // 攻撃力計算
    let offenseValue = offenseBaseValue;
    offenseValue += props.preQuestParams.addOffenceValue;
    offenseValue += props.inQuestParams.addOffenceValue;
    offenseValue *= props.inQuestParams.mulOffenceCoeff;
    offenseValue = Math.floor(offenseValue);

    // 会心率計算
    let criticalRate = criticalBaseRate;
    criticalRate += props.inQuestParams.addCriticalRate;
    criticalRate = Math.floor(criticalRate)
    if(criticalRate > 100) {
        criticalRate = 100;
    }

    // 属性値計算
    let elementValue1 = elementBaseValue1;

    let results = {};
    for (let key in monsterParts) {
        // 肉質計算
        let part = monsterParts[key];
        let physicalHardness = 0;
        switch (motion.physical_type) {
            case defines.PHYSICAL_TYPE["SEVER"]:
                physicalHardness = part.sever_value;
                break;
            case defines.PHYSICAL_TYPE["BLUNT"]:
                physicalHardness = part.blunt_value;
                break;
            case defines.PHYSICAL_TYPE["SHOT"]:
                physicalHardness = part.shot_value;
                break;
            case defines.PHYSICAL_TYPE["IGNORE"]:
                physicalHardness = 100;
                break;
        }
        let elementHardness1 = 0;
        switch(elementType1) {
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

        // ダメージ計算
        // 物理ダメージ
        let physicalDMG = offenseValue * (physicalHardness / 100) * motionRate;
        physicalDMG *= sharpnessPhysicalRate;
        physicalDMG = Math.round(physicalDMG);
        // 物理会心
        let criticalPhysicalDMG = physicalDMG * criticalPhysicalDMGRate;
        criticalPhysicalDMG = Math.round(criticalPhysicalDMG);

        // 属性ダメージ
        let elementDMG1 = elementValue1 * (elementHardness1 / 100) * elementMotionRate;
        elementDMG1 *= sharpnessElementRate;
        elementDMG1 = Math.round(elementDMG1);
        // 属性会心
        let criticalElementDMG1 = elementDMG1 * criticalElementDMGRate;
        criticalElementDMG1 = Math.round(criticalElementDMG1);

        // 期待値
        let expectedPhysicalDMG =
            physicalDMG * (1 - (criticalRate / 100)) +
            criticalPhysicalDMG * (criticalRate / 100);
        let expectedElementDMG1 =
            elementDMG1 * (1 - (criticalRate / 100)) +
            criticalElementDMG1 * (criticalRate / 100);

        // 計算結果格納
        let dmg = {
            "id": 1,
            "physical": physicalDMG,
            "element": elementDMG1
        }
        let criticalDMG = {
            "id": 2,
            "physical": criticalPhysicalDMG,
            "element": criticalElementDMG1
        }
        let expectedDMG = {
            "id": 3,
            "physical": expectedPhysicalDMG,
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
        <div>
            <Label>
                攻撃力: {offenseValue}
            </Label>
            <Label>
                会心率: {criticalRate}
            </Label>
            {elementType1 != 0 &&
                <div>
                    <Label>
                        属性: {elementTypeStr1} {elementValue1}
                    </Label>
                </div>
            }
            <Table>
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
                                    </div>
                                </Td>
                            )}
                    </Tr>
                    )}
                </Tbody>
            </Table>
        </div>
    );
}

ResultTable.propTypes = {
    monsterID: PropTypes.number,
    motionID: PropTypes.number,
    sharpnessID: PropTypes.number,
    equipmentParams: PropTypes.object,
    preQuestParams: PropTypes.object,
    inQuestParams: PropTypes.object,
    skillIDs: PropTypes.array,
    dragonSkillIDs: PropTypes.array,
    flags: PropTypes.number,

    // ----------------------- old
    physicalType: PropTypes.number,
    motionValue: PropTypes.number,
    motionElementRate: PropTypes.number,
    offenseValue: PropTypes.number,
    elementType: PropTypes.number,
    elementValue: PropTypes.number,
    criticalRate: PropTypes.number,
    criticalPhysicalRate: PropTypes.number,
    criticalElementRate: PropTypes.number,
}

export default ResultTable;