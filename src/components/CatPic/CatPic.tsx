import React from "react";

import {CatItem, CatImg, IconContainer, Heart, HeartFilled} from './CatPic.styles';
import {Props} from './CatPic.model';

function CatPic(item: Props) {
    const {url, id, like, disLike, fav_id} = item;

    const clickHandler = () => {
        if (!!fav_id) {
            disLike(item)
        } else {
            like(item)
        }
    }
    
    return (
        <CatItem>
            <CatImg src={url} draggable="false"/>
            <IconContainer onClick={clickHandler} isFavourite={!!fav_id} >
                <Heart />
                <HeartFilled />
            </IconContainer>
        </CatItem>
    )
}

export default CatPic;