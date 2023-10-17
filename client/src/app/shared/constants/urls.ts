import { environment } from "../../../environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:3000';

export const FOODS_URL = BASE_URL + '/food';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOOD_BY_ID_URL = FOODS_URL + '/';


export const USER_LOGIN_URL = BASE_URL + '/auth/login';
export const USER_REGISTER_URL = BASE_URL + '/user/register';


export const ORDERS_URL = BASE_URL + '/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';
export const ORDER_PAYED_URL = ORDERS_URL + '/payed';
export const ORDER_DELETE_PAYED_URL = ORDERS_URL + '/payed/';