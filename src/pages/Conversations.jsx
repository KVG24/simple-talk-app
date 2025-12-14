import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";

export default function Conversations() {
    const { getConversationProfiles, getConversation } = useAPI();
    const [conversationProfiles, setConversationProfiles] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chatWindow, setChatWindow] = useState(false);

    useEffect(() => {
        getConversationProfiles().then((data) => setConversationProfiles(data));
    }, []);

    function openConversation(profileId) {
        getConversation(profileId).then((data) => setMessages(data));
        setChatWindow(true);
    }

    return (
        <>
            <LogOutLink
                href="/log-in"
                onClick={() => localStorage.removeItem("jwtToken")}
            >
                Log Out
            </LogOutLink>
            <Container>
                <h1>Conversations</h1>
                <ConversationsDiv>
                    <ConversationPartners>
                        {conversationProfiles.map((profile) => (
                            <PartnerDiv
                                onClick={() => openConversation(profile.id)}
                                key={profile.id}
                            >
                                <p>{profile.name}</p>
                                <p>@{profile.username}</p>
                            </PartnerDiv>
                        ))}
                    </ConversationPartners>
                    {chatWindow && <ChatWindow messages={messages} />}
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
    border-radius: 5px;
    display: flex;
    gap: 1rem;
`;

const ConversationPartners = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const PartnerDiv = styled.div`
    border: 1px solid #28752c;
    border-radius: 5px;
    padding: 1rem;
    cursor: pointer;

    & :hover {
        background-color: #525252;
    }

    & p {
        margin: 0;
    }
`;
