from datetime import datetime
from typing import Any, Dict, Optional

from pydantic import BaseModel, Field

from app.websocket.events import EventType


class WebSocketEvent(BaseModel):
    """
    Standard event format used for every websocket message.
    """

    event: EventType

    timestamp: datetime = Field(default_factory=datetime.utcnow)

    data: Dict[str, Any]

    source: Optional[str] = None

    request_id: Optional[str] = None