import { lread } from "../middleware/localStorage";

const usersURL = `https://frigid-fox.herokuapp.com/v1/users`;

const fetchUser = async (endpoint, uid) => {
    var response;
    try {
        response = await fetch (
            `${usersURL}/${endpoint}`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: `app@book.club`,
                    password: `android@superUser`,
                    _id: uid ? uid : lread('bkclbSid') ? lread('bkclbSid').split(',')[0] : null
                })
            }
        );

        if (response.ok) {
            var fetchedUsers = await response.json();
            return fetchedUsers;
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

const updateUser = async ({ email, password, name }) => {
    var response;
    try {
        response = await fetch (
            `${usersURL}/me`, 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: `app@book.club`,
                    password: `android@superUser`,
                    _id: lread('bkclbSid') ? lread('bkclbSid').split(',')[0] : null,
                    updated: {
                        email,
                        password,
                        name
                    }
                })
            }
        );

        if (response.ok) {
            var updatedUser = await response.json();
            return updatedUser;
        }
        else {
            console.log(await response.json())
            return null;
        }
    }
    catch(error) {
        console.log(error);
        return null;
    }
}

export { fetchUser, updateUser };