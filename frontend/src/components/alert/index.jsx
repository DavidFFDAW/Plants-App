import React, { useEffect } from 'react';

export default function Alert({ cssClass = '', message = '', seconds, setAlertInfo, show = false, acceptButton = false }) {

    useEffect(() => {
        if (seconds) {
            setTimeout(_ => {
                setAlertInfo({ show: false, message: '' });
            }, seconds * 1000);
        }
    },[ seconds, setAlertInfo ]);

    const closeAlert = _ => {
        setAlertInfo({ show: false, message: '' });
    };

    if (show) {
        return (
            <>
                <div className='bg-block'></div>
                <div className={`alert ${ cssClass }`}>
                    <div className="down-little flex center">
                        <button type="button" className='alert-close' onClick={ closeAlert }>&times;</button>
                        { message }
                    </div>
                    { acceptButton && <div className='down flex center'>
                        <button type="button" className='btn btn-principal-static' onClick={ closeAlert }>Aceptar</button>
                    </div> }
                </div>
            </>     
        );
    }

    return(
        <></>
    );
}
