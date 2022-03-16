import { useState, useEffect } from "react";
import { apiURL } from "../constants/config";
import PlantList from "../components/PlantList";
import useAuth from '../hooks/useAuth';
import { PaginationComponent } from "../components/Pagination/Pagination";

export default function PlantBasicListPage() {

      const [plants, setPlants] = useState([]);
      const [offset, setOffset] = useState(0);
      const { isLogged } = useAuth();
      const placeholdImg = 'https://via.placeholder.com/350x450.png?text=Image+could+not+be+found';

      
      useEffect(() => { 
            fetch(`${ apiURL }getPlants.php?limit=10&offset=${offset}`)
            .then(res => res.json())
            .then(res => {
                  if ( res.error ) {
                        alert(res.message);
                        return 0;
                  }
                  
                  setPlants(res);
                  // localStorage.setItem('plants', JSON.stringify(res.plants));
            });
      }, []);
      

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
                                          plants={ plants.plants }
                                          placeholdImg={ placeholdImg }
                                          waterPlant={ waterPlant }
                                          editButton={ isLogged }
                                    />

                                    <PaginationComponent
                                          limit={ 10 }
                                          list={ plants }
                                          offset={ offset }
                                          setOffset={ setOffset }
                                          baseUrl={ `${apiURL}getPlants.php` }
                                          callback={ setPlants }
                                    />
                              </div>
                        </div>
                  </div>
            </>
      );
}
