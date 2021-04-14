import React, { Component } from 'react';

class DropdownTest extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'test'};
    }

    handleChange(event) {
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

export default DropdownTest;