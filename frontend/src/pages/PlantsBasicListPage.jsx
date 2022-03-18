import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { apiURL } from "../constants/config";
import PlantList from "../components/PlantList";
import useAuth from '../hooks/useAuth';
import { LoadingComponent } from "../components/LoadingComponent";
import { PaginationComponent } from "../components/Pagination/Pagination";

export default function PlantBasicListPage() {

      const limit = 6;
      const { page } = useParams();
      const hist = useHistory();
      const offsetPage = page ? limit * (page - 1) : 0;
      const [plants, setPlants] = useState([]);
      const [offset, setOffset] = useState({});
      const [loading, setLoading] = useState(true);
      const { isLogged } = useAuth();
      const placeholdImg = 'https://via.placeholder.com/350x450.png?text=Image+could+not+be+found';

      
      useEffect(() => { 
            fetch(`${ apiURL }getPlants.php?limit=${ limit }&offset=${ offsetPage }`)
            .then(res => res.json())
            .then(res => {
                  if ( res.error ) {
                        alert(res.message);
                        return 0;
                  }
                  console.log('La respuesta: ', res);
                  
                  setPlants(res.plants);
                  setOffset(res);
                  setLoading(false);
                  // localStorage.setItem('plants', JSON.stringify(res.plants));
            });
      }, [ offsetPage ]);

      const callback = response => {
            setOffset(response);
            setPlants(response.plants);
      }     

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
                                          <h1>LISTADO</h1>
                                          <button onClick={ _ => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) }
                                                className="btn btn-principal-static"
                                          >Ir al final de la pagina</button>
                                    </div>

                                    <PlantList
                                          plants={ plants }
                                          placeholdImg={ placeholdImg }
                                          waterPlant={ waterPlant }
                                          editButton={ isLogged }
                                          toTopScroll={ true }
                                    />

                                    <PaginationComponent
                                          limit={ limit }
                                          list={ offset }
                                          baseUrl={ `${apiURL}getPlants.php` }
                                          callback={ callback }
                                          redirector={ hist }
                                          page={ offsetPage }
                                    />
                              </div>
                        </div>
                  </div>
            </>
      );
}
