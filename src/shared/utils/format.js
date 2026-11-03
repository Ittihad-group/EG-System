export function formatMoney(amount, lang = 'ar', currencyLabel = 'EGP') {
  const locale = lang === 'ar' ? 'ar-EG' : 'en-EG'
  return `${Number(amount || 0).toLocaleString(locale)} ${currencyLabel}`
}

export function sumBy(items, selector) {
  return (items || []).reduce((total, item) => total + Number(selector(item) || 0), 0)
}
