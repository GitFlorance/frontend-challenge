import React, {useEffect, useState, useCallback} from "react";

import CatPic from "@/components/CatPic/CatPic";
import {Cat} from '@/types/Cat';
import {Conteiner, GridConteiner} from './Content.styles';


function Content() {
    const [cats, setCats] = useState<Cat[]>([]);

    const prettyFetch = useCallback(async (url, method)=>{
        const authKey = window.localStorage.getItem('authKey') || (Math.random() + 1).toString(36).substring(7);
        window.localStorage.setItem('x-api-key', authKey);

        const myHeaders = new Headers();
        myHeaders.append('x-api-key', authKey);
        myHeaders.append('Content-Type', 'application/json');
        

        const response = await fetch(url, {
            method: method,
            mode: 'cors',
            headers: myHeaders
        })

        return await response.json();
    },[])

    useEffect (() => {
        (async() => {
            const [catsResponse, favouritesResponse] = await Promise.all([
                prettyFetch(`https://api.thecatapi.com/v1/images/search?limit=${15}`, 'GET') as Promise<Cat[]>,
                prettyFetch('https://api.thecatapi.com/v1/favourites', 'GET') as Promise<Cat[]>
            ]);


            setCats(catsResponse);


            console.log(catsResponse);
        })()
    },[]);
    
    return (
        <div>
            <Conteiner>
                <GridConteiner>
                    {cats.map((item)=>(
                        <CatPic key={item.id} url={item.url} id={item.id}/>
                    ))}
                </GridConteiner>
            </Conteiner>
        </div>
    )
}

export default Content;