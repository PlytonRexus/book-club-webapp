import { lread } from "../middleware/localStorage";
const logsURL = `https://frigid-fox.herokuapp.com/v1/logs`;

const createLog = async (issuedTo, book, createdBy) => {
    var response;
    console.log(book, issuedTo, createdBy);
    try {
        response = await fetch(
            logsURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: `app@book.club`,
                password: `android@superUser`,
                book,
                issuedTo,
                createdBy
            })
        })

        if (response.ok) {
            var createdLog = await response.json();
            return createdLog;
        }
        else {
            return { "message": "Some error occured."};
        }
    }
    catch(error) {
        console.log(error);
    }
}

const fetchLog = async () => {
    var response;
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/logs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            var fetchedLogs = await response.json();
            return fetchedLogs;
        }
        else {
            return null;
        }
    }
    catch(error) {
        console.log(error);
        return null;
    }
}

const fetchLogById = async (id) => {
    var response;
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/logs/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            var fetchedLog = await response.json();
            return fetchedLog;
        }
        else {
            return null;
        }
    }
    catch(error) {
        console.log(error);
        return null;
    }
}

const updateLog = async (lid, { issuedTo, returnedOn, issuedOn }) => {
    var response;
    var url = `https://frigid-fox.herokuapp.com/v1/logs/${lid}`;
    try {
        response = await fetch(
            url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'app@book.club',
                password: 'android@superUser',
                updated: {
                    issuedTo,
                    issuedOn,
                    returnedOn,
                    lastChangedBy: lread('bkclbSid').split(',')[0]
                }
            })
        });

        if (response.ok) {
            var updatedLog = await response.json();
            return updatedLog;
        }
        else {
            return null;
        }
    }
    catch(error) {
        console.log(error);
        return null;
    }
}

export { createLog, fetchLog, fetchLogById, updateLog };