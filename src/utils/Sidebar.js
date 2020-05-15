const openSidebar = () => {
    if(document.documentElement.clientWidth <= 850) {
        document.getElementById("mySidenav").style.width = "100vw";
        document.querySelector(".main-content").style.marginLeft = "100vw";
        document.querySelector('.burger').style.display = 'none';
    }
    else {
        document.getElementById("mySidenav").style.width = "18vw";
        document.querySelector(".main-content").style.marginLeft = "18vw";
        document.querySelector(".main-content").style.width = "82vw";
        document.querySelector(".navbar").style.width = "82vw";
        document.querySelector('.burger').style.display = 'none';
    }
}

const closeSidebar = () => {
    document.querySelector("#mySidenav").style.width = "0";
    document.querySelector(".main-content").style.marginLeft = "0";
    document.querySelector(".main-content").style.width = "100vw";
    document.querySelector(".navbar").style.width = "100vw";
    document.querySelector('.burger').style.display = 'block';
}

export { openSidebar, closeSidebar };