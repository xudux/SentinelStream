function FraudTable({ title, data }) {
    return (
        <div className="table-container">
            <h2>{title}</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Risk Score</th>
                        <th>Time</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.transaction_id}</td>
                            <td>{item.risk_score}</td>
                            <td>{item.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FraudTable;