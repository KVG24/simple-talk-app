import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import ProfileSearch from "../components/ProfileSearch";

export default function Conversations() {
    const { getConversationProfiles, getConversation } = useAPI();
    const [conversationProfiles, setConversationProfiles] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [partnerId, setPartnerId] = useState(null);
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
        setPartnerId(profileId);
    }

    function refreshMessages(profileId) {
        getConversation(profileId).then((data) => setMessages(data));
    }

    return (
        <>
            <ProfileSearch openChatWindow={openChatWindow} />
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
                                $isActive={partnerId === profile.id}
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
                            partnerId={partnerId}
                            onAction={() => refreshMessages(partnerId)}
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
    border-radius: 5px;
    padding: 1rem;
    cursor: pointer;
    border: 1px solid;
    border-color: ${(props) => (props.$isActive ? "#8b8d0c" : "#1b611e")};
    background-color: ${(props) =>
        props.$isActive ? "#1b611e" : "transparent"};

    &:hover {
        background-color: #1b611e;
    }
`;
