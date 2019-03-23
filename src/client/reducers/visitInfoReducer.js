import { FETCH_VISIT_INFOS } from '../actions/types';

export default function modalReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_VISIT_INFOS:
      const visits = action.payload.reduce((list, visit) => {
        if (!list[visit._id]) {
          list[visit._id] = visit;
        }

        return list;
      }, {});

      return visits;
    default:
      return state;
  }
}
