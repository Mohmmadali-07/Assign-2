import React, { useEffect, useState } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";

function Home(props) {

    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredGames, setFilteredGames] = useState(games);
    const [selectedPlatform, setSelectedPlatform] = useState("");

  useEffect(() => {
    async function getGames() {
      try {
        const response = await axios.get(
          `https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json`
        );
        setGames(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }

    getGames();
  }, []);

  

  useEffect(() => {
    const filteredGames = games.filter(game => {
      const title = game.title || "";
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedPlatform === "" || game.platform === selectedPlatform)
      );
    });
    setFilteredGames(filteredGames);
  }, [games, searchTerm, selectedPlatform]);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };
  const gameTitles = games.map(game => game.title);


  return (
    <div>
        <input
        type="text"
        placeholder="Search Games"
        value={searchTerm}
        onChange={handleSearchChange}
        onMouseOver={() => {
            const dropdown = document.getElementById("d");
            if (dropdown) {
              dropdown.style.display = "block";
            }
          }}
          onMouseOut={() => {
            const dropdown = document.getElementById("d");
            if (dropdown) {
              dropdown.style.display = "none";
            }
          }}
      />
      <datalist id="game-titles">
        {gameTitles.map(title => (
          <option value={title} key={title} />
        ))}
      </datalist>
      <select value={selectedPlatform} onChange={handlePlatformChange}>

        <option value="">All Platforms</option>
        <option value="PlayStation Vita">PlayStation Vita</option>
        <option value="Xbox 360">Xbox 360</option>
        <option value="iPad">iPad</option>
        <option value="PlayStation 3">PlayStation 3</option>
        <option value="Macintosh">Macintosh</option>
        <option value="PC">PC</option>
        <option value="iPhone">iPhone</option>
        <option value="Nintendo DS">Nintendo DS</option>
        <option value="Android">Android</option>

      </select>
      <table id="d">
        <thead>
          <th>title</th>
          <th> platform</th>
          <th> score</th>
          <th> genre</th>
          <th> editors_choice</th>
        </thead>
        {filteredGames.map((game) => (
          <>
            <tr key={game.title}>
              <td>{game.title}</td>

              <td> {game.platform}</td>
              <td> {game.score}</td>
              <td> {game.genre}</td>
              <td> {game.editors_choice}</td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
}

export default Home;
