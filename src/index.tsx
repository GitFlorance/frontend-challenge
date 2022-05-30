import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import IndexPage from "@/components/IndexPage/IndexPage";
import "@/global-styles/reset.css";
import "@/global-styles/base.css";


ReactDOM.render(
    <HashRouter >
        <IndexPage/>
    </HashRouter>,
    document.getElementById('app')
);