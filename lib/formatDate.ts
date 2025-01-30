export function formatDate(date: Date) {
    const months = [
        "jan", "feb", "mar", "apr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dec"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
}
