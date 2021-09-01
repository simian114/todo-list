const kr = ['시작안함', '진행중', '완료'];
const en = ['notStarted', 'onGoing', 'completed'];

const statusConverter = (val: string) => {
  const [from, to] = kr.includes(val) ? [kr, en] : [en, kr];
  const idx = from.findIndex((category) => category === val);
  return to[idx];
};

export default statusConverter;
