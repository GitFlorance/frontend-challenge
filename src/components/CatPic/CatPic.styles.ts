import styled, {css} from "styled-components";
import { Icon } from './parts/Icon';
import { IconFilled } from './parts/IconFilled';

export const CatImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const HeartBase = css`
    width: 40px;
    height: 36px;
    position: absolute;
    right: 28px;
    bottom: 28px;
    opacity: 0;
    transition: all 0.3s ease; 
`

export const Heart = styled(Icon)`
     ${HeartBase};
`;
export const HeartFilled = styled(IconFilled)`
     ${HeartBase};
     
     &:hover {
        opacity: 1;
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

    &:hover {
        transform: scale(1.135);   
        box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.24), 0px 9px 18px rgba(0, 0, 0, 0.18); 


        & > ${Heart} {
            opacity: 1;
        }
    }
`

