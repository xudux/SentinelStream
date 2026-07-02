from typing import Any, Dict, Optional

from app.websocket.events import EventType
from app.websocket.manager import manager
from app.websocket.schemas import WebSocketEvent


class EventBroadcaster:
    """
    Responsible for publishing websocket events.
    Business logic should interact with this class
    instead of talking directly to the ConnectionManager.
    """

    async def publish(
        self,
        event: EventType,
        data: Dict[str, Any],
        source: Optional[str] = None,
        request_id: Optional[str] = None,
    ):
        websocket_event = WebSocketEvent(
            event=event,
            data=data,
            source=source,
            request_id=request_id,
        )

        await manager.broadcast(websocket_event.model_dump(mode="json"))

    async def publish_to_role(
        self,
        role: str,
        event: EventType,
        data: Dict[str, Any],
        source: Optional[str] = None,
        request_id: Optional[str] = None,
    ):
        websocket_event = WebSocketEvent(
            event=event,
            data=data,
            source=source,
            request_id=request_id,
        )

        await manager.broadcast_to_role(
            role,
            websocket_event.model_dump(mode="json"),
        )

    async def publish_to_user(
        self,
        user_id: int,
        event: EventType,
        data: Dict[str, Any],
        source: Optional[str] = None,
        request_id: Optional[str] = None,
    ):
        websocket_event = WebSocketEvent(
            event=event,
            data=data,
            source=source,
            request_id=request_id,
        )

        await manager.send_personal_message(
            websocket_event.model_dump(mode="json"),
            user_id,
        )


broadcaster = EventBroadcaster()