import styled from "styled-components";
import useConversationsList from "../hooks/useConversationsList";
import { useEffect, useState } from "react";

export default function Conversations() {
    const { partners, loading, error } = useConversationsList();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading conversations: {error}</p>;

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
                    {partners.map((partnerId) => (
                        <PartnerDiv key={partnerId}>{partnerId}</PartnerDiv>
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
