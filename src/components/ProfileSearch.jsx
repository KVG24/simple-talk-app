import { useState, useEffect } from "react";
import useAPI from "../hooks/useAPI";
import styled from "styled-components";

export default function ProfileSearch({ openChatWindow }) {
    const { searchProfiles } = useAPI();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const delayed = setTimeout(() => {
            if (query.length > 1) {
                searchProfiles(query).then((data) => setResults(data));
            } else {
                setResults([]);
            }
        }, 500); // wait 0.5s after the user stops typing

        return () => clearTimeout(delayed);
    }, [query]);

    function handleClickOnResult(id) {
        openChatWindow(id);
        setQuery("");
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }

    return (
        <Container>
            <SearchInput
                type="text"
                name="search"
                placeholder="Search users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <ResultsContainer>
                {results &&
                    results.map((profile) => (
                        <FoundProfile
                            key={profile.id}
                            onClick={() => handleClickOnResult(profile.id)}
                        >
                            {profile.name} (@{profile.username})
                        </FoundProfile>
                    ))}
            </ResultsContainer>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: #3d3d3d;

    @media (max-width: 500px) {
        top: 0.2rem;
        left: 0.2rem;
    }
`;

const SearchInput = styled.input`
    background-color: #252525;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    width: 200px;
    color: white;

    &::placeholder {
        color: #afafaf;
    }
`;

const ResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

const FoundProfile = styled.div`
    padding: 0.5rem;
    border: 1px solid #686909;
    border-radius: 5px;
    background-color: #252525;

    &:hover {
        background-color: #1b611e;
        cursor: pointer;
    }
`;
