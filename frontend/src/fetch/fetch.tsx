
type Dict = {
    [key: string]: string | Dict,
}

export const fetchData = async (path: string, object: Dict): Promise<Dict> => {
    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    }).then(res => res.json());
}
