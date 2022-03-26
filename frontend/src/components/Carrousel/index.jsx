import { useEffect, useState } from "react";
import { getMostVisitedPlants } from "../../services/plants.service";
import { LoadingComponent } from "../LoadingComponent";
import Carousel from 'react-grid-carousel'
import { PlantCard } from "../PlantCard";

export function MostViewedCarrousel () {
    const [carrouselArray, setCarrouselArray] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(_ => {
        getMostVisitedPlants().then(res => {
            if (res.error) {
                alert(res.message);
                return 0;
            }
            setCarrouselArray(res.plants);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <LoadingComponent type={'spokes'} />;
    }

    return (
        <>
            <div className="down">
                <h5 className="title-body">Plantas más visitadas</h5>
                <Carousel cols={3} rows={1} gap={10} loop>
                    {carrouselArray.map(plant => (
                        <Carousel.Item key={plant.id}>
                            <PlantCard plant={ plant } />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    );
}