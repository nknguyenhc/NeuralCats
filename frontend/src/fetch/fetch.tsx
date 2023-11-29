
type Dict = {
    [key: string]: string | Dict | Array<Dict>,
}

export const postData = async (path: string, object: Dict): Promise<Dict> => {
    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    }).then(res => res.json());
}

type FormDataType = {
    [key: string]: string | File | Array<string> | Array<File>
}

export const postFormData = async (path: string, object: FormDataType): Promise<Dict> => {
    const formData = new FormData();
    for (const key in object) {
        if (Array.isArray(object[key])) {
            const array = object[key] as Array<string> | Array<File>;
            for (let i = 0; i < array.length; i++) {
                formData.append(key, array[i]);
            }
        } else {
            const data = object[key] as string | File;
            formData.append(key, data);
        }
    }

    return fetch(path, {
        method: 'POST',
        body: formData,
    }).then(res => res.json());
}
