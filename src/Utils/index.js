
export let domain = "https://com-hub.herokuapp.com" 




export const compareDates = (a, b) => {
    let dateA = new Date(a.startDate);
    let dateB = new Date(b.startDate);
    return dateA - dateB;
};



