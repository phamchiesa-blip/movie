const timeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60); // làm tròn xuống số giờ
    const minnutesReminder = minutes % 60;
    return `${hours}h ${minnutesReminder}m`;
}

export default timeFormat;