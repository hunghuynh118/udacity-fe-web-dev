// Calculate the remaining days from today to input date
const calculateRemainingDays = date => {
    const daysDiff = new Date(date) - new Date();
    let remainingDays = new Date(daysDiff) / (24 * 3600 * 1000);
    remainingDays = Number(Math.ceil(remainingDays));

    return remainingDays;
};

export { calculateRemainingDays };
