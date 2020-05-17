const fetchNotice = async () => {
    var response;
    try {
        response = await fetch(
            `https://frigid-fox.herokuapp.com/v1/notices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response);

        if (response.ok) {
            var fetchedNotices = await response.json();
            return fetchedNotices;
        }
        else {
            return { "message": "Some error occured."};
        }
    }
    catch(error) {
        console.log(error);
    }
}