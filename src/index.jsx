import { useState } from 'react';

export default function Rable({data}) {

    //
    const [tableData, setTableData] = useState(data)
    const [lastSort, setLastSort] = useState(null)

    //
    if(tableData.length === 0) {
        return <span>no data</span>
    }

    //
    const keys = Object.keys(tableData[0])
    const headers = keys.map(v => <th
        key={v}
        onClick={() => {
            const newData = tableData.slice()

            //
            let sortAsc = true

            if(lastSort !== v) {
                setLastSort(v)
            }
            else {
                setLastSort(null)
                sortAsc = false
            }

            //
            newData.sort((a, b) => {
                return sortAsc ? a[v] > b[v] : a[v] < b[v]
            })

            setTableData(newData)
        }}>
            {v}
        </th>)

    const dataRows = tableData.map(obj => {
        const cols = []

        for(const i in obj) {
            const cellKey = `${i}-${obj['id']}`
            cols.push(<td key={cellKey}>{obj[i]}</td>)
        }

        return <tr key={obj['id']}>{cols}</tr>
    })
    
    return (
        <table>
            <thead><tr>{headers}</tr></thead>
            <tbody>{dataRows}</tbody>
        </table>
    )
}
