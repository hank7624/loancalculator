const round = (x) => Math.round(x);

export const generateEqualPaymentSchedule = (principal, monthlyRate, totalPeriods, monthlyPayment) => {
  const schedule = []
  let remainingBalance = principal
  const payRounded = round(monthlyPayment)

  for (let period = 1; period <= totalPeriods; period++) {
    const isLast = period === totalPeriods
    if (isLast) {
      const interest = round(remainingBalance * monthlyRate)
      const principalPayment = remainingBalance
      const payment = principalPayment + interest
      remainingBalance = 0
      schedule.push({
        period,
        payment,
        principal: principalPayment,
        interest,
        remainingBalance: 0
      })
      break
    }

    const interest = round(remainingBalance * monthlyRate)
    const principalPayment = payRounded - interest
    remainingBalance -= principalPayment
    schedule.push({
      period,
      payment: payRounded,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}

export const generateEqualPrincipalSchedule = (principal, monthlyRate, totalPeriods, monthlyPrincipal) => {
  const schedule = []
  let remainingBalance = principal
  const basePrincipal = monthlyPrincipal

  for (let period = 1; period <= totalPeriods; period++) {
    const isLast = period === totalPeriods
    let principalPayment = isLast ? remainingBalance : round(basePrincipal)
    const interest = round(remainingBalance * monthlyRate)
    const payment = principalPayment + interest
    remainingBalance -= principalPayment

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}

export const generateTwoTierSchedule = (principal, firstRate, secondRate, totalPeriods, firstPayment, secondPayment) => {
  const schedule = []
  let remainingBalance = principal
  const pay1 = round(firstPayment)
  const pay2 = round(secondPayment)

  for (let period = 1; period <= totalPeriods; period++) {
    const isFirstYear = period <= 12
    const rate = isFirstYear ? firstRate : secondRate
    const isLast = period === totalPeriods

    if (isLast) {
      const interest = round(remainingBalance * rate)
      const principalPayment = remainingBalance
      const payment = principalPayment + interest
      remainingBalance = 0
      schedule.push({ period, payment, principal: principalPayment, interest, remainingBalance: 0 })
      break
    }

    const payment = isFirstYear ? pay1 : pay2
    const interest = round(remainingBalance * rate)
    const principalPayment = payment - interest
    remainingBalance -= principalPayment

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}

export const generateThreeTierSchedule = (principal, firstRate, secondRate, thirdRate, totalPeriods, firstPayment, secondPayment, thirdPayment) => {
  const schedule = []
  let remainingBalance = principal

  for (let period = 1; period <= totalPeriods; period++) {
    let payment, interest, principalPayment
    
    if (period <= 12) {
      interest = remainingBalance * firstRate
      payment = firstPayment
      principalPayment = payment - interest
    } else if (period <= 24) {
      interest = remainingBalance * secondRate
      payment = secondPayment
      principalPayment = payment - interest
    } else {
      interest = remainingBalance * thirdRate
      payment = thirdPayment
      principalPayment = payment - interest
    }
    
    remainingBalance -= principalPayment

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}

export const generateTwoTierEqualPrincipalSchedule = (principal, firstRate, secondRate, totalPeriods, monthlyPrincipal) => {
  const schedule = []
  let remainingBalance = principal
  const basePrincipal = monthlyPrincipal

  for (let period = 1; period <= totalPeriods; period++) {
    const rate = period <= 12 ? firstRate : secondRate
    const isLast = period === totalPeriods
    let principalPayment = isLast ? remainingBalance : round(basePrincipal)
    const interest = round(remainingBalance * rate)
    const payment = principalPayment + interest
    remainingBalance -= principalPayment

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}

export const generateThreeTierEqualPrincipalSchedule = (principal, firstRate, secondRate, thirdRate, totalPeriods, monthlyPrincipal) => {
  const schedule = []
  let remainingBalance = principal
  const basePrincipal = monthlyPrincipal

  for (let period = 1; period <= totalPeriods; period++) {
    let rate
    if (period <= 12) rate = firstRate
    else if (period <= 24) rate = secondRate
    else rate = thirdRate

    const isLast = period === totalPeriods
    let principalPayment = isLast ? remainingBalance : round(basePrincipal)
    const interest = round(remainingBalance * rate)
    const payment = principalPayment + interest
    remainingBalance -= principalPayment

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}

export const generateEqualPaymentScheduleWithGrace = (principal, monthlyRate, totalMonths, graceMonths, monthlyPayment) => {
  const schedule = []
  let remainingBalance = principal
  const payRounded = round(monthlyPayment)

  for (let period = 1; period <= totalMonths; period++) {
    const isLast = period === totalMonths
    let payment, interest, principalPayment

    if (period <= graceMonths) {
      interest = round(remainingBalance * monthlyRate)
      payment = interest
      principalPayment = 0
    } else if (isLast) {
      interest = round(remainingBalance * monthlyRate)
      principalPayment = remainingBalance
      payment = principalPayment + interest
      remainingBalance = 0
    } else {
      interest = round(remainingBalance * monthlyRate)
      payment = payRounded
      principalPayment = payment - interest
      remainingBalance -= principalPayment
    }

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}

export const generateTwoTierScheduleWithGrace = (principal, firstRate, secondRate, totalMonths, graceMonths, firstPayment, secondPayment) => {
  const schedule = []
  let remainingBalance = principal
  const secondPaymentRounded = Math.round(secondPayment)

  for (let period = 1; period <= totalMonths; period++) {
    let payment, interest, principalPayment
    
    if (period <= graceMonths) {
      const year = Math.ceil(period / 12)
      const rate = year === 1 ? firstRate : secondRate
      const interestRaw = remainingBalance * rate
      interest = round(interestRaw)
      payment = interest
      principalPayment = 0
    } else {
      const interestRaw = remainingBalance * secondRate
      interest = round(interestRaw)
      payment = secondPaymentRounded
      principalPayment = payment - interest
      remainingBalance -= principalPayment
    }

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  const residual = Math.round(remainingBalance)
  if (residual !== 0 && schedule.length > 0) {
    const last = schedule[schedule.length - 1]
    last.principal += residual
    last.payment = last.principal + last.interest
    remainingBalance -= residual
    last.remainingBalance = 0
  }

  return schedule
}

export const generateThreeTierScheduleWithGrace = (principal, firstRate, secondRate, thirdRate, totalMonths, graceMonths) => {
  const schedule = []
  let remainingBalance = principal

  const rateForAbsMonth = (m) => {
    const absYear = Math.ceil(m / 12)
    if (absYear <= 1) return firstRate
    if (absYear === 2) return secondRate
    return thirdRate
  }

  for (let period = 1; period <= Math.min(graceMonths, totalMonths); period++) {
    const r = rateForAbsMonth(period)
    const interest = round(remainingBalance * r)
    schedule.push({
      period,
      payment: interest,
      principal: 0,
      interest,
      remainingBalance
    })
  }

  if (graceMonths >= totalMonths) return schedule

  const repayStart = graceMonths + 1
  const segments = []
  let segStart = repayStart
  let currentRate = rateForAbsMonth(segStart)
  for (let m = repayStart + 1; m <= totalMonths; m++) {
    const r = rateForAbsMonth(m)
    if (r !== currentRate) {
      segments.push({ start: segStart, end: m - 1, rate: currentRate })
      segStart = m
      currentRate = r
    }
  }
  segments.push({ start: segStart, end: totalMonths, rate: currentRate })

  let currentPayment = 0
  let periodCounter = repayStart
  for (let segIdx = 0; segIdx < segments.length; segIdx++) {
    const seg = segments[segIdx]
    const monthsLeft = totalMonths - periodCounter + 1
    const r = seg.rate
    if (r === 0) {
      currentPayment = round(remainingBalance / monthsLeft)
    } else {
      const pow = Math.pow(1 + r, monthsLeft)
      currentPayment = round(remainingBalance * (r * pow) / (pow - 1))
    }

    for (let p = seg.start; p <= seg.end; p++) {
      const isLastPeriod = p === totalMonths
      if (isLastPeriod) {
        const interest = round(remainingBalance * r)
        const principalPayment = remainingBalance
        const payment = principalPayment + interest
        remainingBalance = 0
        schedule.push({
          period: p,
          payment,
          principal: principalPayment,
          interest,
          remainingBalance: 0
        })
        break
      }

      const interest = round(remainingBalance * r)
      const principalPayment = currentPayment - interest
      remainingBalance -= principalPayment
      schedule.push({
        period: p,
        payment: currentPayment,
        principal: principalPayment,
        interest,
        remainingBalance: Math.max(0, remainingBalance)
      })
      periodCounter++
    }
  }

  return schedule
}

export const generateEqualPrincipalScheduleWithGrace = (principal, monthlyRate, totalMonths, graceMonths, monthlyPrincipal) => {
  const schedule = []
  let remainingBalance = principal
  const basePrincipal = monthlyPrincipal

  for (let period = 1; period <= totalMonths; period++) {
    const isLast = period === totalMonths
    let interest, payment, principalPayment
    
    if (period <= graceMonths) {
      interest = round(remainingBalance * monthlyRate)
      payment = interest
      principalPayment = 0
    } else {
      interest = round(remainingBalance * monthlyRate)
      principalPayment = isLast ? remainingBalance : round(basePrincipal)
      payment = principalPayment + interest
      remainingBalance -= principalPayment
    }

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}

export const generateTwoTierEqualPrincipalScheduleWithGrace = (principal, firstRate, secondRate, totalMonths, graceMonths, monthlyPrincipal) => {
  const schedule = []
  let remainingBalance = principal
  const basePrincipal = monthlyPrincipal

  for (let period = 1; period <= totalMonths; period++) {
    const isLast = period === totalMonths
    let interest, payment, principalPayment
    
    if (period <= graceMonths) {
      const year = Math.ceil(period / 12)
      const rate = year <= 1 ? firstRate : secondRate
      interest = round(remainingBalance * rate)
      payment = interest
      principalPayment = 0
    } else {
      interest = round(remainingBalance * secondRate)
      principalPayment = isLast ? remainingBalance : round(basePrincipal)
      payment = principalPayment + interest
      remainingBalance -= principalPayment
    }

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}

export const generateThreeTierEqualPrincipalScheduleWithGrace = (principal, firstRate, secondRate, thirdRate, totalMonths, graceMonths, monthlyPrincipal) => {
  const schedule = []
  let remainingBalance = principal
  const basePrincipal = monthlyPrincipal

  for (let period = 1; period <= totalMonths; period++) {
    const isLast = period === totalMonths
    let interest, payment, principalPayment
    
    if (period <= graceMonths) {
      const year = Math.ceil(period / 12)
      let rate
      if (year <= 1) rate = firstRate
      else if (year <= 2) rate = secondRate
      else rate = thirdRate
      interest = round(remainingBalance * rate)
      payment = interest
      principalPayment = 0
    } else {
      interest = round(remainingBalance * thirdRate)
      principalPayment = isLast ? remainingBalance : round(basePrincipal)
      payment = principalPayment + interest
      remainingBalance -= principalPayment
    }

    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }

  return schedule
}
