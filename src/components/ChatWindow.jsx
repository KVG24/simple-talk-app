import { useState } from "react";
import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import convertDate from "../utils/convertDate";

export default function ChatWindow({ messages, currentUserId, partnerId }) {
    const { createMessage } = useAPI();
    const [messageText, setMessageText] = useState("");

    async function sendMessage(e) {
        e.preventDefault();
        try {
            await createMessage({
                text: messageText,
                receiverId: partnerId,
            });
            setMessageText("");
        } catch (err) {
            console.error("Error sending message: ", err);
        }
    }

    return (
        <>
            <Container>
                <MessagesContainer>
                    {messages.map((message) => (
                        <MessageDiv
                            key={message.id}
                            $isSender={currentUserId === message.senderId}
                        >
                            <MessageText>{message.text}</MessageText>
                            <MessageDate>
                                {convertDate(message.createdAt)}
                            </MessageDate>
                        </MessageDiv>
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

const MessageDiv = styled.div`
    padding: 0.5rem;
    background-color: ${(props) => (props.$isSender ? "#1b611e" : "#686909")};
    border-radius: 5px;
    max-width: max-content;
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.$isSender ? "flex-end" : "flex-start")};
    align-self: ${(props) => (props.$isSender ? "flex-end" : "flex-start")};
    word-break: break-word;
`;

const MessageText = styled.p``;

const MessageDate = styled.p`
    color: #b1b1b1;
    font-size: 0.7rem;
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
