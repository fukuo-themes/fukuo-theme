if (window.matchMedia("(min-width: 960px)").matches) {
    const hash = window.location.hash;
    const scrollbar = Scrollbar.init(document.querySelector('#my-scrollbar'), {
        continuousScrolling: false,
        alwaysShowTracks: false,
        damping: 0.1,
        plugins: {}
    });
    if (hash) {
        const target = document.getElementById(hash.substring(1));
        if (target) {
            scrollbar.scrollIntoView(target, {
                offsetTop: -scrollbar.containerEl.scrollTop,
            });
        }
    }

    // For opening link in the same page
    window.addEventListener('hashchange', function () {
        const hash = window.location.hash;
        if (hash) {
            const target = document.getElementById(hash.substring(1));
            if (target) {
                scrollbar.scrollIntoView(target, {
                    offsetTop: -scrollbar.containerEl.scrollTop,
                });
            }
        }
    }, false);
}