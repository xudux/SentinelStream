from fastapi import APIRouter, Body, WebSocket, WebSocketDisconnect

from app.websocket.broadcaster import broadcaster
from app.websocket.events import EventType
from app.websocket.manager import manager

router = APIRouter(
    prefix="/ws",
    tags=["WebSocket"],
)


@router.websocket("/connect")
async def websocket_endpoint(
    websocket: WebSocket,
):
    """
    Basic websocket endpoint.

    Authentication and role validation
    will be added in the next phase.
    """

    await manager.connect(websocket)

    try:
        while True:
            # Wait for client messages.
            # Currently we don't process them,
            # but this keeps the connection alive.
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect(websocket)

@router.post("/test-broadcast")
async def test_broadcast(
    message: str = Body(..., embed=True),
):
    await broadcaster.publish(
        event=EventType.NOTIFICATION,
        data={
            "message": message,
        },
        source="test_endpoint",
    )

    return {
        "success": True
    }