window.addEventListener("load", () => {
    let queryLinks = document.querySelectorAll('nav a');

    queryLinks.forEach(elem => {
        if (elem.href === document.location.href) {
            elem.classList.add('active');
        }
    });
});