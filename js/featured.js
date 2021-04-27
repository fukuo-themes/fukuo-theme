const username = "fukuo";
const tags = "blog";
const apiKey = "aFDCUT4lAP4YDwGsS0kaHkywXud3DEkSZ8GlcqtOFJPMGwLp6W";
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

axios.get(url)
    .then((response) => {
        let read = response.data.response;
        console.log(read);

        for (let i = 0; i < 4; i++) {
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

            const article = document.createElement("div");
            article.className = 'cards';
            if (type == "text") {
                article.innerHTML = `
                
                <div class="cards__inner">
                    <div class="cards__info">
                        <div>
                            <img src="https://api.tumblr.com/v2/blog/${username}.tumblr.com/avatar/96" alt="${username}">
                            <span>Posted by <a href="https://${username}.tumblr.com/">${username}</a></span>
                        </div>
                        <div>
                            <ul>
                                <li class="like">
                                    <a href="" aria-label="Like"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></a>
                                </li>
                                <li><a href="https://www.tumblr.com/reblog/${username}/${id_string}/${reblog_key}" aria-label="Reblog"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M17 2.1l4 4-4 4"/><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"/><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"/></svg></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="cards__date">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> <span>${newDate}</span>
                    </div>
                    <h2>${title}</h2>
                    <div class="cards__body">
                        ${body}
                    </div>
                    <a class="cards__button" href="${post_url}" target="_blank">Keep reading <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
                </div>
                `;
            } else if (type == "photo") {
                let { photos: [
                    {
                        original_size: { url: photo_url },
                    },
                ] } = posts;
                article.innerHTML = `
                <figure class="cards__photo">
                    <img src="${photo_url}">
                </figure>
                <div class="cards__inner">
                    <div class="cards__date">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> <span>${newDate}</span>
                    </div>
                    <div class="cards__body">
                        ${caption}
                    </div>
                    <a class="cards__button" href="${post_url}" target="_blank">Keep reading <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
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