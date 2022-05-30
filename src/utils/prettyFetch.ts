const authKey = 'fd7a1bf7-aefb-4d08-967b-748a160d2179';

export const prettyFetch = async (url: string, method: string, body?: any)=>{
    const myHeaders = new Headers();
    myHeaders.append('x-api-key', authKey);
    myHeaders.append('Content-Type', 'application/json');


    const response = await fetch(url, {
        method,
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify(body),
    })

    return await response.json();
};