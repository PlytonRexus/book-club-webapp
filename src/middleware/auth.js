import { lread, lremove } from './localStorage';
import { showOverlay, hideOverlay } from '../utils/SidebarAuth';
// import { sread, sremove, swrite } from './sessionStorage';

const profileURL = 'https://frigid-fox.herokuapp.com/v1/users/me';

const auth = () => {
    var sid = lread('bkclbSid');
    if (sid === null || sid === undefined) {
        return false;
    }
    else {
        return true;
    }
}

const signout = () => {
    lremove('bkclbSid');
    return true;
}

const signin = async (email, password) => {
    var response = false;
    try {
        document.querySelector('.alert-area').innerHTML = '...';
        response = await fetch(
            profileURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    }
    catch(error) {
        showOverlay('Try again!');
        setTimeout(() => {
            hideOverlay();
        }, 1000);
        console.log(error);
    }
    console.log(response);

    if (response.ok) {
        window.objUserDetails = await response.json();
        // lwrite('bkclbSid', [window.objUserDetails._id, window.objUserDetails.email]);
        return true;
    }
    else {
        document.querySelector('.alert-area').innerHTML = 'Try again!';
        return false;
    }
}

export { auth, signin, signout };