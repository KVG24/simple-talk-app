import styled from "styled-components";
import convertDate from "../utils/convertDate";

export default function ChatWindow({ messages, currentUserId }) {
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
    color: #9e9e9e;
    font-size: 0.7rem;
`;
