const array = [1, 2, 3, 4, 5, 6];

const perPage = 2;
const page = 2;

const paginate = ar => {
    const realPage = page === 1 ? 0 : page;

    return ar.slice(realPage, perPage * page);
}


console.log(paginate(array));