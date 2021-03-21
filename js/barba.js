function init() {

    const loader = document.querySelector('.loader');
    gsap.set(loader, {
        scaleX: 0,
        rotation: 10,
        xPercent: -5,
        yPercent: -50,
        transformOrigin: 'left center',
        autoAlpha: 1
    });

    function loaderIn() {
        return gsap.fromTo(loader,
            {
                rotation: 10,
                scaleX: 0,
                xPercent: -5
            },
            {
                duration: 0.8,
                xPercent: 0,
                scaleX: 1,
                rotation: 0,
                ease: 'Power4.inOut',
                transformOrigin: 'left center'
            });
    }

    function loaderAway() {
        return gsap.to(loader, {
            duration: 0.8,
            scaleX: 0,
            xPercent: 5,
            rotation: -10,
            transformOrigin: 'right center',
            ease: 'Power4.inOut'
        });
    }

    barba.hooks.before(() => {
        document.querySelector('html').classList.add('is-transitioning');
        barba.wrapper.classList.add('is-animating');
    });

    barba.hooks.after((data) => {

        document.querySelector('html').classList.remove('is-transitioning');
        barba.wrapper.classList.remove('is-animating');


    });

    barba.hooks.enter(() => {

        window.scrollTo(0, 0);

        const slider = tns({
            container: ".homepage__slider",
            items: 2,
            slideBy: "page",
            loop: false,
            autoplay: false,
            edgePadding: 0,
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
                    "items": 2
                }
            },
            controlsText: [
                '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg> <span>Prev</span>',
                '<span>Next</span> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=1.5 stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>',
            ],
        });

    });

    barba.init({
        transitions: [{
            async leave() {
                await loaderIn();
            },
            enter() {
                loaderAway();
            },
            before: (data) => {
                console.log(data.current);
            }
        }]
    })
}

window.addEventListener('load', function () {
    init();
});