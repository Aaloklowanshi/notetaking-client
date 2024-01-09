// reducers/noteReducer.js
import {
  NOTE_ADD_REQUEST,
  NOTE_ADD_SUCCESS,
  NOTE_ADD_FAIL,

  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_FAIL,

} from "./../constants/noteConstants";

const initialState = {
  adding: false,
  loading: false,
  notes: [],
  error: null,
  updating: false,
  note: null,
  deleting: false,
  deleteError: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTE_ADD_REQUEST:
      return { ...state, adding: true };
    case NOTE_ADD_SUCCESS:
      return { ...state, adding: false };
    case NOTE_ADD_FAIL:
      return { ...state, adding: false, error: action.payload };
      
      case NOTE_UPDATE_REQUEST:
        return { ...state, updating: true };
      case NOTE_UPDATE_SUCCESS:
        return { ...state, updating: false };
      case NOTE_UPDATE_FAIL:
        return { ...state, updating: false, error: action.payload };

    default:
      return state;
  }
};

export default noteReducer;
