export function Pages ({ array, changePage, current }) {

    return (
        <>
            { array.map((item, index) => {
                const realItem = +item+1;
                const btnType = (+current === realItem) ? 'btn active': 'btn';
                console.log(btnType);

                return (
                    <button key={ index } className={ btnType } onClick={ _ => changePage(realItem) }>{ realItem }</button>
                )
            }) }
        </>
    );
}