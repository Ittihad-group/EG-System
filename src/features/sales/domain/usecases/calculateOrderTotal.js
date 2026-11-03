/** Pure domain rule: sales order monetary total from line items. */
export function calculateOrderTotal(order) {
  if (!order?.lines?.length) return 0
  return order.lines.reduce((sum, line) => sum + Number(line.qty || 0) * Number(line.unitPrice || 0), 0)
}
