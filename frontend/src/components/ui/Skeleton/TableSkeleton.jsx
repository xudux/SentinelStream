import Skeleton from "./Skeleton";

function TableSkeleton({

    rows = 5,

    columns = 5

}) {

    return (

        <div className="table-container">

            <table className="ui-table">

                <thead>

                    <tr>

                        {

                            Array.from({

                                length: columns

                            }).map((_, index) => (

                                <th key={index}>

                                    <Skeleton
                                        width="80px"
                                        height="18px"
                                    />

                                </th>

                            ))

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        Array.from({

                            length: rows

                        }).map((_, row) => (

                            <tr key={row}>

                                {

                                    Array.from({

                                        length: columns

                                    }).map((_, col) => (

                                        <td key={col}>

                                            <Skeleton
                                                height="18px"
                                            />

                                        </td>

                                    ))

                                }

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default TableSkeleton;