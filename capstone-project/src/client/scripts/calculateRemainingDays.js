const calculateRemainingDays = date => {
    const daysDiff = new Date(date) - new Date();
    let remainingDays = new Date(daysDiff) / (24 * 3600 * 1000);
    remainingDays = Number(Math.ceil(remainingDays)) + 1;
    return remainingDays;
};

export { calculateRemainingDays };
