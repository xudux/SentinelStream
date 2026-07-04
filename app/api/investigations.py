from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.investigation import Investigation

from app.services.audit_service import create_audit_log

from app.schemas.investigation_schema import (
    InvestigationCreate,
    InvestigationUpdate,
    InvestigationResponse
)

from app.core.roles import require_analyst


router = APIRouter()


@router.post(
    "/",
    response_model=InvestigationResponse
)
def create_investigation(

    investigation: InvestigationCreate,
    

    db: Session = Depends(get_db),
        current_user=Depends(require_analyst)


):

    new_case = Investigation(

        fraud_event_id=investigation.fraud_event_id,

        assigned_to=investigation.assigned_to,

        priority=investigation.priority

    )

    db.add(new_case)

    db.commit()

    db.refresh(new_case)

    return new_case



@router.get(
    "/",
    response_model=list[InvestigationResponse]
)
def get_all_investigations(

    db: Session = Depends(get_db),
    current_user=Depends(require_analyst)

):

    cases = (

        db.query(Investigation)

        .order_by(
            Investigation.created_at.desc()
        )

        .all()

    )

    return cases



@router.get(
    "/{case_id}",
    response_model=InvestigationResponse
)
def get_investigation(

    case_id: int,

    db: Session = Depends(get_db),
    current_user=Depends(require_analyst)

):

    case = (

        db.query(Investigation)

        .filter(
            Investigation.id == case_id
        )

        .first()

    )

    if not case:

        raise HTTPException(

            status_code=404,

            detail="Investigation not found"

        )

    return case



@router.put(
    "/{case_id}",
    response_model=InvestigationResponse
)
def update_investigation(

    case_id: int,

    update: InvestigationUpdate,

    db: Session = Depends(get_db),

    current_user=Depends(require_analyst)

):

    case = (

        db.query(Investigation)

        .filter(
            Investigation.id == case_id
        )

        .first()

    )

    if not case:

        raise HTTPException(

            status_code=404,

            detail="Investigation not found"

        )



    if update.status is not None:

        case.status = update.status


    if update.assigned_to is not None:

        case.assigned_to = update.assigned_to


    if update.priority is not None:

        case.priority = update.priority


    if update.notes is not None:

        case.notes = update.notes


    if update.resolution is not None:

        case.resolution = update.resolution



    db.commit()

    db.refresh(case)


    create_audit_log(
        db,
        current_user.id,
        "INVESTIGATION_UPDATED",
        (
            f"Updated investigation {case.id} "
            f"(status={case.status}, "
            f"priority={case.priority}, "
            f"assigned_to={case.assigned_to})"
        )
    )

    return case

