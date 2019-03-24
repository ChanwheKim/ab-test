import { FETCH_VISIT_INFO, LOADING_VISIT_INFO } from '../actions/types';

const initialState = {
  isLoading: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VISIT_INFO:
      const visits = action.payload.reduce((list, visit) => {
        if (!list[visit._id]) {
          list[visit._id] = visit;
        }

        return list;
      }, {});

      visits.isLoading = false;

      return visits;
    case LOADING_VISIT_INFO:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
