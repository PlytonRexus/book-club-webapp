const fetchNotice = async () => {
    var response;
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/notices`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            var fetchedNotices = await response.json();
            return fetchedNotices;
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

const fetchNoticeById = async (id) => {
    var response;
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/notices/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            var fetchedNotice = await response.json();
            return fetchedNotice;
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

const updateNotice = async (nid, title, body, uid) => {
    var response;
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/notices/${nid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'app@Book.club',
                password: 'android@superUser',
                updater: uid,
                notice: {
                    title,
                    body
                }
            })
        });

        if (response.ok) {
            var updatedNotice = await response.json();
            return updatedNotice;
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

const createNotice = async (title, body, uid) => {
    var response;
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/notices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'app@Book.club',
                password: 'android@superUser',
                createdBy: uid,
                notice: {
                    title,
                    body
                }
            })
        });

        if (response.ok) {
            var createdNotice = await response.json();
            return createdNotice;
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

const deleteNotice = async (id) => {
    var response;
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/notices/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'app@Book.club',
                password: 'android@superUser'
            })
        });

        if (response.ok) {
            var fetchedNotice = await response.json();
            return fetchedNotice;
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

export { fetchNotice, fetchNoticeById, updateNotice, createNotice, deleteNotice };