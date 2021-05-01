import React from 'react';
import PropTypes from 'prop-types';
import Select from '../atoms/select';
import Label from '../atoms/label';
import Option from '../atoms/option';
import Monster from '../../data/monster.json'

const MonsterDropdown = (props) => {
    const baseItems = [{ "id": 0, "name": "選択してください" }];
    const items = baseItems.concat(Monster);

    return (
        <div>
            <Label>ターゲット: </Label>
            <Select onChange={(ev) => { props.handleChange(parseInt(ev.target.value)) }}>
                {items.map((item) =>
                    <Option key={item.id} value={item.id}>
                        {item.name}
                    </Option>
                )}
            </Select>
        </div>
    );
}

MonsterDropdown.propTypes = {
    handleChange: PropTypes.func
}

export default MonsterDropdown;