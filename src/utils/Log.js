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

export { createLog };