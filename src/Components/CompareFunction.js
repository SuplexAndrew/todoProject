
export const getShowFunction = (value) =>{
    switch (value){
        case 1:
            return a => Math.abs( (Date.now() - a.dateEnd)/(3600*1000)) < 24;
        case 2:
            return a => Math.abs((Date.now() - a.dateEnd)/(3600*1000)) < 24 * 2;
        case 3:
            return a => Math.abs((Date.now() - a.dateEnd)/(3600*1000)) < 24 * 7;
        case 4:
            return a => Math.abs((Date.now() - a.dateEnd)/(3600*1000)) < 24 * 30;
        case 5:
            return a => true;
        default:
            return a => true;
    }
}

export const getSortFunction = (value) =>{
    switch (value){
        case 1:
            return (a, b) => (a.dateStart > b.dateStart) ? 1 : (a.dateStart < b.dateStart) ? -1 : 0;
        case 2:
            return (a, b) => (a.dateEnd > b.dateEnd) ? 1 : (a.dateEnd < b.dateEnd) ? -1 : 0;
        case 3:
            return (a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0;
        case 4:
            return (a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0;
        default:
            return (a, b) => (a > b) ? 1 : (a < b) ? -1 : 0;
    }
}
