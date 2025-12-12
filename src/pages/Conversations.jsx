import styled from "styled-components";

export default function Conversations() {
    return (
        <>
            <LogOutLink
                href="/log-in"
                onClick={() => localStorage.removeItem("jwtToken")}
            >
                Log Out
            </LogOutLink>
            <Container>
                <h1>Conversations Page</h1>
                <ConversationsDiv></ConversationsDiv>
            </Container>
        </>
    );
}

const LogOutLink = styled.a`
    padding: 0.2rem 0.5rem;
    background-color: #28752c;
    border-radius: 3px;
    text-decoration: none;
    color: white;
    position: absolute;
    right: 1rem;
    top: 1rem;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const ConversationsDiv = styled.div`
    border: 2px solid white;
    border-radius: 5px;
`;
