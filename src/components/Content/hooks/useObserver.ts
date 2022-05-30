import React, {useEffect} from 'react';
import {throttle} from "lodash";
import {useLocation} from "react-router-dom";

const options = {
    root: null as null,
    rootMargin: '0px',
    threshold: 1.0
}

export const useObserver = ({ref, callBack}: Props) => {
    const location = useLocation();

    useEffect(()=>{
        if (ref.current === null) return;

        const observer = new IntersectionObserver(throttle(callBack,1000), options);
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        }
    },[ref.current, callBack, location]);
}

type Props = {
    ref: React.MutableRefObject<any>;
    callBack: (args: any[])=>any;
};