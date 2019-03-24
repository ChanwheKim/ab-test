import { ADD_SELECTED_PAGE, REMOVE_SELECTED_PAGE } from '../actions/types';

export default function selectedPageReducer(state = [], action) {
  switch (action.type) {
    case ADD_SELECTED_PAGE:
      return [
        ...state,
        action.payload,
      ];
    case REMOVE_SELECTED_PAGE:
      return [];
    default:
      return state;
  }
}
