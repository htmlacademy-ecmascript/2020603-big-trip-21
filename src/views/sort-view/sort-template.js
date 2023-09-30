import { SORT_OPTIONS } from '../../const.js';

export function createTemplate(currentSortType) {
  const buttonsTemplate = SORT_OPTIONS.map((option) => {
    const { name, sortCb } = option;
    return `
      <div class="trip-sort__item  trip-sort__item--${name}">
        <input class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
          id="sort-${name}"
          value="sort-${name}"
          data-sort-name="${name}"
          ${sortCb ? '' : 'disabled'}
          ${option.name === currentSortType ? 'checked' : ''}
          >
        <label class="trip-sort__btn" for="sort-${name}">
          ${name}
        </label>
      </div>
    `;
  }).join('');

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${buttonsTemplate}
    </form>
  `;
}
