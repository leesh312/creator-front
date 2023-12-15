

export const parseCount = (count: number) => {
  if(count > 10000000000) {
    const digit = (count / 100000000).toFixed(0)
    return digit + "억"
  } else if(count > 100000000) {
    const digit = (count / 100000000).toFixed(1)
    return digit + "억"
  } else if(count > 100000) {
    const digit = (count / 10000).toFixed(0)
    return digit + "만"
  } else if(count > 10000) {
    const digit = (count / 10000).toFixed(1)
    return digit + "만"
  }

  return count
}

export const parseRatio = (ratio: number) => {
  const r = ratio * 100
  if(r < 0.001) {
    return "0%"
  }
  if(r < 0.01) {
    return r.toFixed(4) + "%"
  }
  if(r < 0.1) {
    return r.toFixed(3) + "%"
  }
  if(r < 1) {
    return r.toFixed(2) + "%"
  }
  if(r < 100) {
    return r.toFixed(1) + "%"
  }
  return r.toFixed(0) + "%"
}

export const parseCountry = (countryCode: string | undefined) => {
  if (!countryCode) {
    return "-"
  }
  switch (countryCode) {
    case "KR": return "대한민국"
  }

  return countryCode
}