/** Master / transactional seed data for EG ERP — Egyptian-German WPC & PVC factory */

export const company = {
  name: {
    ar: 'المصرية الألمانية لتصنيع منتجات WPC & PVC',
    en: 'Egyptian-German for WPC & PVC Products',
  },
  short: { ar: 'المصرية الألمانية', en: 'Egyptian-German' },
  code: 'EG',
  plant: {
    ar: 'مصنع جمصة — المنطقة الصناعية المرحلة الثالثة',
    en: 'Gamasa Plant — Industrial Zone Phase 3',
  },
  address: {
    ar: 'الدقهلية، جمصه، المنطقة الصناعية المرحلة الثالثة – مصر',
    en: 'Dakahlia, Gamasa, Industrial Zone Phase 3 – Egypt',
  },
  hotline: '15536',
  phone: '+201555515536',
  email: 'contact@egerman-upvc.com',
  hours: { ar: '9ص – 5م', en: '9am – 5pm' },
}

/**
 * Roles = named bundles of permission keys (`<module>.<resource>.<action>`).
 * Prototype only: in production the backend owns roles and returns the
 * resolved permission list from `/me`.
 */
export const roles = {
  admin: {
    name: { ar: 'مدير النظام', en: 'Administrator' },
    permissions: ['*'],
  },
  sales_manager: {
    name: { ar: 'مدير مبيعات', en: 'Sales manager' },
    permissions: ['dashboard.view', 'sales.*', 'inventory.products.read', 'inventory.stock.read'],
  },
  accountant: {
    name: { ar: 'محاسب', en: 'Accountant' },
    permissions: ['dashboard.view', 'finance.*'],
  },
  purchasing_officer: {
    name: { ar: 'مسؤول مشتريات', en: 'Purchasing officer' },
    permissions: ['dashboard.view', 'purchasing.*', 'inventory.stock.read'],
  },
}

/** A user can hold several roles; their permissions are merged. */
export const users = [
  {
    id: 'u1',
    name: { ar: 'مدير النظام', en: 'System Admin' },
    email: 'admin@egerman-upvc.com',
    password: 'admin123',
    roles: ['admin'],
  },
  {
    id: 'u2',
    name: { ar: 'مدير المبيعات', en: 'Sales Manager' },
    email: 'sales@egerman-upvc.com',
    password: 'sales123',
    roles: ['sales_manager'],
  },
  {
    id: 'u3',
    name: { ar: 'المحاسب', en: 'Accountant' },
    email: 'accounts@egerman-upvc.com',
    password: 'accounts123',
    // Multi-module user: finance + purchasing in one session, one sidebar.
    roles: ['accountant', 'purchasing_officer'],
  },
]

export const categories = [
  { id: 'cat-doors', name: { ar: 'أبواب WPC & PVC', en: 'WPC & PVC Doors' } },
  { id: 'cat-clad', name: { ar: 'تجاليد WPC بديل الخشب', en: 'WPC Wood Cladding' } },
  { id: 'cat-foam', name: { ar: 'ألواح PVC فوم بورد', en: 'PVC Foam Boards' } },
  { id: 'cat-acc', name: { ar: 'إكسسوارات', en: 'Accessories' } },
]

export const warehouses = [
  {
    id: 'wh-fg',
    name: { ar: 'مخزن المنتجات التامة — جمصة', en: 'Finished Goods — Gamasa' },
    type: 'FG',
  },
  {
    id: 'wh-rm',
    name: { ar: 'مخزن الخامات', en: 'Raw Materials' },
    type: 'RM',
  },
  {
    id: 'wh-wip',
    name: { ar: 'تحت التشغيل', en: 'Work in Progress' },
    type: 'WIP',
  },
]

