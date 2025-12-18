import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function useAPI() {
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    const logIn = async (credentials, setError, setLoading) => {
        try {
            const response = await fetch(`${API_URL}/log-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            localStorage.setItem("jwtToken", data.token);
            navigate("/");
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const signUp = async (credentials, setError, setLoading) => {
        try {
            const response = await fetch(`${API_URL}/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            navigate("/log-in");
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getReceivedMessages = async () => {
        try {
            const response = await fetch(`${API_URL}/messages/received`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const getSentMessages = async () => {
        try {
            const response = await fetch(`${API_URL}/messages/sent`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const getConversationProfiles = async () => {
        try {
            const response = await fetch(`${API_URL}/messages/partners`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const getConversation = async (profileId) => {
        try {
            const response = await fetch(
                `${API_URL}/messages/conversationWith/${profileId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const createMessage = async (messageData) => {
        try {
            const response = await fetch(`${API_URL}/messages/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(messageData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const editMessage = async (editedMessageData, messageId) => {
        try {
            const response = await fetch(
                `${API_URL}/messages/edit/${messageId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: json.stringify(editedMessageData),
                }
            );

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const deleteMessage = async (messageId) => {
        try {
            const response = await fetch(
                `${API_URL}/messages/delete/${messageId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const searchProfiles = async (query) => {
        try {
            // 'q' key to match what the controller expects (req.query.q)
            const response = await fetch(
                `${API_URL}/profiles/search?q=${query}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            console.error("Search Error:", err);
            return null;
        }
    };

    return {
        logIn,
        signUp,
        getReceivedMessages,
        getSentMessages,
        getConversationProfiles,
        getConversation,
        createMessage,
        editMessage,
        deleteMessage,
        searchProfiles,
    };
}
