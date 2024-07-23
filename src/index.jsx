export default function Rable({data}) {

    //
    if(data.length === 0) {
        return <span>no data</span>
    }

    //
    const keys = Object.keys(data[0])
    const headers = keys.map(v => <th key={v}>{v}</th>)
    const dataRows = data.map(obj => {
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
