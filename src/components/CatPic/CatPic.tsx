import React, {useRef} from "react";

import {CatItem, CatImg, Heart, HeartFilled} from './CatPic.styles';
import {Props} from './CatPic.model';

function CatPic(props: Props) {

    
    return (
        <CatItem>
            <CatImg src={props.url} draggable="false"/>
            <Heart />
            <HeartFilled />
        </CatItem>
    )
}

export default CatPic;