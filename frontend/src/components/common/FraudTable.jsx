function FraudTable({

    title,

    data

}) {

    return (

        <div className="analyst-table-wrapper">

            <h2 className="analyst-table-title">

                {title}

            </h2>

            <table className="analyst-table">

                <thead>

                    <tr>

                        <th>

                            Transaction

                        </th>

                        <th>

                            Risk Score

                        </th>

                        <th>

                            Created

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        Array.isArray(data)

                        &&

                        data.map(item => (

                            <tr

                                key={item.id}

                            >

                                <td>

                                    {

                                        item.transaction_id

                                    }

                                </td>

                                <td>

                                    {

                                        item.risk_score

                                    }

                                </td>

                                <td>

                                    {

                                        new Date(

                                            item.created_at

                                        )

                                        .toLocaleString()

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}

export default FraudTable