import { PlantCard } from "../PlantCard";

export default function PlantList({ plants, placeholdImg, waterPlant, editButton, toTopScroll = false }) {

    return (
        <>
            <div className="down-little grid-images">
                { plants.map((plant) => (
                    <PlantCard plant={ plant } key={ plant.id } waterPlant={ waterPlant } editButton={ editButton } placeholdImg={ placeholdImg } />                                     
                )) } 
            </div>
            { toTopScroll && <div className="down flex center">
                <div>
                    <button onClick={ _ => window.scrollTo({ top: 0, behavior: 'smooth' }) } className="btn btn-principal-static">Volver arriba</button>
                </div>
            </div> }
        </>
    );
}