import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";
import watchDroneLoad from "./Drone";

export default [...ApiErrors, ...WeatherSagas, ...watchDroneLoad];
