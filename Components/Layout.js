import React from 'react';

import { Container, Header, Footer, Title, FooterTab, Left, Right, Body } from 'native-base';

export const Layout = ({ left, title, right, footer, children }) => (
    <Container>
        <Header>
            <Left>{left}</Left>
            <Body><Title>{title}</Title></Body>
            <Right>{right}</Right>
        </Header>
        {children}
        <Footer>
            <FooterTab>
                {footer}
            </FooterTab>
        </Footer>
    </Container>)