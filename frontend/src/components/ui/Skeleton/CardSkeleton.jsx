import Skeleton from "./Skeleton";

function CardSkeleton() {

    return (

        <div className="ui-card ui-stat-card">

            <div className="ui-stat-top">

                <Skeleton
                    width="40px"
                    height="40px"
                />

                <Skeleton
                    width="120px"
                    height="20px"
                />

            </div>

            <Skeleton
                width="80px"
                height="42px"
            />

        </div>

    );

}

export default CardSkeleton;