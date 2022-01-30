import SmartView from './smart-view';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getStatsData } from '../utils/stats';
import { humanizeTime, sortByDuration, sortByPrice, sortByTypeCount } from '../utils/utils';

const renderMoneyChart = (moneyCtx, sortedByPrice) => {
  const chartLabel = sortedByPrice.map((obj) => obj.type.toUpperCase());
  const chartPrices = sortedByPrice.map((obj) => obj.price);
  return new Chart(moneyCtx, {
    plugins: ChartDataLabels,
    type: 'horizontalBar',
    data: {
      labels: chartLabel,
      datasets: [{
        data: chartPrices,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: true,
      },
    },
  });
};
const renderTypeChart = (typeCtx, sortedByType) => {
  const chartLabels = sortedByType.map((obj) => obj.type.toUpperCase());
  const chartCount = sortedByType.map((obj) => obj.count);
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: chartLabels,
      datasets: [{
        data: chartCount,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
const renderTimeChart = (timeCtx, sortedByDuration) => {
  const chartLabels = sortedByDuration.map((obj) => obj.type.toUpperCase());
  const chartDutation = sortedByDuration.map((obj) => obj.duration);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: chartLabels,
      datasets: [{
        data: chartDutation,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 100,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (ms) => {
            const humanTimeFormat = humanizeTime(ms / 1000);

            let days = '';
            let hours = '';
            let minutes = `${humanTimeFormat[2]}M`;

            if (humanTimeFormat[0] !== 0) {
              days = `${humanTimeFormat[0] < 10 ? '0' : ''}${humanTimeFormat[0]}D`;
            }


            if (humanTimeFormat[1] === 0 && days !== '') {
              hours = '00H';
            }

            if (humanTimeFormat[1] !== 0) {
              hours = `${humanTimeFormat[1] < 10 ? '0' : ''}${humanTimeFormat[1]}H`;
            }

            minutes = `${humanTimeFormat[2] < 10 ? '0' : ''}${humanTimeFormat[2]}M`;

            return `${days} ${hours} ${minutes}`;
          },
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
const createStatsTemplate = () => `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>
  <div class="statistics__item">
    <canvas class="statistics__chart" id="money" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="type" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="time" width="900"></canvas>
  </div>
</section>`;


export default class StatsView extends SmartView {
  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;

  constructor(points) {
    super();

    this._data = points;

    this.#setCharts();
  }

  get template() {
    return createStatsTemplate();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }

    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }
    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  }

  restoreHandlers = () => {
    this.#setCharts();
  }

  #setCharts = () => {
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    const statsData = getStatsData(this._data);

    const sortedByPrice = statsData.sort(sortByPrice);
    const sortedByType = statsData.sort(sortByTypeCount);
    const sortedByDuration = statsData.sort(sortByDuration);

    this.#moneyChart = renderMoneyChart(moneyCtx, sortedByPrice);
    this.#typeChart = renderTypeChart(typeCtx, sortedByType);
    this.#timeChart = renderTimeChart(timeCtx, sortedByDuration);
  }
}
