
const request = (method, url, requestConfig = {}) => {

    const {data, id, token } = requestConfig;
    const options = {};

    if (method !== 'GET') {
        options.method = method;
        options.headers = {"Content-Type": "application/json"};
        options.body = JSON.stringify(data);
    }

    if (id) {
        url = `${url}/${id}.json`;
    }

    if (token) {
        url += `?auth=${token}`;
    }

    return fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw res.json();
            }
            return res.json();
        })
        .then(data => {
            if (data === null) {
                return {};
            }
            return data;
        })
        .catch(error => {
            throw error;
        })

}


export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');


