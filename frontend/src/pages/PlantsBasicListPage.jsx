import { useState, useEffect } from "react";


export default function PlantBasicListPage() {

      const [plants, setPlants] = useState([]);
      const placeholdImg = 'https://via.placeholder.com/339x450.png?text=Image+could+not+be+found';

      useEffect(() => { 
            fetch('http://vps-f87b433e.vps.ovh.net/plants_images/api/getPlants.php?order=location')
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

                                    <div className="down-little grid-images">
                                          {plants.map((plant) => (
                                                <div className="box-no-padding-total plant-card" key={plant.id} style={{ padding: '30px 0 !important' }}>
                                                      <div className="plant-card-image">
                                                            <img src={plant.image ? plant.image : placeholdImg } alt=""/>
                                                      </div>
                                                      <div className="plant-card-info" style={{ padding: '5px 20px' }}>
                                                            <h4 className="plant-card-info-item" style={{ marginBottom:0, fontSize: '20px', textTransform: 'uppercase' }}>{plant.name}</h4>
                                                            <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.real_name}</p>
                                                            <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.location}</p>
                                                            <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.last_time_watered}</p>
                                                            <div className="down flex between">
                                                                  <button className="btn btn-secondary">Regar</button>                              
                                                                  <button className="btn btn-principal">Detalles</button>                              
                                                            </div>
                                                      </div>
                                                </div>                                                
                                          )) } 
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
}
