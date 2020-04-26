export function getRandomString(num, isPureNumber = false) {
  // 生成指定长度的随机字符串
  const a = 'acdefghijklmnoqrtuvwxyz'
  const n = '1234567890'
  const s = []
  const r = isPureNumber ? n : a + n
  const l = r.length
  while (s.length <= num) {
    const v = r[Math.floor(Math.random() * l)]
    s.push(Math.random() > 0.5 ? v : v.toUpperCase())
  }
  return (isPureNumber ? '' : 'R_') + s.join('')
}
