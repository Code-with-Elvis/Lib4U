const getInitials = (fullName) => {
  const nameParts = fullName ? fullName.split(" ") : "Anonymous D".split(" ");
  const initials =
    nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();
  return initials;
};

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return `Today at ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7)
    return `Last ${date.toLocaleDateString(undefined, { weekday: "long" })}`;

  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 week ago";
  if (weeks < 4) return `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
};

function formatDate(inputDate) {
  const date = new Date(inputDate);

  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }

  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options); // e.g., "Jan 5, 2025"
}

export { getInitials, timeAgo, formatDate };
