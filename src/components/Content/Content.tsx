import React, {useEffect, useState, useCallback} from "react";

import CatPic from "@/components/CatPic/CatPic";
import {Cat} from '@/types/Cat';
import {Conteiner, GridConteiner} from './Content.styles';

const authKey = 'fd7a1bf7-aefb-4d08-967b-748a160d2179';


function Content() {
    const [cats, setCats] = useState<Cat[]>([]);
    const [favourites, setFavourites] = useState<Cat[]>([]);

    const prettyFetch = useCallback(async (url: string, method: string, body?: any)=>{
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
    },[])

    useEffect (() => {
        (async() => {
            const [catsResponse, favouritesResponse] = await Promise.all([
                prettyFetch(`https://api.thecatapi.com/v1/images/search?limit=${15}`, 'GET') ,
                prettyFetch('https://api.thecatapi.com/v1/favourites', 'GET') 
            ]);


            setCats(catsResponse);
            setFavourites(favouritesResponse.map((item: any)=>({
                id: item.image_id,
                url: item.url,
                fav_id: item.id
            })));
        })()
    },[]);


    const like = async (cat: Cat) => {
        const resp = await prettyFetch('https://api.thecatapi.com/v1/favourites','POST', {
            image_id: cat.id
        })
    
        setFavourites((state)=>[...state, {...cat, fav_id: resp.id}])
    }

    const disLike = async (cat: Cat) => {
        await prettyFetch(`https://api.thecatapi.com/v1/favourites/${cat.fav_id}`,'DELETE')

        setFavourites((state)=> state.filter((item)=>{
            return item.id !== cat.id
        }))
    }

    const getFavId = (id: string) => {
        return favourites.find((item)=> item.id === id)?.fav_id;
    }
    
    return (
        <div>
            <Conteiner>
                <GridConteiner>
                    {cats.map((item)=>(
                        <CatPic 
                            key={item.id} 
                            url={item.url} 
                            id={item.id}
                            like={like}
                            disLike={disLike}
                            fav_id={getFavId(item.id)}
                        />
                    ))}
                </GridConteiner>
            </Conteiner>
        </div>
    )
}

export default Content;