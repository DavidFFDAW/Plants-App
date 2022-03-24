export function Pages ({ array, changePage, current }) {

    return (
        <>
            { array.map((item, index) => {
                const realItem = +item;
                console.log(realItem);
                console.log(current);

                const btnType = (+current === realItem) ? 'btn active': 'btn';
                console.log(btnType);

                return (
                    <button key={ index } className={ btnType } onClick={ _ => changePage(+item + 1) }>{ item + 1 }</button>
                )
            }) }
        </>
    );
}