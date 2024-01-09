import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from '@mui/material';
import DOMPurify from 'dompurify';
import './../styles/topbar.css';

const BASE_URL = 'https://notetakingbackend-3r0f.onrender.com';

export const TopBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState('oldest');
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedSortOption(selectedOption);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchValue(query);
    setFilteredNotes(filterNotes(notes, query, selectedSortOption));
  };

  const filterNotes = (allNotes, query, sortOrder) => {
    let filteredNotes = [...allNotes];

    if (query) {
      filteredNotes = filteredNotes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (sortOrder === 'oldest') {
      filteredNotes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      filteredNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filteredNotes;
  };

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/allnote`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: { sortOrder: selectedSortOption },
      });

      if (response.status === 200) {
        const allNotes = response.data.allnotes;
        setNotes(allNotes);

        setFilteredNotes(filterNotes(allNotes, searchValue, selectedSortOption));
      } else {
        console.error('API request was not successful. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    init();
  }, [selectedSortOption]);

  useEffect(() => {
    setFilteredNotes(filterNotes(notes, searchValue, selectedSortOption));
  }, [searchValue, selectedSortOption]);

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    setFilteredNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
  };

  return (
    <>
      <div className="top-bar">
        <div className="profile">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile"
          />
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search notes"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter">
          <select value={selectedSortOption} onChange={handleSortChange}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '13px',
          paddingBottom: '20px',
        }}
      >
        {filteredNotes.map((note) => (
          <Note key={note._id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </>
  );
};

function Note({ note, onDelete }) {
  const sanitizedContent = DOMPurify.sanitize(note.description);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const noteId = note._id;
      console.log('Deleting note with ID:', noteId);
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`${BASE_URL}/user/deletenote/${noteId}`, {
        headers: headers,
      });
      onDelete(note._id);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10,
        width: 300,
        height: 200,
        padding: 20,
        border: '1px solid #d0d0d0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        backgroundColor: note.color,
      }}
    >
      <Typography textAlign={'center'} variant="h5" style={{ fontSize: 18, fontWeight: 'bold' }}>
        {note.title}
      </Typography>
      <Typography
        textAlign={'center'}
        style={{ marginTop: 35, overflow: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: 'yellow', color: 'black' }}
          onClick={() => {
            navigate("/readnote/" + note._id);
          }}
        >
          open
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: 'yellow', color: 'black' }}
          onClick={() => {
            navigate("/notes/" + note._id);
          }}
        >
          update
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: 'yellow', color: 'black' }}
          onClick={handleDelete}
        >
          delete
        </Button>
      </div>
    </Card>
  );
}
