const username = "fukuo";
const tags = "blog";
const apiKey = "EygUfFKmzfMHjUFCtqLwa3K6i8SGLJsiiozHyPEWNFfRrb6O4W";
const url = `https://api.tumblr.com/v2/blog/${username}.tumblr.com/posts/?api_key=${apiKey}&tag=${tags}`;
const container = document.getElementsByClassName('homepage__blog')[0];

console.log(url);

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

        for (let i = 0; i < 2; i++) {
            let posts = read.posts[i];
            let {
                date,
                note_count,
                title,
                is_pinned,
                type,
                body,
                post_url,
                photos,
                caption,
                trail: [
                    {
                        blog: { name: username },
                    },
                ]
            } = posts;



            /*
            photos: [
                    {
                        original_size: {
                            url: photo_url
                        }
                    }
                ]
            */

            const article = document.createElement("div");
            article.className = 'cards';
            if (type == "text") {
                article.innerHTML = `
                <div class="cards__inner">
                    <div class="cards__info">
                        <img src="https://api.tumblr.com/v2/blog/${username}.tumblr.com/avatar/96" alt="${username}">
                        <span>Posted by <a href="https://${username}.tumblr.com/">${username}</a></span>
                    </div>
                    <h2>${title}</h2>
                    <div class="cards__body">
                        ${body}
                    </div>
                    <a class="cards__button" href="${post_url}" target="_blank">Read more <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
                </div>
                `;
            } else if (type == "photo") {
                article.innerHTML = `
                <figure class="cards__photo">
                </figure>
                <div class="cards__inner">
                    <div class="cards__body">
                        ${caption}
                    </div>
                    <a class="cards__button" href="${post_url}" target="_blank">Read more <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
                </div>
                `;
            }

            truncate(article.querySelector('.cards__body'), 50, '...');
            container.appendChild(article);

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

            const tumblr_blog = document.querySelectorAll(".tumblr_blog");
            for (let j = 0; j < tumblr_blog.length; j++) {
                tumblr_blog[j].parentNode.parentNode.removeChild(tumblr_blog[j].parentNode);
            }
        } // end of response 

        const container_more = document.createElement("div");
        container_more.className = "homepage__blog--more";
        container_more.innerHTML = `
        <a class="cards__button is--secondary" href="/blog" target="_blank">View more on the blog section <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M7 17l9.2-9.2M17 17V7H7"></path></svg></a>
        `
        document.querySelector(".homepage__blog").appendChild(container_more);
    }).catch(err => console.error(err));