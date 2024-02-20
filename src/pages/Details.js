import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom" ;


const Details = () => {
    const [details, getDetails] = useState('');
    const params = useParams();

    useEffect( () => {
        
        const apiKey = 'fa82dee75ce642389717e874e933c813';
        const url = `https://api.rawg.io/api/games/${params.slug}?key=${apiKey}`;
        fetch(url)
        .then( response => response.json() )
        .then( data => { getDetails(data) } )
        .catch( () => { alert('Une erreur est survenue') } )
    },[params.slug])


    
    return (
        <>
        <div>Ceci est la page du jeu dont le slug est "{params.slug}"</div>
        <h1>{details.name}</h1>
        <img src={details.background_image} alt={details.name} />
        <p>{details.description_raw}</p>
        </>
    )
}
export default Details