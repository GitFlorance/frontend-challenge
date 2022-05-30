import styled, {css} from "styled-components";
import {COLORS} from "@/constants/colors";
import { Icon } from './parts/Icon';
import { IconFilled } from './parts/IconFilled';

export const CatImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const HeartBase = css`
    opacity: 0;
    transition: all 0.3s ease; 
    position: absolute;
    top:0;
    left:0;
`;

export const Heart = styled(Icon)`
     ${HeartBase};
`;
export const HeartFilled = styled(IconFilled)`
     ${HeartBase};
`;

export const IconContainer = styled.div<{isFavourite?: boolean}>`
    width: 40px;
    height: 36px;
    position: absolute;
    right: 28px;
    bottom: 28px;

    & ${HeartFilled} {
         opacity: ${({isFavourite})=> isFavourite ? '1' : '0'}; 
         &:hover {
              opacity: ${({isFavourite})=> isFavourite ? '0' : '1'}; ;
         }
    }
`;

export const CatItem = styled.div`
    width: 225px;
    height: 225px;
    margin: 24px;
    position: relative;
    cursor: pointer;
    transform: scale(1); 
    box-shadow: 0 0 0 #fff;
    transition: all 0.3s ease;  
     background-color: ${COLORS.grey};

    &:hover {
        transform: scale(1.135);   
        box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.24), 0px 9px 18px rgba(0, 0, 0, 0.18); 


        & ${Heart} {
            opacity: 1;
        }
    }
`

