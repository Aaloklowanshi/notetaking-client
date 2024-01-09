// actions/noteActions.js
import axios from "axios";
import {
  NOTE_ADD_REQUEST,
  NOTE_ADD_SUCCESS,
  NOTE_ADD_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_FAIL,
} from "./../constants/noteConstants";

const BASE_URL = 'https://notetakingbackend-3r0f.onrender.com';

export const addNote = (title, description, link, selectedColor) => async (dispatch) => {
  try {
    dispatch({ type: NOTE_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios.post(
      `${BASE_URL}/user/addnote`,
      {
        title,
        description,
        link,
        selectedColor,
      },
      config
    );

    dispatch({ type: NOTE_ADD_SUCCESS });
  } catch (error) {
    dispatch({
      type: NOTE_ADD_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const updateNote = (noteId, title, description, link) => async (dispatch) => {
  try {
    dispatch({ type: NOTE_UPDATE_REQUEST });

    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.put(`${BASE_URL}/user/notes/${noteId}`, {
      title,
      description,
      link,
    }, {
      headers,
    });

    dispatch({ type: NOTE_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: NOTE_UPDATE_FAIL,
      payload: error.response
        ? error.response.data.message
        : error.message,
    });
  }
};
