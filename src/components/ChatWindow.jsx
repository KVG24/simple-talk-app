import { useState } from "react";
import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import Message from "./Message";

export default function ChatWindow({
    messages,
    currentUserId,
    partnerId,
    onAction,
}) {
    const { createMessage } = useAPI();
    const [messageText, setMessageText] = useState("");
    const [contextMenu, setContextMenu] = useState(false);
    const [mode, setMode] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [mouseCoordinates, setMouseCoordinates] = useState({
        x: 0,
        y: 0,
    });

    async function sendMessage(e) {
        e.preventDefault();
        try {
            if (!messageText) return null;
            await createMessage({
                text: messageText,
                receiverId: partnerId,
            });
            setMessageText("");
            onAction();
        } catch (err) {
            console.error("Error sending message: ", err);
        }
    }

    function handleRightClick(e, id, senderId) {
        if (senderId === currentUserId) {
            setMode("");
            e.preventDefault();
            setSelectedId(id);
            setContextMenu(true);
            setMouseCoordinates({ x: e.clientX, y: e.clientY });
        } else {
            return null;
        }
    }

    const resetMode = () => {
        setMode("");
        setSelectedId(null);
    };

    return (
        <>
            <Container>
                {contextMenu && (
                    <ContextMenu
                        $x={mouseCoordinates.x}
                        $y={mouseCoordinates.y}
                    >
                        <ContextMenuItem
                            onClick={() => {
                                setMode("delete");
                                setContextMenu(false);
                            }}
                        >
                            Delete
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => {
                                setMode("edit");
                                setContextMenu(false);
                            }}
                        >
                            Edit
                        </ContextMenuItem>
                    </ContextMenu>
                )}

                <MessagesContainer onClick={() => setContextMenu(false)}>
                    {messages.map((message) => (
                        <Message
                            key={message.id}
                            id={message.id}
                            senderId={message.senderId}
                            text={message.text}
                            createdAt={message.createdAt}
                            currentUserId={currentUserId}
                            handleRightClick={(e) =>
                                handleRightClick(
                                    e,
                                    message.id,
                                    message.senderId
                                )
                            }
                            mode={selectedId === message.id ? mode : ""}
                            resetMode={resetMode}
                            onAction={onAction}
                        />
                    ))}
                </MessagesContainer>
                <InputMessageForm onSubmit={sendMessage}>
                    <InputMessageText
                        type="text"
                        value={messageText}
                        placeholder="Start typing message... 'Enter' to send"
                        onChange={(e) => setMessageText(e.target.value)}
                    />
                    <SendMessageBtn type="submit">Send</SendMessageBtn>
                </InputMessageForm>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    border: 1px solid #86880b;
    border-radius: 5px;
    width: 400px;
    position: relative;
`;

const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
    height: 100%;
    overflow-y: auto;
    padding: 1rem;
    scrollbar-gutter: stable;
`;

const InputMessageForm = styled.form`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
`;

const InputMessageText = styled.input`
    padding: 0.7rem;
    border: none;
    border-radius: 5px 0 0 5px;
    width: 100%;
    background-color: #525252;
    color: white;

    &::placeholder {
        color: #a3a3a3;
    }

    &:focus {
        background-color: #113d13;
        outline: none;
    }
`;

const SendMessageBtn = styled.button`
    padding: 0.2rem 0.5rem;
    background-color: #1b611e;
    border-radius: 0 5px 5px 0;
    color: white;
    transition: all 0.2s;

    &:hover {
        background-color: #686909;
    }
`;

const ContextMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    padding: 0.5rem;
    z-index: 1000;
    background-color: #252525;
    border: 1px solid #525252;
    border-radius: 5px;
    top: ${(props) => props.$y}px;
    left: ${(props) => props.$x}px;
`;

const ContextMenuItem = styled.div`
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;

    &:hover {
        background-color: #525252;
    }
`;
