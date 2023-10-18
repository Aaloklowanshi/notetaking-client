const mongoose = require("mongoose");
const express = require('express');
const { User, Note } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware")
const { authenticateJwt } = require("../middleware");

const router = express.Router();
// router.post('/addnote', authenticateJwt, async (req, res) => {
//     const userId = req.user.id;
  
//     const newNote = new Note({
//       userId: userId,
//       title: req.body.title,
//       links: req.body.links,
//       description: req.body.description,
//       color: req.body.color, // Include the color property from the request body
//     });
  
//     try {
//       await newNote.save();
  
//       res.json({
//         message: 'Note added successfully',
//         newNote,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: 'Failed to add note',
//         error: error.message,
//       });
//     }
//   });
router.post('/addnote', authenticateJwt , async (req,res) => {
    const userid = req.user.id;
    console.log(userid);

    const newnote = new Note({
        userid : req.user.id,
        title : req.body.title,
        links : req.body.links,
        description : req.body.description
    });
    await newnote.save();
    res.json({
        message : 'Success',
        newnote
    })
});

router.get('/allnote', authenticateJwt, async (req, res) => {
    try {
        const sortOrder = req.query.sortOrder;
        console.log(sortOrder);
        let sortDirection = -1; // Default to descending order (most recent)

        if (sortOrder === 'oldest') {
            sortDirection = 1; // Change to ascending order (oldest)
        }

        const allnotes = await Note.find({ userid: req.user.id }).sort({ createdAt: sortDirection }).exec();

        res.status(200).json({ 
            message: 'All notes retrieved successfully',
            allnotes
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving notes.' });
    }
});


// router.get('/allnote', authenticateJwt, async (req, res) => {
//     const sortOrder = req.query.sortOrder || 'recent';
//     console.log(sortOrder);

//     // const sortingorder;
//     // if(sortOrder==='recent'){
//     //     sortingorder = 1
//     // }
//     // else{
//     //     sortingorder = -1;
//     // }
  
//     let sortOptions = {};
//     sortOptions['createdAt'] = sortOrder === 'recent' ? 1 : -1;
  
//     try {
//       const allnotes = await Note.find({ userid: req.user.id }).sort(sortOptions).exec();
  
//       res.status(200).json({ 
//         message: 'All notes retrieved successfully',
//         allnotes
//       });
//     } catch (error) {
//       res.status(500).json({ error: 'An error occurred while retrieving notes.' });
//     }
//   });


router.delete('/deletenote/:noteId', authenticateJwt, async (req,res) => {
    const noteId = req.params.noteId;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, userid: userId });

    if(!note) {
        return res.status(404).json({
            message : 'Note not found'
        });
    }

    await Note.findByIdAndDelete(noteId);
    res.json({
        message: 'Note deleted successfully',
    });

});


router.put('/notes/:noteId', async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const updatedData = req.body; 

      const updatedNote = await Note.findByIdAndUpdate(noteId, updatedData, { new: true });
  
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


router.get('/getnotedata/:noteId', async (req,res) => {
    try {
        const noteId = req.params.noteId;
        const notedata = await Note.findOne( {_id : noteId} );
        if(!noteId) {
            res.json({
                message : "Id not found for this noteID"
            })
        }
        res.json({
            message : "success",
            notedata
        })
    } catch {
        res.json({
            message : "An error occured"
        })
    }
})

router.post('/setnotecolor', async (req, res) => {
    try {
      const { noteId, color } = req.body;
  
      // Update the note color in your database (replace with your data storage logic).
      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { color: color },
        { new: true } // Return the updated note
      );
  
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json({ message: 'Note color updated successfully', updatedNote });
    } catch (error) {
      console.error('Error updating note color:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// https://gist.github.com/Om-Chhayala/ff890c51b725b9f120fc0a61b8751db8

module.exports = router;