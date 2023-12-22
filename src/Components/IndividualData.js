import React from 'react'

export const IndividualData = ({individualData,index}) => {
    return (
        <tr>
            <th>{index}</th>
            <th>{individualData.Category} </th>
            <th>{individualData.Expense} </th>
            <th>{individualData.Amount}</th>
        </tr>
    )
}
