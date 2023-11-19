import React from 'react'

export const IndividualData = ({individualData,index}) => {
    return (
        <tr>
            <th>{index}</th>
            <th>{individualData.Name} </th>
            <th>{individualData.Age}</th>
            <th>{individualData.Destignation}</th>
            <th>{individualData.Salary}</th>
        </tr>
    )
}
