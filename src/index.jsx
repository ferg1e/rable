import { useState } from 'react';

export default function Rable({data, readOnly = true}) {
    const isArrays = Array.isArray(data[0])

    return isArrays
        ? <RableArrays data={data} readOnly={readOnly}/>
        : <RableObjects data={data} readOnly={readOnly}/>
}

function RableArrays({data, readOnly}) {

    const [tableData, setTableData] = useState(data)

    //
    const largestLen = tableData.reduce(
        (n, v) => v.length > n ? v.length : n,
        1)

    //
    const headers = [<th></th>]

    for(let i = 0; i < largestLen; ++i) {
        headers.push(<th>{columnToLetter(i + 1)}</th>)
    }

    //
    const dataRows = tableData.map((v, i) => {
        const cols = [<td>{i + 1}</td>]

        for(let j = 0; j < largestLen; ++j) {
            const tdKey = `${i}-${j}`
            const tdContent = typeof v[j] !== 'undefined'
                ? v[j]
                : ''

            const td = !readOnly
                ? <td key={tdKey}><input value={tdContent} onChange={e => {
                    const newData = tableData.map((v2, i2) => {
                        if(i2 === i) {
                            const newArray = v2.slice()
                            newArray[j] = e.target.value
                            return newArray
                        }

                        return v2
                    })

                    setTableData(newData)
                }}/></td>

                : <td key={tdKey}>{tdContent}</td>

            cols.push(td)
        }

        return <tr key={i}>{cols}</tr>
    })

    //
    return (
        <table>
            <thead><tr>{headers}</tr></thead>
            <tbody>{dataRows}</tbody>
        </table>
    )
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

//
function columnToLetter(column) {
    let letter = ''

    while (column > 0) {
        const temp = (column - 1) % 26
        letter = String.fromCharCode(temp + 65) + letter
        column = (column - temp - 1) / 26
    }

    return letter
}
