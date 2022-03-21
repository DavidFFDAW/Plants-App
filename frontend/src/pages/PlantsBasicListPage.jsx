import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { apiURL } from "../constants/config";
import PlantList from "../components/PlantList";
import useAuth from '../hooks/useAuth';
import { LoadingComponent } from "../components/LoadingComponent";
import { PaginationComponent } from "../components/Pagination/Pagination";
import { paginate } from "../services/plants.service";

export default function PlantBasicListPage() {

      const limit = 6;
      const { page } = useParams();
      const hist = useHistory();

      const finalPage = !page ? 1 : page;
      const offsetPage = (finalPage > 0) ? limit * (finalPage - 1) : 0;

      const [plants, setPlants] = useState({original: [], current: []});
      const [loading, setLoading] = useState(true);
      const { isLogged } = useAuth();
      
      const placeholdImg = 'https://via.placeholder.com/350x450.png?text=Image+could+not+be+found';

      
      useEffect(() => { 
            fetch(`${ apiURL }getPlants.php`)
            .then(res => res.json())
            .then(res => {
                  if ( res.error ) {
                        alert(res.message);
                        return 0;
                  }
                  console.log('Otra peticion: ');
                  
                  setPlants({ ...plants, original: res.plants, current: paginate(res.plants,limit,offsetPage) });
                  setLoading(false);
            });
      }, [ ]);    

      const waterPlant = (id) => { 
            fetch(`${apiURL}waterPlant.php?id=${id}`, {
                  method: "POST",
                  mode: "cors",
            })
                  .then(res => res.json())
                  .then(res => {
                        console.log(res);
                        if (res.error) {
                              alert(res.message);
                              return 0;
                        }
                        const newPlants = plants.map(plant => plant.id !== id ? plant : { ...plant, last_time_watered: res.watered });
                        setPlants(newPlants);
                  });
      }

      if (loading) {
            return (
                  <LoadingComponent type='spokes' />
            );
      }

    

      return (
            <>
                  <div className="flex center">
                        <div className="content-container">
                              <div className="">
                                    <div className="flex between">
                                          <h1>Plantas Totales: { plants.original.length }</h1>
                                          <button onClick={ _ => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) }
                                                className="btn btn-principal-static"
                                          >Ir al final de la pagina</button>
                                    </div>

                                    <PlantList
                                          plants={ plants.current }
                                          placeholdImg={ placeholdImg }
                                          waterPlant={ waterPlant }
                                          editButton={ isLogged }
                                          toTopScroll={ true }
                                    />

                                    <PaginationComponent
                                          limit={ limit }
                                          plants={ plants }
                                          callback={ setPlants }
                                          redirector={ hist }
                                          page={ finalPage }
                                          offset={ offsetPage }
                                    />
                              </div>
                        </div>
                  </div>
            </>
      );
}
