import React, { useState, useEffect } from 'react';
import { TextField, Button } from "@mui/material";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import DOMPurify
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill editor's styles
// import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { updateNote } from '../actions/noteActions'; 

export const Note = () => {
  const { noteId } = useParams(); // Define noteId only once

  const [data, setData] = useState({});

  const sanitizeHTML = (html) => {
    const cleanHTML = DOMPurify.sanitize(html);
    return { __html: cleanHTML };
  };

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/getnotedata/${noteId}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      const noteData = response.data.notedata;
      setTitle(noteData.title);
      setDescription(noteData.description);
      setLink(noteData.link);
      setData(response.data);
      console.log(noteData.link);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [noteId]);


  const modules = {
    toolbar: [
        [{header: "1"}, {header: "2"}, {font: []}],
        [{list: "ordered"}, {list: "bullet"}],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{align: []}],
        [
            {color: ["red", "yellow", "green", "blue"]},
            {background: ["red", "yellow", "green", "blue"]},
        ],
        ["link"],
        ["image", "video"],
        ["clean"],
    ],
};

  const handleVideoUpload = (event) => {
    setLink(URL.createObjectURL(event.target.files[0]));
  };

    const handleUpdateNote = () => {
    dispatch(updateNote(noteId, title, description, link));
    alert('Note updated!');
    navigate('/');
  };

  return (
    <div className="create-note">
      <div className="note-input">
        <TextField
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="Title"
          multiline
          fullWidth
        />
      </div>
      <div className="note-input">
        <ReactQuill
          theme='snow'
          value={description}
          onChange={(value) => {
            setDescription(value);
          }}
          modules={modules}
        />
      </div>
      <div className="note-input">
        <input type="file" onChange={handleVideoUpload}/>
      </div>
      <Button

        onClick={handleUpdateNote}
      >
        Submit
      </Button>
    </div>
  );
};