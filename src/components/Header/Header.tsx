import React from "react";
import {Head, Button, Container} from './Header.styles'


function Header() {

    return (
        <Head>
            <Container>
                <Button>Все котики</Button>
                <Button>Любимые котики</Button>
            </Container>
        </Head>
    )
}

export default Header;