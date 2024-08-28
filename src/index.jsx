import { useState } from 'react';

export default function Rable({data, readOnly = true}) {
    const isArrays = Array.isArray(data[0])

    return isArrays
        ? <RableArrays data={data} readOnly={readOnly}/>
        : <RableObjects data={data} readOnly={readOnly}/>
}

function RableArrays({data, readOnly}) {
    return <span>arrays</span>
}

function RableObjects({data, readOnly}) {

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

    const dataRows = tableData.map((obj, i) => {
        const cols = []

        for(const j in obj) {
            const cellKey = `${j}-${obj['id']}`
            const isEditable = j !== 'id' && !readOnly
            const td = isEditable
                ? <td key={cellKey}><input value={obj[j]} onChange={e => {
                    const newData = tableData.map((obj, k) => {
                        if(k === i) {
                            return {
                                ...obj,
                                [j]: e.target.value
                            }
                        }

                        return obj
                    })
                    
                    setTableData(newData)
                }}/></td>

                : <td key={cellKey}>{obj[j]}</td>

            cols.push(td)
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
