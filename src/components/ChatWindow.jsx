import styled from "styled-components";
import convertDate from "../utils/convertDate";

export default function ChatWindow({ messages }) {
    return (
        <>
            <Container>
                {messages.map((message) => (
                    <Message key={message.id}>
                        {message.text}
                        <Date>{convertDate(message.createdAt)}</Date>
                    </Message>
                ))}
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Message = styled.div`
    padding: 0.5rem;
    background-color: #525252;
    border-radius: 5px;
`;

const Date = styled.p`
    color: #9e9e9e;
    font-size: 0.7rem;
    margin: 0;
`;
