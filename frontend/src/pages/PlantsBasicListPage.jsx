import { useState, useEffect } from "react";
import { apiURL } from "../constants/config";
import PlantList from "../components/PlantList";

export default function PlantBasicListPage() {

      const [plants, setPlants] = useState([]);
      const placeholdImg = 'https://via.placeholder.com/350x450.png?text=Image+could+not+be+found';

      useEffect(() => { 
            fetch(`${ apiURL }getPlants.php?`)
            .then(res => res.json())
            .then(res => {
                  console.log('Status code: ',res.code);
                  console.log('Status code: ',res.message);
                  console.log('Status code: ',res.plants);
                  if ( res.error ) {
                        alert(res.message);
                        return 0;
                  }
                  setPlants(res.plants);
                  // localStorage.setItem('plants', JSON.stringify(res.plants));
            });
      }, []);

    

      return (
            <>
                  <div className="flex center">
                        <div className="content-container">
                              <div className="">
                                    <div className="col-12">
                                          <h1>LISTADO</h1>
                                    </div>

                                    <PlantList
                                          plants={ plants }
                                          placeholdImg={ placeholdImg }
                                    />
                              </div>
                        </div>
                  </div>
            </>
      );
}
