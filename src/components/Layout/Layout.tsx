import React from 'react';
import styled from 'styled-components';
import Header from './Header';

interface Props {
  children: JSX.Element[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Main className="main">{children}</Main>
      {/* TODO: Footer 가장 마지막에 할것 */}
    </>
  );
};

const Main = styled.main`
  max-width: 1024px;
  margin: auto;
  background-color: #fafafa;
`;

export default Layout;
