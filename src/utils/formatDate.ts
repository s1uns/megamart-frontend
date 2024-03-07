export const formatDate = (inputDate: string) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dateParts = inputDate.split("T")[0].split("-");
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1], 10) - 1;
    const day = dateParts[2];

    const month = months[monthIndex];

    return `${day} ${month} ${year}`;
};
