import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enemyId: 0,
            sharpness: 0,
            equipmentParams: props.equipmentParams,
            preQuestParams: props.preQuestParams,
            inQuestParams: props.inQuestParams,
        };
    }

    render() {
        return (
            <div>
                <h4>
                    ○結果
                </h4>
                <p>
                    武器タイプID: {this.state.equipmentParams.weaponType}
                </p>
            </div>
        );
    }
}

ResultArea.propTypes = {
    equipmentParams: PropTypes.object,
    preQuestParams: PropTypes.object,
    inQuestParams: PropTypes.object,
}

export default ResultArea;