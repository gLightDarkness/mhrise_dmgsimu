import React from 'react';
import PropTypes from 'prop-types';
import MonsterParts from '../../data/monster_parts.json'
import Motion from '../../data/weapon_motion.json';
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
    //let elementType = props.equipmentParams.weaponElement1;
    //let elementValue = props.equipmentParams.weaponElementValue1;
    let criticalPhysicalDMGRate = 1.25;
    //let criticalElementDMGRate = 1;

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
    //const sharpnessElementRate = sharpness.element_rate;

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

    let results = {};
    for (let key in monsterParts) {
        let part = monsterParts[key];
        let physicalVal = 0;
        switch (motion.physical_type) {
            case defines.PHYSICAL_TYPE["SEVER"]:
                physicalVal = part.sever_value;
                break;
            case defines.PHYSICAL_TYPE["BLUNT"]:
                physicalVal = part.blunt_value;
                break;
            case defines.PHYSICAL_TYPE["SHOT"]:
                physicalVal = part.shot_value;
                break;
            case defines.PHYSICAL_TYPE["IGNORE"]:
                physicalVal = 100;
                break;
        }

        // ダメージ計算
        let normalPhysicalDMG = physicalVal / 100 * offenseValue * motionRate;
        normalPhysicalDMG *= sharpnessPhysicalRate;
        normalPhysicalDMG = Math.round(normalPhysicalDMG);
        let criticalPhysicalDMG = normalPhysicalDMG * criticalPhysicalDMGRate;
        let expectedPhysicalDMG =
            normalPhysicalDMG * (1 - (criticalRate / 100)) +
            criticalPhysicalDMG * (criticalRate / 100);
        let normalDMG = {
            "id": 1,
            "physical": normalPhysicalDMG
        }
        let criticalDMG = {
            "id": 2,
            "physical": criticalPhysicalDMG
        }
        let expectedDMG = {
            "id": 3,
            "physical": expectedPhysicalDMG
        }
        let resultOfPart = [
            normalDMG,
            criticalDMG,
            expectedDMG
        ];
        results[part.parts_id] = resultOfPart;
    }

    return (
        <div>
            <Label>
                表示攻撃力: {offenseValue}
            </Label>
            <Label>
                表示会心率: {criticalRate}
            </Label>
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
                                    {result.physical}
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