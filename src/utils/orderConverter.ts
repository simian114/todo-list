const kr = ['사용자지정', '최신순', '오래된순', '중요도', '마감임박'];
const en = ['custom', 'latest', 'oldest', 'priority', 'due'];

const orderConverter = (val: string) => {
  const [from, to] = kr.includes(val) ? [kr, en] : [en, kr];
  const idx = from.findIndex((category) => category === val);
  return to[idx];
};

export default orderConverter;
