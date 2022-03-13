import ReactLoading from 'react-loading';

export function LoadingComponent ({ type }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    };

    return (
        <div style={ style }>
            <ReactLoading type={ type || 'spinningBubbles' } color="#468d4f" height={150} width={150} />
        </div>
    );
}