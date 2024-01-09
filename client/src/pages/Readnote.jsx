import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography } from '@mui/material';
import DOMPurify from 'dompurify'; // Make sure you have installed this library
import './../styles/readnote.css';
import ReactPlayer from 'react-player';

export const Readnote = () => {
  const { noteId } = useParams();
  const [data, setData] = useState({});

  const sanitizeHTML = (html) => {
    const cleanHTML = DOMPurify.sanitize(html);
    return { __html: cleanHTML };
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/getnotedata/${noteId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [noteId]);

  return (
      <div className="container">
        {data.notedata ? (
            <Paper className="note-card">
              <Typography className="title" dangerouslySetInnerHTML={sanitizeHTML(data.notedata.title)} />
              <Typography className="description" dangerouslySetInnerHTML={sanitizeHTML(data.notedata.description)} />
              <ReactPlayer url={data.notedata.link} width="100%" height="100%" controls={true} />
            </Paper>
        ) : (
            <p>Loading...</p>
        )}
      </div>
  );
};
