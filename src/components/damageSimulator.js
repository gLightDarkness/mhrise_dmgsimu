import React, { Component } from 'react';
import EquipmentSetting from './equipmentSetting';
import PreQuestSetting from './preQuestSetting';
import InQuestSetting from './inQuestSetting';
import ResultArea from './resultArea';
//import PropTypes from 'prop-types';

class DamageSimulator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <EquipmentSetting />
                <InQuestSetting />
                <PreQuestSetting />
                <ResultArea />
            </div>
        );
    }
}

export default DamageSimulator;