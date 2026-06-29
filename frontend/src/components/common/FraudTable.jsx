import { EmptyState } from "../ui";

function FraudTable({ title, data }) {

    return (

        <div className="analyst-table-wrapper fade-in">

            <h2 className="analyst-table-title">
                {title}
            </h2>

            <div className="table-container">

                {Array.isArray(data) && data.length === 0 ? (

                    <EmptyState
                        title="No fraud data found"
                        description="Risk analysis results will appear here."
                    />

                ) : (

                    <table className="analyst-table table-fade">

                        <thead>

                            <tr>

                                <th>Transaction</th>
                                <th>Risk Score</th>
                                <th>Created</th>

                            </tr>

                        </thead>

                        <tbody>

                            {Array.isArray(data) &&
                                data.map(item => (

                                    <tr key={item.id}>

                                        <td>{item.transaction_id}</td>

                                        <td>{item.risk_score}</td>

                                        <td>

                                            {new Date(
                                                item.created_at
                                            ).toLocaleString()}

                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    );

}

export default FraudTable;