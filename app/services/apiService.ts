const apiService = {
    get: async function (url: string, token: string | null = null): Promise<any> {
        console.log('get', url);


        return new Promise((resolve, reject) => {
            const headers: any = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: headers,
                credentials: 'include',
            })
                .then(response => {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(`Expected JSON but received ${contentType || 'unknown'}. Content: ${text.substring(0, 100)}...`);
                        });
                    }
                })
                .then((json) => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch((error => {
                    console.error('API GET Error:', error);
                    reject(error);
                }))
        })
    },




    post: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);

        return new Promise((resolve, reject) => {
            const headers: any = {}

            if (!(data instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
                data = JSON.stringify(data);
            }

            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: headers,
                credentials: 'include',
            })
                .then(response => {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        return response.json();
                    } else {
                        // Return structured error if not JSON
                        return response.text().then(text => {
                            return {
                                error: true,
                                message: `Expected JSON but received ${contentType || 'unknown'}`,
                                status: response.status
                            };
                        });
                    }
                })
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    console.error('API POST Error:', error);
                    reject(error);
                }))
        })
    },









    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log('post without token', url, data);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            return {
                                error: true,
                                message: `Expected JSON but received ${contentType || 'unknown'}`,
                                status: response.status
                            };
                        });
                    }
                })
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    console.error('API POST Without Token Error:', error);
                    reject(error);
                }))
        })
    },
}








export default apiService;
