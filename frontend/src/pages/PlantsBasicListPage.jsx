import { useState, useEffect } from "react";


export default function PlantBasicListPage() {

      const [plants, setPlants] = useState([]);
      const placeholdImg = 'https://via.placeholder.com/300x450.png?text=Image+could+not+be+found';

      useEffect(() => { 
            fetch('http://vps-f87b433e.vps.ovh.net/plants_images/api/getPlants.php')
            .then(res => res.json())
            .then(res => {
                  console.log('Status code: ',res.code);
                  if ( res.error ) {
                        alert(res.message);
                        return 0;
                  }
                  setPlants(res.plants);
            });
      }, []);

    

      return (
            <>
                  <div className="content-container">
                  <div className="box-no-padding-total">
                        <div className="col-12">
                              <h1>LISTADO</h1>
                        </div>

                        <div className="down-little cartitas">
                              {plants.map((plant, ind) => (
                                    <div className="plant-card" key={ind}>
                                          <div className="plant-card-image">
                                                <img src={plant.image ? plant.image : placeholdImg } alt=""/>
                                          </div>
                                          <div className="plant-card-info">
                                                <h4 className="plant-card-info-item">{plant.name}</h4>
                                                <p className="plant-card-info-item">{plant.real_name}</p>
                                                <p className="plant-card-info-item">{plant.description}</p>
                                                <p className="plant-card-info-item">{plant.location}</p>
                                                <p className="plant-card-info-item">{plant.extra_location}</p>
                                                <p className="plant-card-info-item">{plant.type}</p>
                                                <p className="plant-card-info-item">{plant.last_time_watered}</p>
                                                <p className="plant-card-info-item">{plant.created_at}</p>
                                          </div>
                                    </div>                                                
                              )) }                               
                        </div>
                  </div>
                  </div>
            </>
      );
}
