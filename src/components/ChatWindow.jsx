import styled from "styled-components";

export default function ChatWindow({ messages }) {
    return (
        <>
            <Container>
                {messages.map((message) => (
                    <Message key={message.id}>{message.text}</Message>
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
