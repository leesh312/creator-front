

export const parseCount = (count: number) => {
  if (!count) {
    return "-"
  }
  let number: number
  let unit: string
  let fixed: number

  if(count > 10000000000) {
    number = (count / 100000000)
    fixed = 0
    unit = "억"
  } else if(count > 100000000) {
    number = (count / 100000000)
    fixed = 1
    unit = "억"
  } else if(count > 100000) {
    number = (count / 10000)
    fixed = 0
    unit = "만"
  } else if(count > 10000) {
    number = (count / 10000)
    fixed = 1
    unit = "만"
  } else {
    number = count
    fixed = 0
    unit = ""
  }

  if(fixed === 0) {
    return numberWithCommas(Number(number.toFixed(0))) + unit
  } else {
    return number.toFixed(fixed) + unit
  }
}

export const parseRatio = (ratio: number) => {
  const r = ratio * 100
  let result: string
  if(r < 0.001) {
    result = "0%"
  } else if(r < 0.01) {
    result = r.toFixed(4) + "%"
  } else if(r < 0.1) {
    result = r.toFixed(3) + "%"
  } else if(r < 1) {
    result = r.toFixed(2) + "%"
  } else if(r < 100) {
    result = r.toFixed(1) + "%"
  } else {
    result = r.toFixed(0) + "%"
  }

  if(result.endsWith(".0%")) {
    return result.replace(".0%", "%")
  } else {
    return result
  }
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


export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}