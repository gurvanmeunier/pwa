import React, { useState, useContext } from "react";
import BookmarksContext from "../BookmarksContext";
import { Link } from "react-router-dom";
const Home = () => {
    // On utilise un state pour garder nos données
    const [games, setGames] = useState([
        { id: 1, name: "Jeux 1", rating: 4.6 },
        { id: 2, name: "Jeux 2", rating: 3.5 },
        { id: 3, name: "Jeux 3", rating: 4.2 },
        { id: 4, name: "Jeux 4", rating: 1.5 },
        { id: 5, name: "Jeux 5", rating: 3.7 },
        { id: 6, name: "Jeux 6", rating: 5 },
    ]);
    const [searchText, setSearchText] = useState('');
    const { bookmarks, setBookmarks } = useContext(BookmarksContext);

    const handleSearch = (e) => {
        e.preventDefault();
        // const apiKey = 'fa82dee75ce642389717e874e933c813';
        // const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`;
        const url = `/games-api-fallback/games/`;
        fetch(url)
            .then(response => response.json())
            .then(data => { setGames(data.results) })
            .catch(() => { alert('Une erreur est survenue') })
    }
    const findBookmarks = (id) => {
        bookmarks.find(item => item.id == id);
    }
    const toggleBookmarks = (index) => {
        const tmpBookmarks = [...bookmarks]; // On créé une copie de bookmarks

        tmpBookmarks.splice(index, 1); // On supprime 1 entrée à partir de l'index
        setBookmarks(tmpBookmarks); // On met à jour le state avec le nouveau tableau
    }

    return (
        <>
            <form className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl" onSubmit={handleSearch} >
                {/* <form className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl"> */}
                <input type="text"
                    className="form-control"
                    autoFocus={true}
                    onInput={e => { setSearchText(e.target.value) }}
                    value={searchText}
                    placeholder='Rechercher' />
                {/* <input type="text" className="rounded-l border border-gray-500 flex-grow px-4 py-2" autoFocus={true} placeholder="Rechercher" /> */}
                <button type="submit" className="bg-blue-700 rounded-rtext-white px-4 py-2">Rechercher</button>
            </form>
            {/* Ajoutons notre liste */}
            <Link to={'/bookmarks'}>Favoris</Link>
            <Link to={'/shop'}>Mon Shop</Link>
            <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
                {games.map(game => (
                    <li className="py-2 px-4 border-b border-gray-500 flex" key={game.id}>
                        <div onClick={() => { toggleBookmarks() }}>✡</div>
                        <Link to={`/details/${game.slug}`} className="flex">
                            <img src={game.background_image} alt={game.name} className="w-24 pr-2" />
                            <div className="text-2xl font-bold flex-grow">{game.name}</div>
                            <div>{game.rating}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
export default Home;