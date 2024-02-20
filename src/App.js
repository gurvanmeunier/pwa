// import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
//import { useState } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import ErrorMessage from './pages/ErrorMessage';
import BookmarksContext from './BookmarksContext';
import Bookmarks from './pages/Bookmarks';


function App() {
  // Création du routeur
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorMessage />,
    },
    {
      path: "/details/:slug",
      element: <Details />,
    },
    {
      path: "/bookmarks",
      element: <Bookmarks />,
    },
  ], { basename: "/" })

  const [bookmarks, setBookmarks] = useState([
    {
      slug: "super-mario-bros-3",
      name: "Super Mario Bros. 3",
      background_image: "https://media.rawg.io/media/screenshots/092/092fc1910f067a95a07c0fbfdbe25f03.jpg"
    },
    {
      slug: "the-legend-of-zelda-the-wind-waker",
      name: "The Legend of Zelda: The Wind Waker",
      background_image: "https://media.rawg.io/media/games/45f/45f6d31b0fcefe029e33d258a7beb6a2.jpg"
    }
  ]);

  return (
    
      <BookmarksContext.Provider value={{bookmarks,setBookmarks}}>
        <RouterProvider router={router}></RouterProvider>
      </BookmarksContext.Provider>
    
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
