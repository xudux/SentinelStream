import Skeleton from "./Skeleton";
import CardSkeleton from "./CardSkeleton";
import TableSkeleton from "./TableSkeleton";

function PageSkeleton() {

    return (

        <>

            <Skeleton
                width="260px"
                height="42px"
            />

            <br />

            <Skeleton
                width="420px"
                height="18px"
            />

            <br />

            <div className="analyst-cards-grid">

                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />

            </div>

            <TableSkeleton />

        </>

    );

}

export default PageSkeleton;