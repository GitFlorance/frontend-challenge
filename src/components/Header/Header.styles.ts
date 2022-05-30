import styled from "styled-components";
import {NavLink} from 'react-router-dom';

import {COLORS} from "@/constants/colors";


export const Head = styled.header`
    width: 100vw;
    height: 64px;
    padding: 0px 62px;
    background: ${COLORS.blue};
    color: ${COLORS.white};
`;
export const Container = styled.div`
    max-width: 1318px;
    margin: 0 auto;
    display: flex;
`;

export const Button = styled(NavLink)`
    padding: 25px 20px;

    &.active, &:hover {
        background:${COLORS.darkBlue}
    };
`