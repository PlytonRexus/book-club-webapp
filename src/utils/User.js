const usersURL = `https://frigid-fox.herokuapp.com/v1/users`;

const fetchUser = async (endpoint) => {
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
                    password: `android@superUser`
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

export { fetchUser };