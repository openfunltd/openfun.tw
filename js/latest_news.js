$(document).ready(function(){
  $.getJSON("https://raw.githubusercontent.com/openfunltd/news/refs/heads/main/lawtrace/latest.json", function(data) {
    data.slice(0, 3).forEach((news) => { addNews('lawtrace', news); });
  });
  $.getJSON("https://raw.githubusercontent.com/openfunltd/news/refs/heads/main/lyapi/latest.json", function(data) {
    data.slice(0, 3).forEach((news) => { addNews('lyapi', news); });
  });
});

function addNews(source, news) {
  let color = '';
  let type = '';
  if (source === 'lawtrace') {
    color = 'tag--green';
    type = 'lawtrace';
  }
  if (source === 'lyapi') {
    color = 'tag--yellow';
    type = 'lyapi';
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
