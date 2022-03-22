export function Pages ({ array, changePage }) {

    return (
        <>
            { array.map((item, index) => {
                return (
                    <button key={ index } className="btn" onClick={ _ => changePage(+item + 1) }>{ item + 1 }</button>
                )
            }) }
        </>
    );
}