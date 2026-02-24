$(document).ready(function(){
  addNews();
});

function addNews() {
  const news_urls = [
    { url: "https://raw.githubusercontent.com/openfunltd/news/refs/heads/main/lawtrace/latest.json", source: "lawtrace" },
    { url: "https://raw.githubusercontent.com/openfunltd/news/refs/heads/main/lyapi/latest.json", source: "lyapi" },
    { url: "https://raw.githubusercontent.com/openfunltd/news/refs/heads/main/openfun/latest.json", source: "openfun" }
  ];
  const requests = news_urls.map(item => $.getJSON(item.url));
  $.when(...requests).done(function(...responses) {
    const allNews = responses.map((res, idx) => {
      const data = res[0];
      const source = news_urls[idx].source;

      return data.map(obj => ({
        ...obj,
        source: source
      }));
    });
    const mergedNews = allNews.flat().sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    const latest5News = mergedNews.slice(0, 5);
    latest5News.forEach(news => {
      renderNews(news);
    });
  })
  /*
  .fail(function(err) {
    console.error("Failed to fetch data:", err);
  });
  */
}

function renderNews(news) {
  let color = '';
  let type = '';
  if (news.source === 'lawtrace') {
    color = 'tag--green';
    type = 'lawtrace';
  }
  if (news.source === 'lyapi') {
    color = 'tag--yellow';
    type = 'lyapi';
  }
  if (news.source === 'openfun') {
    color = 'tag--blue';
    type = 'openfun';
  }

  const itemTemplate = `
      <div class="item">
        <div class="type">
          <span class="tag ${color}">
            ${type}
          </span>
        </div>
        <div class="date">
          <span class="material-symbols-rounded">
            date_range
          </span>
          ${news.date}
        </div>
        <div class="desc">
          <a href="${news.link}" target="_blank">${news.title}</a>
        </div>
      </div>
  `;

  $('.news-list').append(itemTemplate);
}