export const products = [
  {
    id: 'p-d134',
    sku: 'DOOR-D134',
    name: { ar: 'باب WPC مودرن D134', en: 'WPC Modern Door D134' },
    categoryId: 'cat-doors',
    uom: { ar: 'باب', en: 'Door' },
    heightCm: 215,
    widthsCm: [80, 90, 100, 110],
    colors: ['C205', 'C091', 'C102', 'C115', 'C132', 'C160', 'C173', 'C182', 'C198', 'C8001', 'C021'],
    priceExVat: 7100,
    cost: 4800,
    minStock: 20,
    features: {
      ar: ['مقاومة ماء ورطوبة 100%', 'عزل صوتي', 'مقاومة حريق', 'ثبات أبعاد'],
      en: ['100% moisture resistant', 'Sound insulation', 'Fire resistant', 'Dimensional stability'],
    },
  },
  {
    id: 'p-d132',
    sku: 'DOOR-D132',
    name: { ar: 'باب WPC مودرن D132', en: 'WPC Modern Door D132' },
    categoryId: 'cat-doors',
    uom: { ar: 'باب', en: 'Door' },
    heightCm: 215,
    widthsCm: [80, 90, 100, 110],
    colors: ['C205', 'C091', 'C102', 'C115', 'C132', 'C160', 'C173', 'C182', 'C198', 'C8001', 'C021'],
    priceExVat: 7100,
    cost: 4750,
    minStock: 20,
    features: {
      ar: ['مقاومة ماء ورطوبة 100%', 'عزل صوتي', 'مقاومة حريق'],
      en: ['100% moisture resistant', 'Sound insulation', 'Fire resistant'],
    },
  },
  {
    id: 'p-clad-16',
    sku: 'CLAD-16x280',
    name: {
      ar: 'تجاليد بديل خشب 16×280 سم',
      en: 'Wood-alt cladding 16×280 cm',
    },
    categoryId: 'cat-clad',
    uom: { ar: 'لوح', en: 'Panel' },
    heightCm: 280,
    widthsCm: [16],
    colors: ['91', '102', '115', '132', '160', '173', '182', '203', '205', '208', '211'],
    priceExVat: 250,
    cost: 140,
    minStock: 200,
    features: {
      ar: ['مظهر خشبي', 'مقاوم للماء', 'سهل التركيب'],
      en: ['Wood look', 'Water resistant', 'Easy install'],
    },
  },
  {
    id: 'p-foam-18',
    sku: 'FOAM-18',
    name: { ar: 'لوح PVC فوم بورد 18 مم', en: 'PVC Foam Board 18mm' },
    categoryId: 'cat-foam',
    uom: { ar: 'لوح', en: 'Sheet' },
    heightCm: null,
    widthsCm: [],
    colors: ['White'],
    priceExVat: 420,
    cost: 260,
    minStock: 100,
    features: {
      ar: ['خفيف الوزن', 'متعدد الاستخدامات'],
      en: ['Lightweight', 'Multi-purpose'],
    },
  },
  {
    id: 'p-acc-kit',
    sku: 'ACC-DOOR-KIT',
    name: {
      ar: 'طقم إكسسوارات باب (أوكرة + كالون + مفصلات)',
      en: 'Door accessories kit (handles + lock + hinges)',
    },
    categoryId: 'cat-acc',
    uom: { ar: 'طقم', en: 'Kit' },
    heightCm: null,
    widthsCm: [],
    colors: [],
    priceExVat: 450,
    cost: 220,
    minStock: 50,
    features: {
      ar: ['2 أوكرة', 'كالون مقاوم صدأ', '3 مفصلات'],
      en: ['2 handles', 'Rust-resistant lock', '3 hinges'],
    },
  },
]

export const inventory = [
  { id: 'inv1', productId: 'p-d134', warehouseId: 'wh-fg', qty: 86, reserved: 12 },
  { id: 'inv2', productId: 'p-d132', warehouseId: 'wh-fg', qty: 54, reserved: 8 },
  { id: 'inv3', productId: 'p-clad-16', warehouseId: 'wh-fg', qty: 1240, reserved: 180 },
  { id: 'inv4', productId: 'p-foam-18', warehouseId: 'wh-fg', qty: 320, reserved: 40 },
  { id: 'inv5', productId: 'p-acc-kit', warehouseId: 'wh-fg', qty: 210, reserved: 25 },
  { id: 'inv6', productId: 'p-d134', warehouseId: 'wh-wip', qty: 18, reserved: 0 },
  { id: 'inv7', productId: 'p-clad-16', warehouseId: 'wh-wip', qty: 90, reserved: 0 },
]

