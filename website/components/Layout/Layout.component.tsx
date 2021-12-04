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
      <div style={{ marginTop: '32px' }}>
        <Header />
        <Container>{children}</Container>
      </div>
    </Container>
  );
};
