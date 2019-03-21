import { FETCH_SCREENSHOT_URL } from '../actions/types';

export default function screenshotReducer(state = '', action) {
  switch (action.type) {
    case FETCH_SCREENSHOT_URL:
      return action.payload;
    default:
      return state;
  }
}
