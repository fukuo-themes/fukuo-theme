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

        for (let k = 1; k <= 4; k++) {
            let posts = read.posts[k];
            let titleArticle = posts.title;

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
                <a class="cards__button" href="${linkArticle}" target="_blank">Read more</a>
            </div>
            `;
            truncate(article.querySelector('.cards__body'), 50, '...');
            container.appendChild(article);

            // select all the heading
            let actualTitle = article.querySelectorAll("h3");
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