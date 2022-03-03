import React, { useEffect } from 'react';

export default function Alert({ cssClass = '', message = '', seconds, setAlertInfo, show = false }) {

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
                <div className="flex center alert">
                    <div className={ `alertt ${ cssClass }` }>
                        <button type="button" className='alert-close' onClick={ closeAlert }>&times;</button>
                        { message }
                    </div>
                </div>
            </>     
        );
    }

    return(
        <></>
    );
}
