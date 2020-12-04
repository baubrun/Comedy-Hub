
export let domain = "http://localhost:5000" 




export const compareDates = (a, b) => {
    let dateA = new Date(a.startDate);
    let dateB = new Date(b.startDate);
    return dateA - dateB;
};



