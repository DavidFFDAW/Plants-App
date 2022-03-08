import React, { useEffect } from 'react';

export default function Alert({ cssClass = '', message = '', seconds, setAlertInfo, show = false, extraBtn = { show: false } }) {

    useEffect(() => {
        if (seconds && seconds > 0) {
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
                    { extraBtn.show && <div className="down flex between">
                        <button type="button" onClick={ ev => extraBtn.callback(ev) }>{ extraBtn.label }</button>
                    </div> }
                </div>
            </>     
        );
    }

    return(
        <></>
    );
}
