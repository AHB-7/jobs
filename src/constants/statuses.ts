export const STATUSES = [
    "Planing",
    "Applied",
    "Called",
    "Interviewing",
    "Offered",
    "Rejected",
];
export const STATUS_VARIANTS: Record<string, string> = {
    planing: "gray",
    applied: "blue",
    called: "yellow",
    interviewing: "purple",
    offered: "green",
    rejected: "red",
};
export const firebaseErrorMessages: Record<string, string> = {
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password": "Incorrect password",
    "auth/invalid-credential": "Invalid email or password",
    "auth/email-already-in-use": "An account with this email already exists",
    "auth/too-many-requests": "Too many attempts. Please try again later",
    "auth/network-request-failed": "Network error. Check your connection",
};
