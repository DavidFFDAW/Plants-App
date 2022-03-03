import React, { useEffect, useRef } from 'react';

export default function Alert({ cssClass, message, seconds }) {

    const alert = useRef('alert');
    console.log(alert.current);

    useEffect(() => {
        setTimeout(_ => {
            alert.current.classList.add('alert-disappear');
            // alert.current.onAnimationEnd = _ => {
                alert.current.remove();
            // }
        }, seconds );
    },[]);

    return(
        <div className="flex center" ref={ alert }>
            <div className={ `alert ${ cssClass }` }>
                { message }
            </div>
        </div>
    );
}
