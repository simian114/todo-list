import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { userSelector, logoutRequest } from 'service/redux/slices/userSlice';
import { getKST } from 'utils';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const user = useSelector(userSelector).uid;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutRequest());
  };
  const { t, i18n } = useTranslation();
  const today = getKST();
  const dateString = today.toLocaleString(i18n.language, DATE_OPTION);

  const todayMessage = t(`header.message_${today.getDay()}`);
  return (
    <StyledHeader>
      <Left>
        <StyledLogo>TodoList</StyledLogo>
        {dateString}
      </Left>
      <Right>
        <Message>{todayMessage}</Message>
        {!!user && (
          <StyledLogoutButton onClick={handleLogout}>
            {t('auth.logout')}
          </StyledLogoutButton>
        )}
      </Right>
    </StyledHeader>
  );
};

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLogoutButton = styled(Button)`
  margin-left: 20px;
`;

const Message = styled.div`
  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const StyledLogo = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-right: 30px;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid #eeeeee;
  z-index: 3;
  max-width: 1024px;
  margin: auto;
`;

export default Header;

export const DATE_OPTION: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
