
import { ContentContainer } from '../components/ContentContainer';

export default function MaintenancePage () {   

    return (
        <>
            <ContentContainer title="MANTENIMIENTO" center={false} extraCss={ { width: '90%', margin: '0 auto' } }>
                <div className='down flex center'>
                    <h5>Esta página está en mantenimiento... Volveremos pronto :)</h5>
                </div>
            </ContentContainer>
        </>
    )
}