import React, {useEffect, useState, useCallback, useRef} from "react";
import {throttle} from 'lodash';

import {Cat} from '@/types/Cat';
import {prettyFetch} from '@/utils/prettyFetch';
import CatPic from "@/components/CatPic/CatPic";
import {Container, GridContainer, Loader} from './Content.styles';
import {Switch, Route, useLocation} from "react-router-dom";

const options = {
    root: null as null,
    rootMargin: '0px',
    threshold: 1.0
}

function Content() {
    const [cats, setCats] = useState<Cat[]>([]);
    const [favourites, setFavourites] = useState<Cat[]>([]);

    const location = useLocation();

    const interceptionTarget = useRef<HTMLDivElement>(null);
    const page = useRef(0);

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

    const getMoreCats = useCallback(async () => {
        page.current += 2;
        const catsResponse = await prettyFetch(`https://api.thecatapi.com/v1/images/search?limit=${5}&page=${page.current}`, 'GET');

        setCats((state)=> [...state, ...catsResponse]);
    },[setCats]);

    useEffect(()=>{
        if (interceptionTarget.current === null) return;

        const observer = new IntersectionObserver(throttle(getMoreCats,1000), options);
        observer.observe(interceptionTarget.current);

        return () => {
            observer.disconnect();
        }
    },[interceptionTarget.current, getMoreCats, location])


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
        <Switch>
            <Route path="/favourites">
                <Container >
                    <GridContainer>
                        {favourites.map((item)=>(
                            <CatPic
                                key={item.id}
                                url={item.url}
                                id={item.id}
                                like={like}
                                disLike={disLike}
                                fav_id={item.fav_id}
                            />
                        ))}
                    </GridContainer>
                </Container>
            </Route>
            <Route exact strict path="/">
                <Container id="container">
                    <GridContainer>
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
                    </GridContainer>
                    {cats.length >= 15 && (<Loader ref={interceptionTarget}>... загружаем еще котиков ...</Loader>)}
                </Container>
            </Route>
        </Switch>
    )
}

export default Content;