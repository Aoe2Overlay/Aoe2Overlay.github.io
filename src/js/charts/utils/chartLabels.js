
const createChartLabels = (from, to) => {
    from = from || firstMatchDate();
    to = to || yesterdayDate();
    const labels = [];
    while(from.getTime() < to.getTime()) {
        labels.push(from);
        from = new Date(from);
        from.setDate(from.getDate() + 1);
    }
    return labels;
}

const yesterdayDate = () => {
    const today = new Date()
    today.setHours(0,0,0,0);
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday;
}

const firstMatchDate = () => {
    const date = new Date(2019, 12-1, 4)
    return date;
}

export { createChartLabels };