export const customers = [
  {
    id: 'c1',
    code: 'CUS-001',
    name: { ar: 'شركة العدس — سلطنة عُمان', en: 'Al-Adas Co. — Oman' },
    type: 'dealer',
    phone: '+96800000000',
    email: 'oman@example.com',
    city: { ar: 'مسقط', en: 'Muscat' },
    balance: 185000,
  },
  {
    id: 'c2',
    code: 'CUS-002',
    name: { ar: 'موزع معتمد — الدقهلية', en: 'Authorized dealer — Dakahlia' },
    type: 'dealer',
    phone: '+201000000001',
    email: 'dakahlia@example.com',
    city: { ar: 'المنصورة', en: 'Mansoura' },
    balance: 42000,
  },
  {
    id: 'c3',
    code: 'CUS-003',
    name: { ar: 'مقاول مشاريع سكنية', en: 'Residential contractor' },
    type: 'contractor',
    phone: '+201000000002',
    email: 'contractor@example.com',
    city: { ar: 'القاهرة', en: 'Cairo' },
    balance: 96000,
  },
  {
    id: 'c4',
    code: 'CUS-004',
    name: { ar: 'عميل تجزئة — استلام مصنع', en: 'Retail pickup — factory' },
    type: 'retail',
    phone: '+201555515536',
    email: 'contact@egerman-upvc.com',
    city: { ar: 'جمصة', en: 'Gamasa' },
    balance: 0,
  },
]

export const suppliers = [
  {
    id: 's1',
    code: 'SUP-001',
    name: { ar: 'مورد خامات WPC أوروبي', en: 'European WPC raw materials' },
    phone: '+490000000',
    email: 'eu-rm@example.com',
    category: 'RM',
    balance: -128000,
  },
  {
    id: 's2',
    code: 'SUP-002',
    name: { ar: 'مورد إكسسوارات أبواب', en: 'Door accessories supplier' },
    phone: '+201100000003',
    email: 'acc@example.com',
    category: 'ACC',
    balance: -18500,
  },
  {
    id: 's3',
    code: 'SUP-003',
    name: { ar: 'مورد تغليف وشحن', en: 'Packaging & shipping supplier' },
    phone: '+201100000004',
    email: 'pack@example.com',
    category: 'LOG',
    balance: -6200,
  },
]

export const salesOrders = [
  {
    id: 'so1',
    number: 'SO-2025-0142',
    customerId: 'c2',
    date: '2025-10-28',
    status: 'confirmed',
    payment: 'credit',
    lines: [
      { productId: 'p-d134', qty: 12, widthCm: 90, color: 'C205', unitPrice: 7100 },
      { productId: 'p-acc-kit', qty: 12, widthCm: null, color: null, unitPrice: 450 },
    ],
  },
  {
    id: 'so2',
    number: 'SO-2025-0143',
    customerId: 'c3',
    date: '2025-10-30',
    status: 'production',
    payment: 'partial',
    lines: [
      { productId: 'p-clad-16', qty: 400, widthCm: 16, color: '160', unitPrice: 250 },
      { productId: 'p-foam-18', qty: 40, widthCm: null, color: 'White', unitPrice: 420 },
    ],
  },
  {
    id: 'so3',
    number: 'SO-2025-0144',
    customerId: 'c1',
    date: '2025-11-01',
    status: 'shipped',
    payment: 'paid',
    lines: [
      { productId: 'p-d132', qty: 30, widthCm: 100, color: 'C091', unitPrice: 7100 },
      { productId: 'p-d134', qty: 20, widthCm: 110, color: 'C115', unitPrice: 7100 },
    ],
  },
  {
    id: 'so4',
    number: 'SO-2025-0145',
    customerId: 'c4',
    date: '2025-11-02',
    status: 'draft',
    payment: 'cash',
    lines: [
      { productId: 'p-d134', qty: 2, widthCm: 80, color: 'C8001', unitPrice: 7100 },
    ],
  },
]

export const purchaseOrders = [
  {
    id: 'po1',
    number: 'PO-2025-0031',
    supplierId: 's1',
    date: '2025-10-20',
    status: 'received',
    total: 240000,
    note: { ar: 'شحنة خامات WPC', en: 'WPC raw materials shipment' },
  },
  {
    id: 'po2',
    number: 'PO-2025-0032',
    supplierId: 's2',
    date: '2025-10-29',
    status: 'ordered',
    total: 45000,
    note: { ar: 'أطقم إكسسوارات أبواب', en: 'Door accessory kits' },
  },
]

