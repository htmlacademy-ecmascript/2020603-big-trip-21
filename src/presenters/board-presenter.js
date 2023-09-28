import { RenderPosition, remove, render } from '../framework/render.js';
import { DEFAULT_FILTER_OPTION, DEFAULT_SORT_OPTION, SORT_OPTIONS, TimeLimit, UpdateType, UserAction, Mode } from '../const.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ListView from '../views/points-view/list-view.js';
import NoPointsView from '../views/points-view/no-points-view.js';
import SortView from '../views/sort-view/sort-view.js';
import LoadingView from '../views/loading-view/loading-view.js';
import NewPointButtonView from '../views/button-view/new-point-button-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #headerContainer = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #listComponent = new ListView();
  #noPointsComponent = new NoPointsView();
  #sortingComponent = null;
  #loadingComponent = new LoadingView();
  #newPointButtonComponent = null;

  #pointsPresenters = new Map();
  #newPointPresenter = null;

  #currentSortOption = DEFAULT_SORT_OPTION;
  #pointEditingId = null;
  #isLoading = false;
  #isCreating = false;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ boardContainer, headerContainer, pointsModel, offersModel, destinationsModel, filterModel }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;

    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#isLoading = true;
  }

  get points() {
    const points = this.#pointsModel.points;
    const filterOption = this.#filterModel.currentOption;
    const filteredPoints = points.filter(filterOption.filterCb);

    return filteredPoints.sort(this.#currentSortOption.sortCb);
  }

  init() {
    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#handleNewEventButtonClick
    });
    render(this.#newPointButtonComponent, this.#headerContainer);
    this.#renderBoard();
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#disableNewPointButton(true);
      render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);

      return;
    }

    if(this.#pointsModel.isFailed || this.#offersModel.isFailed || this.#destinationsModel.isFailed) {
      this.#disableNewPointButton(true);
      this.#renderNoPoints();

      return;
    }

    this.#disableNewPointButton(false);
    render(this.#listComponent, this.#boardContainer);

    this.#newPointPresenter = new NewPointPresenter({
      pointsListContainer: this.#listComponent.element,
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy,
    });

    if (this.points.length === 0 && !this.#isCreating) {
      const currentFiltration = this.#filterModel.currentOption;
      this.#renderNoPoints(currentFiltration.noPointsMessage);

      return;
    }

    this.#renderSorting();
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #disableNewPointButton(isDisable) {
    this.#newPointButtonComponent.element.disabled = isDisable;
  }

  #renderNoPoints(message) {
    this.#noPointsComponent.setMessage(message);
    render(this.#noPointsComponent, this.#boardContainer);
  }

  #renderSorting() {
    this.#sortingComponent = new SortView({
      currentOptionName: this.#currentSortOption.name,
      onOptionChange: this.#handleSortOptionChange
    });
    render(this.#sortingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#listComponent.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #clearBoard(resetSortType = false) {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#noPointsComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortOption = DEFAULT_SORT_OPTION;
    }
  }

  #createPoint() {
    this.#isCreating = true;
    this.#handleSortOptionChange();
    this.#filterModel.setOption(UpdateType.MAJOR, DEFAULT_FILTER_OPTION.name);
    this.#newPointPresenter.init();
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenters.get(update.id).setSaving();
        this.#pointEditingId = null;
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        this.#pointEditingId = null;
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenters.get(update.id).setDeleting();
        this.#pointEditingId = null;
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
      default:
        throw new Error('There are no such actionType');
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      default:
        throw new Error('There are no such updateType');
    }
  };

  #handleModeChange = (id, mode) => {
    if (mode === Mode.DEFAULT) {
      this.#pointEditingId = null;
      return;
    }
    this.#newPointPresenter.destroy();

    if (this.#pointEditingId !== null) {
      this.#pointsPresenters.get(this.#pointEditingId).closeForm();
    }

    this.#pointEditingId = id;
  };

  #handleSortOptionChange = (sortOptionName = DEFAULT_SORT_OPTION.name) => {
    const sortOption = SORT_OPTIONS.find((option) => option.name === sortOptionName);

    if (this.#currentSortOption === sortOption) {
      return;
    }

    this.#currentSortOption = sortOption;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleNewPointDestroy = () => {
    this.#disableNewPointButton(false);
    this.#isCreating = false;

    if (this.points.length === 0) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  #handleNewEventButtonClick = () => {
    this.#createPoint();
    this.#disableNewPointButton(true);
    this.#pointEditingId = null;
  };
}
