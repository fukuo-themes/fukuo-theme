const slider = tns({
    container: ".homepage__slider",
    slideBy: "page",
    loop: false,
    autoplay: false,

    nav: false,
    gutter: 30,
    "responsive": {
        "350": {
            "items": 1,
            "controls": true,
            "edgePadding": 0
        },
        "900": {
            "controls": true,
            "items": 2,
            edgePadding: 0,
            gutter: 40
        }
    },
    controlsText: [
        '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg> <span>Prev</span>',
        '<span>Next</span> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=1 stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>',
    ],
});