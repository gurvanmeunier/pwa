// import logo from './logo.svg';
import './App.css';

import React, { useState, useRef, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import ErrorMessage from './pages/ErrorMessage';
import BookmarksContext from './BookmarksContext';
import Bookmarks from './pages/Bookmarks';
import MyShop from './pages/MyShop';

function App() {

  const [install, setInstall] = useState(false);
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
    {
      path: "/shop",
      element: <MyShop />,
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

  const deferredPrompt = useRef(null); // Utiliser useRef pour conserverdeferredPrompt à travers les re-rendus
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      deferredPrompt.current = e; // Stocker l'événement dans la propriété.current de la ref
      console.log("Change prompt", deferredPrompt)
      setInstall(true);
    };
    // On place l'eventListener au démarrage
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      // On retire l'eventListener à la fermeture
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);
  const handleInstall = () => {
    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        alert("Merci d'avoir installé l'application !")
      } else {
        console.log('L\'utilisateur a refusé l\'installation');
      }
      deferredPrompt.current = null;
    });
    setInstall(false);
  }

  return (

    <BookmarksContext.Provider value={{ bookmarks, setBookmarks }}>
      {install && (
        <div className="bg-gray-300 shadow-gray-700 p-4 flex items-center">
          <div className='flex-grow text-center'>Voulez-vous installer
            l'application sur votre appareil ?</div>
          <button className="px-4 py-2 rounded text-white bg-teal-600" onClick=
            {handleInstall}>Installer</button>
        </div>
      )}
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
