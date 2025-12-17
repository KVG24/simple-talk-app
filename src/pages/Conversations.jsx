import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";

export default function Conversations() {
    const { getConversationProfiles, getConversation } = useAPI();
    const [conversationProfiles, setConversationProfiles] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [partnerUserId, setPartnerUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatWindow, setChatWindow] = useState(false);

    useEffect(() => {
        getConversationProfiles().then((data) => {
            setConversationProfiles(data.partners);
            setCurrentUserId(data.currentUserId);
        });
    }, []);

    function openChatWindow(profileId) {
        getConversation(profileId).then((data) => setMessages(data));
        setChatWindow(true);
        setPartnerUserId(profileId);
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
                <Title>Simple_Talk</Title>
                <ConversationsDiv>
                    <ConversationPartners>
                        {conversationProfiles.map((profile) => (
                            <PartnerDiv
                                onClick={() => openChatWindow(profile.id)}
                                key={profile.id}
                                tabIndex={profile.id}
                            >
                                <p>
                                    {profile.name} (@{profile.username})
                                </p>
                            </PartnerDiv>
                        ))}
                    </ConversationPartners>
                    {chatWindow && (
                        <ChatWindow
                            messages={messages}
                            currentUserId={currentUserId}
                            partnerUserId={partnerUserId}
                        />
                    )}
                </ConversationsDiv>
            </Container>
        </>
    );
}

const Title = styled.h1`
    text-align: center;
    width: 100%;
`;

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
    max-width: 1000px;
    margin: 0 auto;
    height: 80vh;
`;

const ConversationsDiv = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    height: 100%;
`;

const ConversationPartners = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #28752c;
    border-radius: 5px;
    width: 400px;
    overflow-y: auto;
    scrollbar-gutter: stable;
`;

const PartnerDiv = styled.div`
    border: 1px solid #686909;
    border-radius: 5px;
    padding: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #525252;
    }

    &:focus {
        background-color: #525252;
    }
`;
