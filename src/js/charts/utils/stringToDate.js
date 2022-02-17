const stringToDate = (str) => {
    var splited = str.split('-');
    var yyyy = parseInt(splited[0]);
    var mm = parseInt(splited[1]);
    var dd = parseInt(splited[2]);
    return new Date(yyyy, mm-1, dd);
}

export { stringToDate };