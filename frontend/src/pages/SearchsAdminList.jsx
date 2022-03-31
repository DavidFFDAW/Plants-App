import { useEffect, useState } from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { LoadingComponent } from "../components/LoadingComponent";
import { formatDate } from '../services/date.services';
import { getSearches } from '../services/plants.service';

export default function PlantAdminList ({ showAlert }) {
    const [searchs, setSearchs] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(_ => {
        getSearches().then(res => {
            if (res.error){
                showAlert(res.message);
            }
            setSearchs(res.searches);
            setLoading(false);
        }).catch(err => showAlert(err.message));
    }, []);

    if (loading) {
        return (
            <LoadingComponent type='spokes' />
        );
    }

    return (
        <>
            <ContentContainer title="LISTADO BUSQUEDAS" center={false} extraCss={ { width: '90%', margin: '0 auto' } }>
                
                <div className="box flex between sticky" style={{ width: '100%', boxSizing: 'border-box', margin: '10px 0px', padding: '0px 26px', background: '#7fad64', color: '#fff' }}>
                        <p style={{ width: '50%', color: '#FFF', fontWeight: 700 }}>BUSQUEDA</p>
                        <p style={{ width: '55%', color: '#FFF', fontWeight: 700 }}>ULTIMA VEZ BUSCADO</p>
                        <p style={{ width: '65%', color: '#FFF', fontWeight: 700 }}>VECES BUSCADO</p>
                </div>
                <div className="down-little">
                    { searchs.map(it => (
                        <div key={it.id} className="box flex between" style={{ width: '100%', boxSizing: 'border-box', margin: '20px 0' }}>
                            <p style={{ width: '50%' }}>{ it.search }</p>
                            <p style={{ width: '55%' }}>{ formatDate(it.date_searched) }</p>
                            <p style={{ width: '65%' }}>{ it.times_searched }</p>
                        </div>
                    )) }
                </div>
            </ContentContainer>
        </>
    )
}