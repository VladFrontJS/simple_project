// const objCurrensy = { CHF: { name: 'dol' }, EVR: { name: 'evr' } };
// const objLanguage = { qwe: 'eng', asd: 'frans', fgh: 'ital' };

function getObjectValuesInArray(obj) {
    const arr = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                arr.push(obj[key]['name']);
            } else {
                arr.push(obj[key]);
            }
        }
    }
    return arr;
}

export default getObjectValuesInArray;
