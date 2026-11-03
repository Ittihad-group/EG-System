# EG-System ERP

نظام تخطيط موارد المؤسسات (ERP) لمصنع **المصرية الألمانية لتصنيع منتجات WPC & PVC** — جمصة، الدقهلية.

Internal ERP for the Egyptian-German WPC & PVC manufacturing plant (Gamasa, Dakahlia).

## Modules

| Module | Arabic | Purpose |
|--------|--------|---------|
| Dashboard | لوحة التحكم | KPIs, open orders, production, activity |
| Products | المنتجات | SKU master (doors, cladding, foam, accessories) |
| Inventory | المخزون | Warehouses FG / RM / WIP, stock & reservations |
| Sales | المبيعات | Sales orders, line items, payment status |
| Production | الإنتاج | Work orders & line progress |
| Customers | العملاء والموزعين | Dealers, contractors, retail |
| Suppliers | الموردين | Raw materials & accessories vendors |
| Purchases | المشتريات | Purchase orders |
| HR | الموارد البشرية | Employees by department |
| Finance | المالية | Receivables, payables, cash, month sales |
| Settings | الإعدادات | Company profile & language |

## Company context baked into seed data

- Plant: Gamasa Industrial Zone Phase 3
- Hotline: `15536` · Phone: `+201555515536` · Email: `contact@egerman-upvc.com`
- Product lines: WPC doors (D134 / D132), WPC cladding 16×280, PVC foam boards, door accessory kits
- Sample dealer: Al-Adas (Oman)

## Stack

- React + Vite
- React Router
- Local seed data (frontend prototype — ready to wire to a real API/DB later)
- Bilingual Arabic (RTL) / English

## Demo login

```
admin@egerman-upvc.com / admin123
sales@egerman-upvc.com / sales123
```

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```
