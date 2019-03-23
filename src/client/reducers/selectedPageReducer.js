import { ADD_SELECTED_PAGE } from '../actions/types';

export default function selectedPageReducer(state = [], action) {
  switch (action.type) {
    case ADD_SELECTED_PAGE:
      return [
        ...state,
        action.payload,
      ];
    default:
      return state;
  }
}
