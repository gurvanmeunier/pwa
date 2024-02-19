import { useParams } from "react-router-dom" ;

const Details = () => {
    const params = useParams();
    
        return (
            <div>Ceci est la page du jeu dont le slug est "{params.slug}"</div>
        )
}
export default Details