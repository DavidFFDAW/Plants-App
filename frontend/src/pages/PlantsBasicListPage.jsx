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
<<<<<<< HEAD
                  <div className="">
=======
                  <div className="box-no-padding-total">
>>>>>>> 97da908ef52762a164ee85b83dadb8f5e0dd6417
                        <div className="col-12">
                              <h1>LISTADO</h1>
                        </div>

<<<<<<< HEAD
                        <div className="down-little grid-images">
                              {plants.map((plant, ind) => (
                                    <div className="box-no-padding-total plant-card" key={ind}>
=======
                        <div className="down-little cartitas">
                              {plants.map((plant, ind) => (
                                    <div className="plant-card" key={ind}>
>>>>>>> 97da908ef52762a164ee85b83dadb8f5e0dd6417
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
<<<<<<< HEAD
                                          <div className="flex between">
                                                <button className="btn btn-secondary">Regar</button>                              
                                                <button className="btn btn-principal">Ver Detalles</button>                              
                                          </div>
                                    </div>                                                
                              )) } 
=======
                                    </div>                                                
                              )) }                               
>>>>>>> 97da908ef52762a164ee85b83dadb8f5e0dd6417
                        </div>
                  </div>
                  </div>
            </>
      );
}
