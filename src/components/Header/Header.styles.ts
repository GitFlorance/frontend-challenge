import styled, { css} from "styled-components";

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

export const Button = styled.div`
    padding: 23px 20px;
    &:hover {
        background:${COLORS.darkBlue}
    };
`