import React from "react";
import {Head, Button, Container} from './Header.styles'


function Header() {

    return (
        <Head>
            <Container>
                <Button exact strict to="/" activeClassName="active">Все котики</Button>
                <Button to="/favourites" activeClassName="active">Любимые котики</Button>
            </Container>
        </Head>
    )
}

export default Header;