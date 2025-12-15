import { useState } from "react";
import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import convertDate from "../utils/convertDate";

export default function ChatWindow({ messages, currentUserId, partnerUserId }) {
    const { createMessage } = useAPI();
    const [messageText, setMessageText] = useState("");

    async function sendMessage(e) {
        e.preventDefault();
        try {
            await createMessage({
                text: messageText,
                receiverId: partnerUserId,
            });
            setMessageText("");
        } catch (err) {
            console.error("Error sending message: ", err);
        }
    }

    return (
        <>
            <Container>
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
                <InputMessageForm onSubmit={sendMessage}>
                    <InputMessageText
                        type="text"
                        value={messageText}
                        placeholder="Start typing your message here"
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
    gap: 1rem;
    border: 1px solid #86880b;
    border-radius: 5px;
    padding: 1rem;
    width: 400px;
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
`;

const MessageText = styled.p``;

const MessageDate = styled.p`
    color: #b1b1b1;
    font-size: 0.7rem;
`;

const InputMessageForm = styled.form`
    display: flex;
    justify-content: space-between;
`;

const InputMessageText = styled.input`
    padding: 0.5rem 0.2rem;
    border: none;
    border-radius: 5px 0 0 5px;
    width: 100%;
    background-color: #525252;
    color: white;

    &::placeholder {
        color: #a3a3a3;
    }
`;

const SendMessageBtn = styled.button`
    padding: 0.2rem 0.5rem;
    background-color: #1b611e;
    border: none;
    border-radius: 0 5px 5px 0;
    color: white;
    cursor: pointer;
`;
