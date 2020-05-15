const timeNow = () => {
    let d = new Date();
    let year = d.getUTCFullYear();
    let month = ("0" + (d.getUTCMonth() + 1)).slice(-2);
    let date = ("0" + d.getUTCDate()).slice(-2);
    let hour = ("0" + d.getUTCHours()).slice(-2);
    let minute = ("0" + d.getUTCMinutes()).slice(-2);
    let seconds = ("0" + d.getUTCSeconds()).slice(-2);
    let timestamp =
        year +
        "-" +
        month +
        "-" +
        date +
        "T" +
        hour +
        ":" +
        minute +
        ":" +
        seconds +
        "Z";
    return timestamp;
};

export { timeNow }