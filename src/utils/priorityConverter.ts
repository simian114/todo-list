const kr = ['높음', '중간', '낮음'];
const en = ['high', 'middle', 'low'];

const priorityConverter = (val: string) => {
  const [from, to] = kr.includes(val) ? [kr, en] : [en, kr];
  const idx = from.findIndex((category) => category === val);
  return to[idx];
};

export default priorityConverter;
