export default function Conversations() {
    return (
        <>
            <div>Conversations Page</div>
            <a
                href="/log-in"
                onClick={() => localStorage.removeItem("jwtToken")}
            >
                Log Out
            </a>
        </>
    );
}
