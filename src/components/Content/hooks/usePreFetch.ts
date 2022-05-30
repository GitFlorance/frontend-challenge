import {useEffect} from "react";
import {prettyFetch} from "@/utils/prettyFetch";
import {Cat} from "@/types/Cat";


export const usePreFetch = ({setCats, setFavourites}: Props) => {
    useEffect (() => {
        (async() => {
            const [catsResponse, favouritesResponse] = await Promise.all([
                prettyFetch(`https://api.thecatapi.com/v1/images/search?limit=${15}&page=0`, 'GET') ,
                prettyFetch('https://api.thecatapi.com/v1/favourites', 'GET')
            ]);
            setCats(catsResponse);
            setFavourites(favouritesResponse.map((item: any)=>({
                id: item.image.id,
                url: item.image.url,
                fav_id: item.id
            })));
        })()
    },[]);
}

type Props = {
    setCats: (cat: Cat[])=>void;
    setFavourites: (cat: Cat[])=>void;
};