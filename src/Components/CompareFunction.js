
export const getShowFunction = (value) =>{
    switch (value){
        case 1:
            return a => (Date.now() - Date.parse(a.dateEnd))/60*3600 > 24;
        case 2:
            return a => (Date.now() - Date.parse(a.dateEnd))/60*3600 > 24 * 2;
        case 3:
            return a => (Date.now() - Date.parse(a.dateEnd))/60*3600 > 24 * 7;
        case 4:
            return a => (Date.now() - Date.parse(a.dateEnd))/60*3600 > 24 * 30;
        default:
            return a => (Date.now() - Date.parse(a.dateEnd))/60*3600 > 24 * 365;
    }
}

export const getSortFunction = (value) =>{
    switch (value){
        case 1:
            return (a, b) => (Date.parse(a.dateStart) > Date.parse(b.dateStart)) ? 1 : (Date.parse(a.dateStart) < Date.parse(b.dateStart)) ? -1 : 0;
        case 2:
            return (a, b) => (Date.parse(a.dateEnd) > Date.parse(b.dateEnd)) ? 1 : (Date.parse(a.dateEnd) < Date.parse(b.dateEnd)) ? -1 : 0;
        case 3:
            return (a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0;
        case 4:
            return (a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0;
        default:
            return (a, b) => (a > b) ? 1 : (a < b) ? -1 : 0;
    }
}
