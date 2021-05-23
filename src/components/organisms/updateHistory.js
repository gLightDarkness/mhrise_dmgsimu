import React from 'react';
import UpdateHistories from '../../data/update_histories'
import Label from '../atoms/label';

const UpdateHistory = () => {
    let histories = UpdateHistories.map((h) => {
        let ret = {
            id: h.id,
            description: h.description,
            date: new Date(h.date)
        }
        return ret;
    });
    return (
        <div>
            <h4>
                ●更新履歴
            </h4>
            {histories.map((history) =>
            <Label key={history.id}>
                {history.date.toLocaleDateString()} {history.description}
            </Label>
            )}
        </div>
    );
}
export default UpdateHistory;