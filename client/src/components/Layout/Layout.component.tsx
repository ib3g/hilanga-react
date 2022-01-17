import React from 'react';
import Header from '../Header/Header.component';
import { Container } from '../Container/Container.component';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const Layout = (props: Props) => {
  const { children } = props;

  return (
    <Container>
      <Header />
      <Container>
        <div style={{ margin: '32px' }}>{children}</div>
      </Container>
    </Container>
  );
};
