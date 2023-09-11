import moment from "moment";
function lastMessageTime(messageTIme:any) {
    const now = moment();
    const messageTime = moment(messageTIme);

    const diffInSeconds = now.diff(messageTime, "seconds");

    let timeAgoMessage;
    if (diffInSeconds < 60) {
        timeAgoMessage = diffInSeconds + " seconds ago";
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        timeAgoMessage = diffInMinutes + " minutes ago";
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        timeAgoMessage = diffInHours + " hours ago";
    }
    else if (diffInSeconds < 172800){
        const diffInHours = Math.floor(diffInSeconds / 86400);
        timeAgoMessage = "Yesterday";
    }else if (diffInSeconds < 2592000) {
        const diffInDays = Math.floor(diffInSeconds / 172800);
        timeAgoMessage = diffInDays + " days ago";
    } else if (diffInSeconds < 31536000) {
        const diffInMonths = Math.floor(diffInSeconds / 2592000);
        timeAgoMessage = diffInMonths + " months ago";
    } else {
        const diffInYears = Math.floor(diffInSeconds / 31536000);
        timeAgoMessage = diffInYears + " years ago";
    }    
    return timeAgoMessage
}
export default lastMessageTime;