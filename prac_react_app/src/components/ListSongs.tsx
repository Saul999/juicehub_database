import React, { Fragment, useEffect, useState } from "react";

const ListSongs = () => {
  const getSongs = async () => {
    const [songs, setSongs] = useState([]); // songs is an array of objects
    try {
      const response = await fetch("http://localhost:5000/songs");
      const jsonData = await response.json();

      setSongs(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  console.log(songs);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Era</th>
            <th>Name</th>
            <th>Notes</th>
            <th>DateLeaked</th>
            <th>type</th>
            <th>Currently Available</th>
            <th>IsCirculating</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>*/}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListSongs;
