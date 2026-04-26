function normalizeEmail(value = "") {
  return value.trim().toLowerCase()
}

function normalizePhone(value = "") {
  return value.replace(/\D/g, "")
}

function makeCustomerToken() {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase()
  const timePart = Date.now().toString(36).toUpperCase()
  return `CUST-${timePart}-${randomPart}`
}

module.exports = {
  normalizeEmail,
  normalizePhone,
  makeCustomerToken,
}