export const workOrders = [
  {
    id: 'wo1',
    number: 'WO-2025-0088',
    productId: 'p-d134',
    qty: 40,
    salesOrderId: 'so2',
    startDate: '2025-10-31',
    dueDate: '2025-11-08',
    status: 'in_progress',
    line: { ar: 'خط الأبواب 1', en: 'Doors line 1' },
    progress: 55,
  },
  {
    id: 'wo2',
    number: 'WO-2025-0089',
    productId: 'p-clad-16',
    qty: 500,
    salesOrderId: 'so2',
    startDate: '2025-11-01',
    dueDate: '2025-11-06',
    status: 'queued',
    line: { ar: 'خط التجاليد', en: 'Cladding line' },
    progress: 0,
  },
  {
    id: 'wo3',
    number: 'WO-2025-0087',
    productId: 'p-d132',
    qty: 30,
    salesOrderId: 'so3',
    startDate: '2025-10-22',
    dueDate: '2025-10-30',
    status: 'done',
    line: { ar: 'خط الأبواب 2', en: 'Doors line 2' },
    progress: 100,
  },
]

export const employees = [
  {
    id: 'e1',
    code: 'EMP-001',
    name: { ar: 'أحمد محمود', en: 'Ahmed Mahmoud' },
    dept: { ar: 'الإنتاج', en: 'Production' },
    title: { ar: 'مشرف خط أبواب', en: 'Doors line supervisor' },
    phone: '+201000100001',
    status: 'active',
    joinDate: '2022-03-01',
  },
  {
    id: 'e2',
    code: 'EMP-002',
    name: { ar: 'سارة علي', en: 'Sara Ali' },
    dept: { ar: 'المبيعات', en: 'Sales' },
    title: { ar: 'أخصائية مبيعات', en: 'Sales specialist' },
    phone: '+201000100002',
    status: 'active',
    joinDate: '2023-06-15',
  },
  {
    id: 'e3',
    code: 'EMP-003',
    name: { ar: 'محمود حسن', en: 'Mahmoud Hassan' },
    dept: { ar: 'الجودة', en: 'Quality' },
    title: { ar: 'مهندس جودة', en: 'Quality engineer' },
    phone: '+201000100003',
    status: 'active',
    joinDate: '2021-11-10',
  },
  {
    id: 'e4',
    code: 'EMP-004',
    name: { ar: 'يوسف كمال', en: 'Youssef Kamal' },
    dept: { ar: 'المخازن', en: 'Warehouse' },
    title: { ar: 'أمين مخزن', en: 'Storekeeper' },
    phone: '+201000100004',
    status: 'active',
    joinDate: '2024-01-20',
  },
  {
    id: 'e5',
    code: 'EMP-005',
    name: { ar: 'كريم فتحي', en: 'Karim Fathy' },
    dept: { ar: 'التركيب', en: 'Installation' },
    title: { ar: 'فني تركيب', en: 'Installation technician' },
    phone: '+201000100005',
    status: 'active',
    joinDate: '2023-09-01',
  },
]

export const financeSummary = {
  currency: 'EGP',
  receivables: 323000,
  payables: 152700,
  cash: 410500,
  monthSales: 528400,
  monthPurchases: 285000,
  vatRate: 0.14,
}

/**
 * Activity feed. Each event carries the permission needed to see it.
 * The backend must return only events the user may see; the UI filters again.
 */
export const activity = [
  {
    id: 'a1',
    type: 'sales',
    permission: 'sales.orders.read',
    text: {
      ar: 'تأكيد أمر بيع SO-2025-0142 لموزع الدقهلية',
      en: 'Confirmed sales order SO-2025-0142 for Dakahlia dealer',
    },
    at: '2025-11-02 09:40',
  },
  {
    id: 'a2',
    type: 'production',
    permission: 'production.work-orders.read',
    text: {
      ar: 'تقدم أمر تشغيل WO-2025-0088 إلى 55%',
      en: 'Work order WO-2025-0088 progressed to 55%',
    },
    at: '2025-11-02 11:15',
  },
  {
    id: 'a3',
    type: 'inventory',
    permission: 'inventory.stock.read',
    text: {
      ar: 'صرف 12 باب D134 من مخزن المنتجات التامة',
      en: 'Issued 12× D134 doors from finished goods',
    },
    at: '2025-11-01 16:20',
  },
  {
    id: 'a4',
    type: 'purchase',
    permission: 'purchasing.orders.read',
    text: {
      ar: 'إنشاء أمر شراء PO-2025-0032 لإكسسوارات الأبواب',
      en: 'Created purchase order PO-2025-0032 for door accessories',
    },
    at: '2025-10-29 14:05',
  },
]
