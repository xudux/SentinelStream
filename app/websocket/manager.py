from collections import defaultdict
from fastapi import WebSocket
from typing import Dict, Set


class ConnectionManager:
    """
    Handles all active websocket connections.

    Supports:
    - Global broadcasting
    - Role-based broadcasting
    - User-specific messaging
    """

    def __init__(self):
        # Every connected websocket
        self.active_connections: Set[WebSocket] = set()

        # role -> websocket connections
        self.role_connections: Dict[str, Set[WebSocket]] = defaultdict(set)

        # user_id -> websocket
        self.user_connections: Dict[int, WebSocket] = {}

    async def connect(
        self,
        websocket: WebSocket,
        role: str = None,
        user_id: int = None,
    ):
        """
        Accept and register a websocket connection.
        """

        await websocket.accept()

        self.active_connections.add(websocket)

        if role:
            self.role_connections[role].add(websocket)

        if user_id is not None:
            self.user_connections[user_id] = websocket

    def disconnect(
        self,
        websocket: WebSocket,
        role: str = None,
        user_id: int = None,
    ):
        """
        Remove a websocket connection.
        """

        self.active_connections.discard(websocket)

        if role:
            self.role_connections[role].discard(websocket)

            if not self.role_connections[role]:
                del self.role_connections[role]

        if user_id is not None:
            self.user_connections.pop(user_id, None)

    async def send_personal_message(
        self,
        message: dict,
        user_id: int,
    ):
        """
        Send a message to a specific user.
        """

        websocket = self.user_connections.get(user_id)

        if websocket:
            try:
                await websocket.send_json(message)
            except Exception:
                self.user_connections.pop(user_id, None)
                self.active_connections.discard(websocket)

    async def broadcast(self, message: dict):
        """
        Send a message to every connected websocket.
        """

        disconnected = []

        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                disconnected.append(connection)

        for connection in disconnected:
            self.active_connections.discard(connection)

    async def broadcast_to_role(
        self,
        role: str,
        message: dict,
    ):
        """
        Broadcast only to users having a specific role.
        """

        connections = self.role_connections.get(role, set())

        disconnected = []

        for websocket in connections:
            try:
                await websocket.send_json(message)
            except Exception:
                disconnected.append(websocket)

        for websocket in disconnected:
            connections.discard(websocket)

    def total_connections(self):
        return len(self.active_connections)

    def connected_roles(self):
        return {
            role: len(connections)
            for role, connections in self.role_connections.items()
        }


manager = ConnectionManager()