import React from 'react';
import styled from 'styled-components';
import { getDate, getKST } from 'utils';

const Header: React.FC = () => {
  const today = getKST();
  const dateString = getDate(today, DATE_OPTION);
  const todayMessage = makeTodayMessage(today);
  return (
    <StyledHeader>
      <Left>
        <StyledLogo>TodoList</StyledLogo>
        {dateString}
      </Left>
      <Message>{todayMessage}</Message>
    </StyledHeader>
  );
};

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Message = styled.div``;

const StyledLogo = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-right: 30px;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid #eeeeee;
  z-index: 3;
`;

export default Header;

export const DATE_OPTION: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const makeTodayMessage = (today: Date) => {
  const idx = today.getDay();
  const msg = `${message[idx][0]}  ${message[idx][1]} ${message[idx][2]}`;
  return msg;
};

const message = [
  ['😎', '즐거운 일요일!', '일주일을 마무리해보세요.'],
  ['🙋‍♂️', '오늘은 월요일!', '새롭게 한 주를 시작하세요.'],
  ['🎧', '오늘은 화요일!', '좋아하는 음악을 들어보세요.'],
  ['👀', '오늘은 수요일!', '한 주의 정점입니다.'],
  ['🙆‍♂️', '오늘은 목요일!', '이틀만 버티면 주말입니다.'],
  ['💪', '오늘은 금요일!', '하루만 버티면 주말입니다.'],
  ['🎈', '즐거운 토요일!', '신나는 주말입니다.'],
];
