import { useState, useEffect } from "react";
import useAPI from "./useAPI";
import { jwtDecode } from "jwt-decode";

export default function useConversationsList() {
    const { getReceivedMessages, getSentMessages } = useAPI();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // get current user id from jwt token
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;
    const decoded = jwtDecode(token);

    // check token expiration and remove if expired
    if (Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem("jwtToken");
        return null;
    }

    const currentUserId = decoded.sub; // current user id

    // get all unique user IDs that the current user has communicated with
    useEffect(() => {
        async function fetchAndNormalizeMessages() {
            if (!currentUserId) {
                setLoading(false);
                setError("User not authenticated.");
                return;
            }

            try {
                // get all sent and received messages of the current user
                const [received, sent] = await Promise.all([
                    getReceivedMessages(),
                    getSentMessages(),
                ]);

                if (!received || !sent) {
                    throw new Error("Failed to load message lists.");
                }

                const allMessages = [...received, ...sent];

                const partnerIds = new Set();

                // filter unique IDs from all messages
                for (const message of allMessages) {
                    if (message.senderId === currentUserId) {
                        partnerIds.add(message.receiverId);
                    } else if (message.receiverId === currentUserId) {
                        partnerIds.add(message.senderId);
                    }
                }

                setPartners(Array.from(partnerIds));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAndNormalizeMessages();
    }, [currentUserId]);

    return { partners, loading, error };
}
