import React, { useState , useRef, useMemo} from 'react';
import { Typography, TextField, Button } from "@mui/material";
import "../styles/createnote.css";
import JoditEditor from 'jodit-react';
import axios from 'axios';

export const CreateNote = () => {

 const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');


  const stripHTML = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const handleEditorChange = (content) => {
    // Strip HTML tags from the content
    const plainText = stripHTML(content);
    console.log(plainText)
    setDescription(plainText);
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


<JoditEditor
  ref={editor}
onChange={handleEditorChange}
/>


      </div>
      <div className="note-input">
        <TextField
          value={link}
          onChange={(event) => {
            setLink(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="Write link"
          multiline
          fullWidth
        />
      </div>

      <Button> Submit </Button>
    </div>
  );
};

// export default CreateNote;