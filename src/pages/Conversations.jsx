import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import { useEffect, useState } from "react";

export default function Conversations() {
    const { getConversationProfiles } = useAPI();
    const [conversationProfiles, setConversationProfiles] = useState([]);

    useEffect(() => {
        getConversationProfiles().then((data) => setConversationProfiles(data));
    });

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
                <ConversationsDiv>
                    {conversationProfiles.map((profile) => (
                        <PartnerDiv key={profile.id}>
                            <p>{profile.name}</p>
                            <p>@{profile.username}</p>
                        </PartnerDiv>
                    ))}
                </ConversationsDiv>
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
    display: flex;
    flex-direction: column;
`;

const PartnerDiv = styled.div`
    border: 1px solid #28752c;
    border-radius: 5px;
    padding: 1rem;
`;
