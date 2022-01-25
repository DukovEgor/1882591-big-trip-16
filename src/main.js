import { generatePoint } from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';

const MOCK_COUNTER = 20;
const mockArray = Array.from({ length: MOCK_COUNTER }, generatePoint);


const tripPresenter = new TripPresenter(mockArray);

tripPresenter.init();

export { mockArray };
