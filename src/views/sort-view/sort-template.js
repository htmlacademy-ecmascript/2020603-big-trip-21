import { SORT_OPTIONS } from '../../const.js';

export function createTemplate(currentSortType) {
  const buttonsTemplate = SORT_OPTIONS.map((option) => {
    const { name, isDisable } = option;
    return /*html*/`
      <div class="trip-sort__item  trip-sort__item--${name}">
        <input class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
          id="sort-${name}"
          value="sort-${name}"
          data-sort-name="${name}"
          ${isDisable ? 'disabled' : ''}
          ${option.name === currentSortType ? 'checked' : ''}
          >
        <label class="trip-sort__btn" for="sort-${name}">
          ${name}
        </label>
      </div>
    `;
  }).join('');

  return /*html*/`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${buttonsTemplate}
    </form>
  `;
}
