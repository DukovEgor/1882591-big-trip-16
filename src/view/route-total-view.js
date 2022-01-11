const calcTotal = (arr) => {
  const initialValue = 0;
  return arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initialValue
  );
};
export const createRoute = (arr) => (
  `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${arr[0].reachPoint} &mdash; ${arr.length > 3 ? '...' : arr[1].reachPoint} &mdash; ${arr[arr.length - 1].reachPoint}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
</div>

<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${calcTotal(arr)}</span>
</p>
</section>`);
