export function Pages ({ array, changePage, page }) {

    return (
        <>
            { array.map((item, index) => {
                const realItem = +item;
                console.log(realItem);
                console.log(page);

                const btnType = (+page === realItem) ? 'btn active': 'btn';
                console.log(btnType);

                return (
                    <button key={ index } className={ btnType } onClick={ _ => changePage(+item + 1) }>{ item + 1 }</button>
                )
            }) }
        </>
    );
}