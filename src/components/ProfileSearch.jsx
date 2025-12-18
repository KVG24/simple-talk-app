import { useState, useEffect } from "react";
import useAPI from "../hooks/useAPI";

export default function ProfileSearch() {
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

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or username..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div>
                {results &&
                    results.map((user) => (
                        <div key={user.id}>
                            {user.name} (@{user.username})
                        </div>
                    ))}
            </div>
        </div>
    );
}
