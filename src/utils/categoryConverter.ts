const kr = ['업무', '공부', '일상', '운동', '기타'];
const en = ['work', 'study', 'life', 'exercise', 'etc'];

const categoryConverter = (val: string) => {
  const [from, to] = kr.includes(val) ? [kr, en] : [en, kr];
  const idx = from.findIndex((category) => category === val);
  return to[idx];
};

export default categoryConverter;
