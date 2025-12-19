import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import convertDate from "../utils/convertDate";

export default function Message({
    id,
    senderId,
    text,
    createdAt,
    currentUserId,
    handleRightClick,
    mode,
    resetMode,
    onAction,
}) {
    const { editMessage, deleteMessage } = useAPI();

    async function handleDelete(messageId) {
        await deleteMessage(messageId);
        onAction();
    }

    return (
        <>
            <MessageDiv
                $isSender={currentUserId === senderId}
                onContextMenu={(e) => handleRightClick(e)}
            >
                <MessageText>{text}</MessageText>
                <MessageDate>{convertDate(createdAt)}</MessageDate>
                {mode === "delete" && (
                    <DeleteActionBox>
                        <p>Delete this comment?</p>
                        <button type="button" onClick={() => handleDelete(id)}>
                            Yes
                        </button>
                        <button type="button" onClick={() => resetMode()}>
                            No
                        </button>
                    </DeleteActionBox>
                )}
            </MessageDiv>
        </>
    );
}

const MessageDiv = styled.div`
    padding: 0.5rem;
    background-color: ${(props) => (props.$isSender ? "#1b611e" : "#686909")};
    border-radius: 5px;
    max-width: max-content;
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.$isSender ? "flex-end" : "flex-start")};
    align-self: ${(props) => (props.$isSender ? "flex-end" : "flex-start")};
    word-break: break-word;
`;

const MessageText = styled.p``;

const MessageDate = styled.p`
    color: #b1b1b1;
    font-size: 0.7rem;
`;

const DeleteActionBox = styled.div`
    margin-top: 5px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 0.8rem;

    button {
        margin: 5px;
        cursor: pointer;
        background-color: #252525;
        color: white;
        border-radius: 3px;
    }
`;
