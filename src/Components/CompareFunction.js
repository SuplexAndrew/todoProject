export const getShowFunction = (value) => {
    switch (value) {
        case 1:
            return a => true;
        case 2:
            return a => Math.abs((Date.now() - Date.parse(a.dateend)) / (3600 * 1000)) <= 24;
        case 3:
            return a => Math.abs((Date.now() - Date.parse(a.dateend)) / (3600 * 1000)) < 24 * 2;
        case 4:
            return a => Math.abs((Date.now() - Date.parse(a.dateend)) / (3600 * 1000)) < 24 * 7;
        case 5:
            return a => Math.abs((Date.now() - Date.parse(a.dateend)) / (3600 * 1000)) < 24 * 30;
        default:
            return a => true;
    }
}

export const getSortFunction = (value) => {
    switch (value) {
        case 1:
            return (a, b) => (a.datestart > b.dateStart) ? 1 :
                (a.dateStart < b.dateStart) ? -1 : 0;
        case 2:
            return (a, b) => (Date.parse(a.dateend) > Date.parse(b.dateend)) ? 1 :
                (Date.parse(a.dateend) < Date.parse(b.dateend)) ? -1 : 0;
        case 3:
            return (a, b) => (Date.parse(a.dateupdate) > Date.parse(b.dateupdate)) ? 1 :
                (Date.parse(a.dateupdate) < Date.parse(b.dateupdate)) ? -1 : 0;
        case 4:
            return (a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0;
        case 5:
            return (a, b) => (a.priority < b.priority) ? 1 : (a.priority > b.priority) ? -1 : 0;
        default:
            return (a, b) => (a > b) ? 1 : (a < b) ? -1 : 0;
    }
}
