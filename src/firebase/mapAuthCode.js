export function mapAuthCode(authCode) {
    switch(authCode) {
        case "auth/weak-password":
            return "Password must be 6 characters long";
        case "auth/invalid-email":
            return "Email provided is invalid";
        case "auth/email-already-in-use":
            return "The provided email is already in use";
        case "auth/wrong-password":
            return "Password provided is wrong";
        case "auth/user-not-found":
            return "User does not exist";
        default: 
            return "";
    }
}