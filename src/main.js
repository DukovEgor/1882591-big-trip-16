import { generatePoint } from './mock/point.js';
import PointsModel from './model/points-model.js';
import TripPresenter from './presenter/trip-presenter.js';


const MOCK_COUNTER = 20;
const points = Array.from({ length: MOCK_COUNTER }, generatePoint);

const pointsModel = new PointsModel();
pointsModel.points = points;

const tripPresenter = new TripPresenter(points, pointsModel);

tripPresenter.init();


