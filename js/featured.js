const username = "fukuo";
const tags = "posts";
const apiKey = "EygUfFKmzfMHjUFCtqLwa3K6i8SGLJsiiozHyPEWNFfRrb6O4W";

const url = `https://api.tumblr.com/v2/blog/${username}.tumblr.com/posts/text?api_key=` + apiKey;

const container = document.getElementsByClassName('homepage__blog')[0];

// truncate script
let truncate = (element, limit, after) => {
    if (!element || !limit) return;

    let content = element.innerHTML.trim();

    content = content.split(' ').slice(0, limit);
    content = content.join(' ') + (after ? after : '');

    element.innerHTML = content;
};

fetch(url)
    .then(res => res.json())
    .then((data) => {
        let read = data.response;
        console.log(read);

        for (let k = 0; k < 4; k++) {
            let posts = read.posts[k];
            let titleArticle = posts.title;
            let isPinned = posts.is_pinned;

            let bodyArticle = posts.body;
            let linkArticle = posts.post_url;

            const article = document.createElement("div");
            article.className = 'cards';
            article.innerHTML = `
            <div class="cards__inner">
                <h2>${titleArticle}</h2>
                <div class="cards__body">
                    ${bodyArticle}
                </div>
                <a class="cards__button" href="${linkArticle}" target="_blank">Read more <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
            </div>
            `;
            truncate(article.querySelector('.cards__body'), 50, '...');
            container.appendChild(article);

            if (isPinned === true) {
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

            const tumblr_blog = document.querySelectorAll(".tumblr_blog");
            for (let j = 0; j < tumblr_blog.length; j++) {
                tumblr_blog[j].parentNode.parentNode.removeChild(tumblr_blog[j].parentNode);
            }
        } // end of response 
    }).catch(err => console.error(err));