import React from 'react';
import PropTypes from 'prop-types';
import ElementType from "../../data/element_type.json"
import Select from '../atoms/select';
import Label from '../atoms/label';
import Option from '../atoms/option';

const ElementTypeDropdown = (props) => {
    const baseItems = [{ "id": 0, "name": "無" }];
    const items = baseItems.concat(ElementType);

    return (
        <div class="row mb-3">
            <Label class="col-xxl-1 col-md-2 col-sm-3 col-form-label mb-1">属性: </Label>
            <div class="col-sm-5">
                <Select onChange={(ev) => { props.handleChange(ev.target.value) }}>
                    {items.map((item) =>
                        <Option key={item.id} value={item.id}>
                            {item.name}
                        </Option>
                    )}
                </Select>
            </div>
        </div>
    );
}

ElementTypeDropdown.propTypes = {
    handleChange: PropTypes.func
}

export default ElementTypeDropdown;