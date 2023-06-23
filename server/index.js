const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//


//create a song
app.post("/songs", async (req, res) => {
  try {
    const { era, name, notes, dateLeaked, type, currentlyAvailable, isCirculating, links } = req.body;

    const query = `
      INSERT INTO songs (era, name, notes, date_leaked, type, currently_available, is_circulating, links)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [era, name, notes, dateLeaked, type, currentlyAvailable, isCirculating, links];

    const client = await pool.connect();
    const result = await client.query(query, values);

    client.release();

    const createdSong = result.rows[0];
    res.status(201).json(createdSong);
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get all songs
app.get("/songs", async (req, res) => {
  try {
    const allSongs = await pool.query("SELECT * FROM songs");
  } catch (err) {
    console.error(err.message);
  }
});

// get a song
app.get('/songs/:id', async (req, res) => {
  try {
    const songId = req.params.id;

    const query = `
      SELECT * FROM songs
      WHERE songs_id = $1;
    `;
    const values = [songId];

    const client = await pool.connect();
    const result = await client.query(query, values);

    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Song not found' });
    } else {
      const song = result.rows[0];
      res.status(200).json(song);
    }
  } catch (error) {
    console.error('Error retrieving song:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// update a song
app.put('/songs/:id', async (req, res) => {
  try {
    const songId = req.params.id;
    const { era, name, notes, dateLeaked, type, currentlyAvailable, isCirculating, links } = req.body;

    const query = `
      UPDATE songs
      SET era = $1, name = $2, notes = $3, date_leaked = $4, type = $5, currently_available = $6, is_circulating = $7, links = $8
      WHERE songs_id = $9
      RETURNING *;
    `;
    const values = [era, name, notes, dateLeaked, type, currentlyAvailable, isCirculating, links, songId];

    const client = await pool.connect();
    const result = await client.query(query, values);

    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Song not found' });
    } else {
      const updatedSong = result.rows[0];
      res.status(200).json(updatedSong);
      res.json("Song was updated!")
    }
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete song
app.delete('/songs/:id', async (req, res) => {
  try {
    const songId = req.params.id;

    const query = `
      DELETE FROM songs
      WHERE songs_id = $1
      RETURNING *;
    `;
    const values = [songId];

    const client = await pool.connect();
    const result = await client.query(query, values);

    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Song not found' });
    } else {
      const deletedSong = result.rows[0];
      res.status(200).json(deletedSong);
      res.json("Song was deleted!");
    }
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});