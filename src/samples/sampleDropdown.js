import React, { Component } from 'react';

class SampleDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            current: 0
        };
    }

    componentDidMount() {
        this.setState({
            menu: this.getDefaultMenu(),
            current: 0
        });
    }

    getDefaultMenu() {
        return ([
            { id: 1, label: "test1" },
            { id: 2, label: "test2" },
            { id: 3, label: "test3" }
        ]);
    }

    handleChange(event) {
        let id_ = event.target.value;
        alert(`change state! state: ${id_}`);
    }

    handleClick(event) {
        if (event.target.value == 1) {
            let newID = this.state.menu.slice(-1)[0].id + 1;
            let newItem = { id: newID, label: `test${newID}` };
            let newMenu = this.state.menu;
            newMenu.push(newItem);
            this.setState({
                menu: newMenu,
                current: newID
            });
            alert(`add menu! id: ${newID}`);
        } else {
            this.setState({
                menu: this.getDefaultMenu(),
                current: 0
            });
            alert(`init menu!`);
        }
    }

    render() {
        return (
            <div>
                <label>ドロップダウンテスト:</label>
                <select onChange={this.handleChange}>
                    {this.state.menu.map((menu) =>
                        <option key={menu.id} value={menu.id}>{menu.label}</option>
                    )}
                </select>
                <button value="1" onClick={(e) => this.handleClick(e)}>メニュー追加</button>
                <button value="2" onClick={(e) => this.handleClick(e)}>メニュー初期化</button>
            </div>
        );
    }
}
export default SampleDropdown;