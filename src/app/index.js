import * as styles from './app.scss';

class App {

  constructor(options) {
    const opts = {
      rest: 'test rest',
      ...options
    };

    console.log(opts);
    console.log([1, 2, 3, 4].includes(1));
  }

  render(json) {
    if (json) {
      const trs = json.items.map(item => {
        const row = [
          item.full_name,
          item.score
        ];

        return `<tr>${row.map(r => `<td>${r}</td>`).join('')}</tr>`;
      }).join('');

      // table
      const table = document.createElement('table');
      table.classList.add(styles.table);

      // thead
      const thead = `<thead><tr>${['name', 'score'].map(t => `<th>${t}</th>`).join('')}</tr></thead>`;

      // tbody
      const tbody = `<tbody>${trs}</tbody>`;

      table.innerHTML = `${thead}${tbody}`;
      document.querySelector('.container').appendChild(table);
    }
  }

}

const main = function () {
  const app = new App({
    prop1: 'prop1',
    prop2: 'prop2',
    prop3: 'prop3'
  });

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        const json = JSON.parse(xhr.responseText);
        app.render(json);
      }
    }
  };
  xhr.open('get', '/api/search/repositories?q=es6&sort=stars');
  xhr.send(null);
};

document.addEventListener('DOMContentLoaded', main);
