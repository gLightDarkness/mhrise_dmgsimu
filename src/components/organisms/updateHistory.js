import React from 'react';
import UpdateHistories from '../../data/update_histories'
import Li from '../atoms/li';
import Ul from '../atoms/ul';

const UpdateHistory = () => {
    let histories = UpdateHistories.map((h) => {
        let ret = {
            id: h.id,
            description: h.description,
            date: new Date(h.date)
        }
        return ret;
    });
    histories = histories.reverse();
    return (
        <div>
            <h4>
                ●更新履歴
            </h4>
            <Ul>
                {histories.map((history) =>
                <Li key={history.id}>
                    {history.date.toLocaleDateString()} {history.description}
                </Li>
                )}
            </Ul>
        </div>
    );
}
export default UpdateHistory;