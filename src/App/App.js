import * as styles from './App.scss';

export class App {

  constructor(options) {
    this.props = {
      dom: null,
      rest: 'test rest',
      ...options // ES6: rest properties
    };
    console.log(this.props);

    this.props.dom.innerHTML = 'Loading from github...';
  }

  render(json) {
    if (json) {
      const trs = json.items.map(item => {
        const row = [
          `<a href="${item.html_url}" target="_blank">${item.full_name}</a>`,
          item.score
        ];

        return `<tr>${row.map(r => `<td>${r}</td>`).join('')}</tr>`;
      }).join('');

      // table
      const table = document.createElement('table');
      table.classList.add(styles.table);

      const caption = '<caption>Popular ES6 projects at github.com</caption>';

      // thead
      const thead = `<thead><tr>${['name', 'correlation'].map(t => `<th>${t}</th>`).join('')}</tr></thead>`;

      // tbody
      const tbody = `<tbody>${trs}</tbody>`;

      table.innerHTML = `${caption}${thead}${tbody}`;

      this.props.dom.innerHTML = '';
      this.props.dom.appendChild(table);
    }
  }

}
