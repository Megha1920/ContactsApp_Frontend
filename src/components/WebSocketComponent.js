// src/components/WebSocketComponent.js
import React, { useEffect } from 'react';

const WebSocketComponent = () => {
    useEffect(() => {
        // Ensure the WebSocket URL matches your Django Channels URL configuration
        const socket = new WebSocket('ws://localhost:8000/ws/contacts/');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            console.log('Message from server', event.data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error', error);
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed', event);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            WebSocket Component
        </div>
    );
};

export default WebSocketComponent;
