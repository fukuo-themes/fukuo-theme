const username = "fukuocommissions";
const tags = "posts";
const apiKey = "aFDCUT4lAP4YDwGsS0kaHkywXud3DEkSZ8GlcqtOFJPMGwLp6W";
const container = document.querySelector('.wrapper__blog--inner');

const load_more_container = document.createElement("div");
load_more_container.id = "load_more_container";
const load_more = document.createElement("button");
load_more_container.appendChild(load_more);
load_more.id = "load_more";
load_more.className = "cards__button is--primary"
load_more.innerText = "Load More";

let pageNumbers = 0;
let offSet = 0;
let isShow = false;

let truncate = (element, limit, after) => {
    if (!element || !limit) return;

    let content = element.innerHTML.trim();

    content = content.split(' ').slice(0, limit);
    content = content.join(' ') + (after ? after : '');

    element.innerHTML = content;
};

console.log(`https://api.tumblr.com/v2/blog/${username}.tumblr.com/posts/?api_key=${apiKey}`);

const loadBlog = () => {
    axios.get(`https://api.tumblr.com/v2/blog/${username}.tumblr.com/posts/?api_key=${apiKey}&page_number=${pageNumbers}&offset=${offSet}`)
        .then((response) => {
            let read = response.data.response;
            let totalPosts = read.total_posts;

            console.log(read);

            let query = read?._links?.next;
            const tempPageNumbers = query?.query_params?.page_number;
            const tempOffset = query?.query_params?.offset;

            if (tempPageNumbers) {
                pageNumbers = tempPageNumbers;
            }

            if (tempOffset) {
                offSet = tempOffset;
            }

            if (offSet >= totalPosts) {
                isShow = false;
            } else {
                isShow = true;
            }

            for (let i = 0; i < 6; i++) {
                let posts = read.posts[i];
                let {
                    id_string,
                    date,
                    reblog_key,
                    note_count,
                    title,
                    is_pinned,
                    type,
                    body,
                    post_url,
                    photos,
                    summary,
                    permalink_url,
                    description,
                    question,
                    answer,
                    caption,
                    trail: [
                        {
                            blog: { name: username },
                        },
                    ]
                } = posts;

                const formattedDate = new Date(date);
                // const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const newDate = formattedDate.toLocaleDateString('en', options);

                const article = document.createElement("article");
                article.className = 'posts';
                if (type == "text") {
                    article.innerHTML = `
                <div class="posts__body">
                        <h2>${title}</h2>
                        ${body}
                </div>
                `;
                } else if (type == "link") {
                    article.innerHTML = `
                    <div class="posts__body">
                            <h2>${title}</h2>
                            ${description}
                    </div>`;

                } else if (type == "video") {
                    article.innerHTML = `
                    <div class="posts__body">
                            <iframe width=\"500\" height=\"281\"  id=\"youtube_iframe\" src=\"${permalink_url}" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>

                            ${summary}
                    </div>`;

                }
                else if (type == "photo") {
                    let { photos: [
                        {
                            original_size: { url: photo_url },
                        },
                    ] } = posts;
                    article.innerHTML = `
                        <figure class="posts__photo">
                            <img src="${photo_url}">
                        </figure>
                <div class="posts__body">
                                ${caption}
                </div>
                    `;
                } else if (type == "answer") {
                    article.innerHTML = `
                        < div class="posts__body" >
                            <h2>${question}</h2>
                    ${answer}
                </div >
    `;
                }

                container.appendChild(article);
                if (isShow) {
                    container.appendChild(load_more_container);
                }

                if (is_pinned === true) {
                    article.classList.add("is-pinned");
                }

                // select all the heading
                let actualTitle = article.querySelectorAll("h2");
                for (let g = 0; g < actualTitle.length; g++) {
                    // if the heading on the post contains "null", hide it
                    if (actualTitle[g].textContent === "null") {
                        actualTitle[g].style.display = "none";
                    }
                }

                // const tumblr_blog = document.querySelectorAll(".tumblr_blog");
                // for (let j = 0; j < tumblr_blog.length; j++) {
                //     tumblr_blog[j].parentNode.parentNode.removeChild(tumblr_blog[j].parentNode);
                // }
            } // end of response 
        }).catch(err => console.error(err));
}

loadBlog();
load_more.onclick = () => {
    loadBlog();
}