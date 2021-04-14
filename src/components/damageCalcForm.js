import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class DamageCalcForm extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        alert('calc!');
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="計算" />
                </form>
            </div>
        );
    }
}

export default DamageCalcForm;