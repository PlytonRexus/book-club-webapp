import { lread } from "../middleware/localStorage";

const createLog = async (issuedTo, book, createdBy) => {
    var response;
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/logs`, {
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

        console.log(response);

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

        console.log(response);

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

        console.log(response);

        if (response.ok) {
            var fetchedLog = await response.json();
            console.log(fetchedLog);
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
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/logs/${lid}`, {
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

        console.log(response);

        if (response.ok) {
            var updatedLog = await response.json();
            console.log(updatedLog);
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