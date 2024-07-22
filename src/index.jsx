export default function FluffyTable({data}) {

    //
    if(data.length === 0) {
        return <span>no data</span>
    }

    //
    const keys = Object.keys(data[0])
    const headers = keys.map(v => <th>{v}</th>)
    const dataRows = data.map(obj => {
        const cols = []

        for(const i in obj) {
            cols.push(<td>{obj[i]}</td>)
        }

        return <tr>{cols}</tr>
    })
    
    return (
        <table>
            <tr>{headers}</tr>
            {dataRows}
        </table>
    )
}
