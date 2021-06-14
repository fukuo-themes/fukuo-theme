// const dataUrl =
//     "https://docs.google.com/spreadsheets/d/e/2PACX-1vTeembzbicy7RsaWmbGamypI-EpPqeGh9HTDXUMwlqa_34Ydgb8wLIiiux3g6Zpxy9cIhF6kJbk2lvh/pub?output=csv";

const apiToken = "keydEyA0z3OGCiDwV" // use your own key!
const airTableApp = "appm1j4xwzPHPmA79"
const airTableName = "Data"

Vue.component('popup', {
    template: '#popup',
    props: ["data"],
    mounted: function () {
        this.slider();
    },
    methods: {
        closepopup: function () {
            app.popup = false;
            document.documentElement.style.overflow = "auto"
        },
        slider: function () {
            const img = tns({
                container: '.wrapper__preview--img',
                items: 1,
                slideBy: 'page',
                autoplay: true,
                controls: true,
                navContainer: "#customize-thumbnails",
                navAsThumbnails: true,
                lazyload: true,
                loop: false,
                autoplay: false,
                controlsText: [
                    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>',
                    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=1 stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>',
                ],
            });
        },
    }
})

const app = new Vue({
    el: "#main",
    data: function () {
        return {
            popup: false,
            id: 1,
            // data: [],
            items: [],
            loading: false
        };
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.items = [];
            this.loading = true;

            axios.get(`https://api.airtable.com/v0/${airTableApp}/${airTableName}?sort%5B0%5D%5Bfield%5D=Id&sort%5B0%5D%5Bdirection%5D=asc`,
                { headers: { Authorization: "Bearer " + apiToken } })
                .then((response) => {
                    this.loading = false;
                    // load the API response into items for datatable
                    // this.items = response.data.records.map((item) => {
                    //     return {
                    //         id: item.id,
                    //         ...item.fields
                    //     }
                    // })
                    let a = []
                    let tempResult = []
                    response.data.records.forEach((e, i) => {
                        if (a.length < 2) {
                            tempResult.push({ ...e, isLeft: true })
                        }
                        else {
                            tempResult.push({ ...e, isLeft: false })
                        }
                        if (a.length === 3) {
                            a = []
                        }
                        else {
                            a.push(i)
                        }
                    });
                    this.items = tempResult;

                    // console.log(this.items);
                }).catch((error) => {
                    console.log(error)
                })

            // Papa.parse(dataUrl, {
            //     download: true,
            //     header: true,
            //     complete: (results) => {
            //         let a = []
            //         let tempResult = []
            //         results?.data.forEach((e, i) => {
            //             if (a.length < 2) {
            //                 tempResult.push({ ...e, isLeft: true })
            //             }
            //             else {
            //                 tempResult.push({ ...e, isLeft: false })
            //             }
            //             if (a.length === 3) {
            //                 a = []
            //             }
            //             else {
            //                 a.push(i)
            //             }
            //         });
            //         this.data = tempResult
            //         console.log(this.data);
            //     }
            // });
        },
        openDetail: function (id) {
            this.id = id;
            this.popup = true;
            document.documentElement.style.overflow = "hidden"
        }
    }
});