// 本地时间，换算对应格林威治时间
export const localDate = (v) => {
  const d = new Date(v || Date.now());
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString();
}