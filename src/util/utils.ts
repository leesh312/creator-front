

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

export const parseCountry = (countryCode: string | undefined) => {
  if (!countryCode) {
    return "국적 미기재"
  }
  switch (countryCode) {
    case "KR": return "대한민국"
  }

  return countryCode
}