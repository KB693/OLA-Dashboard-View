// app.js - OLA Delivery Analytics Dashboard
// Hardcoded JSON dummy datasets for BFRDD, PWCC, NSW (full original schema present).
// Displays only selected client's selected report section (monthly/weekly/yearly).
// Business Date formatted to DD-MM-YYYY. OLA_Met added (dummy rule).
// Pie shows OLA Met vs Not Met. Line shows OLA Met % trend. Tables sortable by header click.

// ------------------------------ State & Charts ------------------------------
let currentClient = 'BFRDD';
let charts = { monthlyPie: null, monthlyLine: null, weeklyPie: null, weeklyLine: null, yearlyPie: null, yearlyLine: null };

// ------------------------------ Hardcoded dummy JSON (full schema) ------------------------------
const clientsData = {
  BFRDD: [
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_PBF_1", "business_date": "20230312", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "19", "file_path": "project/sdpguat/ctb/private/CCO_20230312.json", "status": "Published", "event_id": "E-BFRDD-001", "creation_date": "2023-03-12", "creation_timestamp": "2023-03-12 10:00:00 UTC", "end_execution": "2023-03-12 10:10:08 UTC", "LegalEntity": "PBF" },
    { "protocol": "PricingFeed", "sdp_name": "PRC_PBF_1", "business_date": "20230618", "delivery_type": "daily", "delivery_mode": "incremental", "event_type": "dataset", "version": "20", "file_path": "project/sdpguat/ctb/private/PRC_20230618.json", "status": "Published", "event_id": "E-BFRDD-002", "creation_date": "2023-06-18", "creation_timestamp": "2023-06-18 09:15:00 UTC", "end_execution": "2023-06-18 09:20:08 UTC", "LegalEntity": "PBF" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_PBF_2", "business_date": "20231205", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "21", "file_path": "project/sdpguat/ctb/private/CCO_20231205.json", "status": "Published", "event_id": "E-BFRDD-003", "creation_date": "2023-12-05", "creation_timestamp": "2023-12-05 14:00:00 UTC", "end_execution": "2023-12-05 14:22:08 UTC", "LegalEntity": "PBF" },
    { "protocol": "InventoryFeed", "sdp_name": "INV_PBF_1", "business_date": "20240214", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "22", "file_path": "project/sdpguat/ctb/private/INV_20240214.json", "status": "Published", "event_id": "E-BFRDD-004", "creation_date": "2024-02-14", "creation_timestamp": "2024-02-14 07:50:00 UTC", "end_execution": "2024-02-14 07:55:08 UTC", "LegalEntity": "PBF" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_PBF_3", "business_date": "20240528", "delivery_type": "daily", "delivery_mode": "incremental", "event_type": "dataset", "version": "23", "file_path": "project/sdpguat/ctb/private/CCO_20240528.json", "status": "Published", "event_id": "E-BFRDD-005", "creation_date": "2024-05-28", "creation_timestamp": "2024-05-28 16:40:00 UTC", "end_execution": "2024-05-28 16:45:08 UTC", "LegalEntity": "PBF" },
    { "protocol": "PricingFeed", "sdp_name": "PRC_PBF_2", "business_date": "20240809", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "24", "file_path": "project/sdpguat/ctb/private/PRC_20240809.json", "status": "Published", "event_id": "E-BFRDD-006", "creation_date": "2024-08-09", "creation_timestamp": "2024-08-09 11:30:00 UTC", "end_execution": "2024-08-09 11:33:08 UTC", "LegalEntity": "PBF" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_PBF_4", "business_date": "20241117", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "25", "file_path": "project/sdpguat/ctb/private/CCO_20241117.json", "status": "Published", "event_id": "E-BFRDD-007", "creation_date": "2024-11-17", "creation_timestamp": "2024-11-17 09:36:00 UTC", "end_execution": "2024-11-17 09:40:08 UTC", "LegalEntity": "PBF" },
    { "protocol": "InventoryFeed", "sdp_name": "INV_PBF_2", "business_date": "20250303", "delivery_type": "daily", "delivery_mode": "incremental", "event_type": "dataset", "version": "26", "file_path": "project/sdpguat/ctb/private/INV_20250303.json", "status": "Published", "event_id": "E-BFRDD-008", "creation_date": "2025-03-03", "creation_timestamp": "2025-03-03 13:25:00 UTC", "end_execution": "2025-03-03 13:28:08 UTC", "LegalEntity": "PBF" },
    { "protocol": "PricingFeed", "sdp_name": "PRC_PBF_3", "business_date": "20250625", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "27", "file_path": "project/sdpguat/ctb/private/PRC_20250625.json", "status": "Published", "event_id": "E-BFRDD-009", "creation_date": "2025-06-25", "creation_timestamp": "2025-06-25 18:00:00 UTC", "end_execution": "2025-06-25 18:05:08 UTC", "LegalEntity": "PBF" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_PBF_5", "business_date": "20250910", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "28", "file_path": "project/sdpguat/ctb/private/CCO_20250910.json", "status": "Published", "event_id": "E-BFRDD-010", "creation_date": "2025-09-10", "creation_timestamp": "2025-09-10 07:56:00 UTC", "end_execution": "2025-09-10 07:59:08 UTC", "LegalEntity": "PBF" }
  ],
  PWCC: [
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_PW_1", "business_date": "20230107", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "12", "file_path": "project/pwcc/cc_20230107.json", "status": "Published", "event_id": "E-PWCC-001", "creation_date": "2023-01-07", "creation_timestamp": "2023-01-07 08:10:00 UTC", "end_execution": "2023-01-07 08:15:08 UTC", "LegalEntity": "PW" },
    { "protocol": "InventoryFeed", "sdp_name": "INV_PW_1", "business_date": "20230419", "delivery_type": "daily", "delivery_mode": "incremental", "event_type": "dataset", "version": "14", "file_path": "project/pwcc/inv_20230419.json", "status": "Published", "event_id": "E-PWCC-002", "creation_date": "2023-04-19", "creation_timestamp": "2023-04-19 12:28:00 UTC", "end_execution": "2023-04-19 12:30:08 UTC", "LegalEntity": "PW" },
    { "protocol": "PricingFeed", "sdp_name": "PRC_PW_1", "business_date": "20230723", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "15", "file_path": "project/pwcc/prc_20230723.json", "status": "Published", "event_id": "E-PWCC-003", "creation_date": "2023-07-23", "creation_timestamp": "2023-07-23 14:45:00 UTC", "end_execution": "2023-07-23 14:50:08 UTC", "LegalEntity": "PW" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_PW_2", "business_date": "20231030", "delivery_type": "daily", "delivery_mode": "incremental", "event_type": "dataset", "version": "16", "file_path": "project/pwcc/cc_20231030.json", "status": "Published", "event_id": "E-PWCC-004", "creation_date": "2023-10-30", "creation_timestamp": "2023-10-30 09:16:00 UTC", "end_execution": "2023-10-30 09:20:08 UTC", "LegalEntity": "PW" },
    { "protocol": "PricingFeed", "sdp_name": "PRC_PW_2", "business_date": "20240211", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "17", "file_path": "project/pwcc/prc_20240211.json", "status": "Published", "event_id": "E-PWCC-005", "creation_date": "2024-02-11", "creation_timestamp": "2024-02-11 06:36:00 UTC", "end_execution": "2024-02-11 06:40:08 UTC", "LegalEntity": "PW" },
    { "protocol": "InventoryFeed", "sdp_name": "INV_PW_2", "business_date": "20240505", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "18", "file_path": "project/pwcc/inv_20240505.json", "status": "Published", "event_id": "E-PWCC-006", "creation_date": "2024-05-05", "creation_timestamp": "2024-05-05 16:56:00 UTC", "end_execution": "2024-05-05 17:00:08 UTC", "LegalEntity": "PW" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_PW_3", "business_date": "20240718", "delivery_type": "daily", "delivery_mode": "incremental", "event_type": "dataset", "version": "19", "file_path": "project/pwcc/cc_20240718.json", "status": "Published", "event_id": "E-PWCC-007", "creation_date": "2024-07-18", "creation_timestamp": "2024-07-18 15:18:00 UTC", "end_execution": "2024-07-18 15:22:08 UTC", "LegalEntity": "PW" },
    { "protocol": "PricingFeed", "sdp_name": "PRC_PW_3", "business_date": "20241209", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "20", "file_path": "project/pwcc/prc_20241209.json", "status": "Published", "event_id": "E-PWCC-008", "creation_date": "2024-12-09", "creation_timestamp": "2024-12-09 07:42:00 UTC", "end_execution": "2024-12-09 07:45:08 UTC", "LegalEntity": "PW" },
    { "protocol": "InventoryFeed", "sdp_name": "INV_PW_3", "business_date": "20250315", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "21", "file_path": "project/pwcc/inv_20250315.json", "status": "Published", "event_id": "E-PWCC-009", "creation_date": "2025-03-15", "creation_timestamp": "2025-03-15 08:08:00 UTC", "end_execution": "2025-03-15 08:11:08 UTC", "LegalEntity": "PW" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_PW_4", "business_date": "20250828", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "22", "file_path": "project/pwcc/cc_20250828.json", "status": "Published", "event_id": "E-PWCC-010", "creation_date": "2025-08-28", "creation_timestamp": "2025-08-28 19:00:00 UTC", "end_execution": "2025-08-28 19:05:08 UTC", "LegalEntity": "PW" }
  ],
  NSW: [
    { "protocol": "PricingFeed", "sdp_name": "PRC_NSW_1", "business_date": "20230203", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "9", "file_path": "project/nsw/prc_20230203.json", "status": "Published", "event_id": "E-NSW-001", "creation_date": "2023-02-03", "creation_timestamp": "2023-02-03 09:10:00 UTC", "end_execution": "2023-02-03 09:12:08 UTC", "LegalEntity": "NSW" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_NSW_1", "business_date": "20230511", "delivery_type": "daily", "delivery_mode": "incremental", "event_type": "dataset", "version": "10", "file_path": "project/nsw/cc_20230511.json", "status": "Published", "event_id": "E-NSW-002", "creation_date": "2023-05-11", "creation_timestamp": "2023-05-11 16:40:00 UTC", "end_execution": "2023-05-11 16:42:08 UTC", "LegalEntity": "NSW" },
    { "protocol": "InventoryFeed", "sdp_name": "INV_NSW_1", "business_date": "20230829", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "11", "file_path": "project/nsw/inv_20230829.json", "status": "Published", "event_id": "E-NSW-003", "creation_date": "2023-08-29", "creation_timestamp": "2023-08-29 10:50:00 UTC", "end_execution": "2023-08-29 10:55:08 UTC", "LegalEntity": "NSW" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_NSW_2", "business_date": "20231114", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "12", "file_path": "project/nsw/cc_20231114.json", "status": "Published", "event_id": "E-NSW-004", "creation_date": "2023-11-14", "creation_timestamp": "2023-11-14 07:33:00 UTC", "end_execution": "2023-11-14 07:35:08 UTC", "LegalEntity": "NSW" },
    { "protocol": "PricingFeed", "sdp_name": "PRC_NSW_2", "business_date": "20240306", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "13", "file_path": "project/nsw/prc_20240306.json", "status": "Published", "event_id": "E-NSW-005", "creation_date": "2024-03-06", "creation_timestamp": "2024-03-06 12:18:00 UTC", "end_execution": "2024-03-06 12:20:08 UTC", "LegalEntity": "NSW" },
    { "protocol": "InventoryFeed", "sdp_name": "INV_NSW_2", "business_date": "20240622", "delivery_type": "daily", "delivery_mode": "incremental", "event_type": "dataset", "version": "14", "file_path": "project/nsw/inv_20240622.json", "status": "Published", "event_id": "E-NSW-006", "creation_date": "2024-06-22", "creation_timestamp": "2024-06-22 17:58:00 UTC", "end_execution": "2024-06-22 18:00:08 UTC", "LegalEntity": "NSW" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_NSW_3", "business_date": "20240919", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "15", "file_path": "project/nsw/cc_20240919.json", "status": "Published", "event_id": "E-NSW-007", "creation_date": "2024-09-19", "creation_timestamp": "2024-09-19 11:26:00 UTC", "end_execution": "2024-09-19 11:28:08 UTC", "LegalEntity": "NSW" },
    { "protocol": "PricingFeed", "sdp_name": "PRC_NSW_3", "business_date": "20250214", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "16", "file_path": "project/nsw/prc_20250214.json", "status": "Published", "event_id": "E-NSW-008", "creation_date": "2025-02-14", "creation_timestamp": "2025-02-14 08:30:00 UTC", "end_execution": "2025-02-14 08:33:08 UTC", "LegalEntity": "NSW" },
    { "protocol": "InventoryFeed", "sdp_name": "INV_NSW_3", "business_date": "20250630", "delivery_type": "daily", "delivery_mode": "full", "event_type": "dataset", "version": "17", "file_path": "project/nsw/inv_20250630.json", "status": "Published", "event_id": "E-NSW-009", "creation_date": "2025-06-30", "creation_timestamp": "2025-06-30 14:12:00 UTC", "end_execution": "2025-06-30 14:15:08 UTC", "LegalEntity": "NSW" },
    { "protocol": "CollateralCoverage", "sdp_name": "CCO_NSW_4", "business_date": "20250905", "delivery_type": "daily", "delivery_mode": "incremental", "event_type": "dataset", "version": "18", "file_path": "project/nsw/cc_20250905.json", "status": "Published", "event_id": "E-NSW-010", "creation_date": "2025-09-05", "creation_timestamp": "2025-09-05 09:47:00 UTC", "end_execution": "2025-09-05 09:50:08 UTC", "LegalEntity": "NSW" }
  ]
};

// ------------------------------ Helpers ------------------------------
function parseBusinessDate(biz) {
  if (!biz || biz.length !== 8) return null;
  const yyyy = biz.slice(0, 4), mm = biz.slice(4, 6), dd = biz.slice(6, 8);
  const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
  return {
    formatted: `${dd}-${mm}-${yyyy}`,
    year: yyyy,
    monthKey: `${yyyy}-${mm}`,
    monthLabel: `${mm}-${yyyy}`,
    dayKey: `${yyyy}${mm}${dd}`,
    dateObj
  };
}
function getISOWeekKey(dateObj) {
  // returns "YYYY-Www" iso week
  const d = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}
function computeOLAMet(raw) {
  // Dummy placeholder logic: protocol containing 'collateral' => Yes
  return (raw.protocol && raw.protocol.toLowerCase().includes('collateral')) ? 'Yes' : 'No';
}
function normalizeRaw(raw) {
  const p = parseBusinessDate(raw.business_date);
  const wk = p && p.dateObj ? getISOWeekKey(p.dateObj) : '';
  return {
    // Display fields:
    Protocol: raw.protocol || '',
    BusinessDateRaw: raw.business_date || '',
    BusinessDate: p ? p.formatted : raw.business_date || '',
    BusinessYear: p ? p.year : '',
    BusinessMonthKey: p ? p.monthKey : '',
    BusinessMonthLabel: p ? p.monthLabel : '',
    BusinessDayKey: p ? p.dayKey : '',
    BusinessWeekKey: wk,
    BusinessWeekLabel: wk,
    DeliveryType: raw.delivery_type || '',
    DeliveryMode: raw.delivery_mode || '',
    EndExecution: raw.end_execution || '',
    LegalEntity: raw.LegalEntity || '',
    OLA_Met: computeOLAMet(raw),
    // Keep raw JSON fields available if needed
    _raw: raw
  };
}

// ------------------------------ Grouping & aggregation ------------------------------
function groupMonthly(records) {
  const map = {};
  records.forEach(r => {
    const k = r.BusinessMonthKey || 'unknown';
    if (!map[k]) map[k] = { label: r.BusinessMonthLabel || k, items: [] };
    map[k].items.push(r);
  });
  return Object.keys(map).sort().map(k => ({ key: k, label: map[k].label, items: map[k].items }));
}
function groupWeekly(records) {
  const map = {};
  records.forEach(r => {
    const k = r.BusinessWeekKey || 'unknown';
    if (!map[k]) map[k] = { label: r.BusinessWeekLabel || k, items: [] };
    map[k].items.push(r);
  });
  return Object.keys(map).sort().map(k => ({ key: k, label: map[k].label, items: map[k].items }));
}
function groupYearly(records) {
  const map = {};
  records.forEach(r => {
    const k = r.BusinessYear || 'unknown';
    if (!map[k]) map[k] = { label: k, items: [] };
    map[k].items.push(r);
  });
  return Object.keys(map).sort().map(k => ({ key: k, label: map[k].label, items: map[k].items }));
}
function buildTrend(groups) {
  const labels = [], values = [];
  groups.forEach(g => {
    labels.push(g.label);
    const total = g.items.length, yes = g.items.filter(i => i.OLA_Met === 'Yes').length;
    values.push(total === 0 ? 0 : Math.round((yes / total) * 100));
  });
  return { labels, values };
}
function computeYesNo(records) {
  const total = records.length;
  const yes = records.filter(r => r.OLA_Met === 'Yes').length;
  return { labels: ['OLA Met', 'Not Met'], values: [yes, total - yes] };
}

// ------------------------------ Chart helpers ------------------------------
function destroyChart(c) { if (c && typeof c.destroy === 'function') c.destroy(); }
function clearAllCharts() {
  destroyChart(charts.monthlyPie); destroyChart(charts.monthlyLine);
  destroyChart(charts.weeklyPie); destroyChart(charts.weeklyLine);
  destroyChart(charts.yearlyPie); destroyChart(charts.yearlyLine);
  charts = { monthlyPie: null, monthlyLine: null, weeklyPie: null, weeklyLine: null, yearlyPie: null, yearlyLine: null };
}

// Helper to get last N years as strings
function getLastNYears(n) {
  const now = new Date();
  const years = [];
  for (let i = 0; i < n; i++) {
    years.unshift(String(now.getFullYear() - i));
  }
  return years;
}

// Helper to get all 12 months as "Jan", "Feb", etc.
function getAllMonths() {
  return [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
}

// Helper to get week labels: "W01", "W08", ..., "W50"
function getEvery7thWeekLabels() {
  const weeks = [];
  for (let w = 1; w <= 52; w += 7) {
    weeks.push('W' + String(w).padStart(2, '0'));
  }
  return weeks;
}

// Map your grouped data to the fixed labels
function mapMonthlyDataToLabels(groups) {
  const monthLabels = getAllMonths();
  // groups: [{label: "03-2024", ...}], label is MM-YYYY
  const dataMap = {};
  groups.forEach(g => {
    // Parse month from label
    const [mm, yyyy] = g.label.split('-');
    dataMap[mm] = g.items.map(i => i.OLA_Met === 'Yes' ? 1 : 0).reduce((a, b) => a + b, 0) / g.items.length;
  });
  // Map to Jan, Feb, ... order
  return monthLabels.map((m, idx) => {
    const mm = String(idx + 1).padStart(2, '0');
    return dataMap[mm] !== undefined ? dataMap[mm] : null;
  });
}

function mapWeeklyDataToLabels(groups) {
  const weekLabels = getEvery7thWeekLabels();
  // groups: [{label: "2024-W07", ...}]
  const dataMap = {};
  groups.forEach(g => {
    // Parse week from label
    const parts = g.label.split('-W');
    if (parts.length === 2) {
      dataMap['W' + parts[1]] = g.items.map(i => i.OLA_Met === 'Yes' ? 1 : 0).reduce((a, b) => a + b, 0) / g.items.length;
    }
  });
  return weekLabels.map(w => dataMap[w] !== undefined ? dataMap[w] : null);
}

function mapYearlyDataToLabels(groups) {
  const yearLabels = getLastNYears(5);
  const dataMap = {};
  groups.forEach(g => {
    dataMap[g.label] = g.items.map(i => i.OLA_Met === 'Yes' ? 1 : 0).reduce((a, b) => a + b, 0) / g.items.length;
  });
  return yearLabels.map(y => dataMap[y] !== undefined ? dataMap[y] : null);
}

function getAvailableYears(records) {
  // Returns sorted array of unique years as strings
  return Array.from(new Set(records.map(r => r.BusinessYear))).sort();
}

function populateYearSelectors(records) {
  const years = getAvailableYears(records);
  const monthlySelect = document.getElementById('monthlyYearSelect');
  const weeklySelect = document.getElementById('weeklyYearSelect');
  // Preserve current selection
  const monthlyPrev = monthlySelect ? monthlySelect.value : null;
  const weeklyPrev = weeklySelect ? weeklySelect.value : null;
  if (monthlySelect) {
    monthlySelect.innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join('');
    // Restore previous selection if possible
    if (monthlyPrev && years.includes(monthlyPrev)) monthlySelect.value = monthlyPrev;
  }
  if (weeklySelect) {
    weeklySelect.innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join('');
    // Restore previous selection if possible
    if (weeklyPrev && years.includes(weeklyPrev)) weeklySelect.value = weeklyPrev;
  }
}

// ------------------------------ Render functions (only populate active section) ------------------------------
function renderMonthly(records) {
  // const groups = groupMonthly(records);
  // // const trend = buildTrend(groups);
  // const yesno = computeYesNo(records);

  // Get selected year for chart
  const yearSelect = document.getElementById('monthlyYearSelect');
  const selectedYear = yearSelect ? yearSelect.value : null;
  // Filter for chart only
  const chartRecords = selectedYear ? records.filter(r => r.BusinessYear === selectedYear) : records;
  const groups = groupMonthly(chartRecords);
  const yesno = computeYesNo(chartRecords);

  // Pie (OLA Met vs Not Met)
  const pieCtx = document.getElementById('monthlyTimelinessPie').getContext('2d');
  destroyChart(charts.monthlyPie);
  charts.monthlyPie = new Chart(pieCtx, {
    type: 'pie',
    data: { labels: yesno.labels, datasets: [{ data: yesno.values, backgroundColor: ['#10B981', '#EF4444'] }] },
    options: { responsive: true, plugins: { legend: { labels: { color: 'white' } } } }
  });

  // Line (month trend)
  const lineCtx = document.getElementById('monthlyTrendsLine').getContext('2d');
  destroyChart(charts.monthlyLine);
  charts.monthlyLine = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: getAllMonths(),
      datasets: [{
        label: 'OLA Met vs NotMet',
        // data: groups.map(g => g.items.map(i => i.OLA_Met === 'Yes' ? 1 : 0).reduce((a, b) => a + b, 0) / g.items.length),
        data: mapMonthlyDataToLabels(groups),
        borderColor: '#10B981',
        fill: false,
        spanGaps: true // Connect points across nulls
      }]
    },
    options: {
      responsive: true,
      // elements: { line: { tension: 0.4 } }, // Smooth line
      scales: {
        x: { ticks: { color: 'white', maxRotation: 45, minRotation: 30, autoSkip: false } },
        // Add rotation for x-axis labels (see below)
        y: { min: 0, max: 1, ticks: { color: 'white', callback: v => v === 1 ? 'Yes' : (v === 0 ? 'No' : '') } }
      },
      plugins: { legend: { labels: { color: 'white' } } }
    }
  });

  populateMonthlyTable(records);
}

function renderWeekly(records) {
  // const groups = groupWeekly(records);
  // // const trend = buildTrend(groups);
  // const yesno = computeYesNo(records);

  // Get selected year for chart
  const yearSelect = document.getElementById('weeklyYearSelect');
  const selectedYear = yearSelect ? yearSelect.value : null;
  // Filter for chart only
  const chartRecords = selectedYear ? records.filter(r => r.BusinessYear === selectedYear) : records;
  const groups = groupWeekly(chartRecords);
  const yesno = computeYesNo(chartRecords);

  // Get all week labels present in the data, sorted
  const weekLabels = groups.map(g => g.label);

  // Map data to those week labels
  const data = groups.map(g =>
    g.items.map(i => i.OLA_Met === 'Yes' ? 1 : 0).reduce((a, b) => a + b, 0) / g.items.length
  );

  const pieCtx = document.getElementById('weeklyTimelinessPie').getContext('2d');
  destroyChart(charts.weeklyPie);
  charts.weeklyPie = new Chart(pieCtx, {
    type: 'doughnut',
    data: { labels: yesno.labels, datasets: [{ data: yesno.values, backgroundColor: ['#10B981', '#EF4444'] }] },
    options: { responsive: true, plugins: { legend: { labels: { color: 'white' } } } }
  });

  const lineCtx = document.getElementById('weeklyTrendsLine').getContext('2d');
  destroyChart(charts.weeklyLine);
  charts.weeklyLine = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: weekLabels,
      datasets: [{
        label: 'OLA Met vs NotMet',
        // data: groups.map(g => g.items.map(i => i.OLA_Met === 'Yes' ? 1 : 0).reduce((a, b) => a + b, 0) / g.items.length), 
        data: data,
        borderColor: '#10B981',
        fill: false,
        spanGaps: true // Connect points across nulls
      }]
    },
    options: {
      responsive: true,
      // elements: { line: { stepped: true }, point: { radius: 5 } }, // Stepped line, bigger points
      scales: {
        x: { ticks: { color: 'white', maxRotation: 45, minRotation: 30, autoSkip: false } },
        y: { min: 0, max: 1, ticks: { color: 'white', callback: v => v === 1 ? 'Yes' : (v === 0 ? 'No' : '') } }
      }
      ,
      plugins: { legend: { labels: { color: 'white' } } }
    }
  });

  populateWeeklyTable(records);
}

function renderYearly(records) {
  const groups = groupYearly(records);
  // const trend = buildTrend(groups);
  const yesno = computeYesNo(records);

  const pieCtx = document.getElementById('yearlyImprovementPie').getContext('2d');
  destroyChart(charts.yearlyPie);
  charts.yearlyPie = new Chart(pieCtx, {
    type: 'doughnut',
    data: { labels: yesno.labels, datasets: [{ data: yesno.values, backgroundColor: ['#10B981', '#EF4444'] }] },
    options: { responsive: true, plugins: { legend: { labels: { color: 'white' } } } }
  });

  const lineCtx = document.getElementById('yearlyTrendsLine').getContext('2d');
  destroyChart(charts.yearlyLine);
  charts.yearlyLine = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: getLastNYears(5),
      datasets: [{
        label: 'OLA Met vs NotMet',
        // data: groups.map(g => g.items.map(i => i.OLA_Met === 'Yes' ? 1 : 0).reduce((a, b) => a + b, 0) / g.items.length), 
        data: mapYearlyDataToLabels(groups),
        borderColor: '#10B981', fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { ticks: { color: 'white', maxRotation: 45, minRotation: 30, autoSkip: false } },
        y: { min: 0, max: 1, ticks: { color: 'white', callback: v => v === 1 ? 'Yes' : (v === 0 ? 'No' : '') } }
      },
      plugins: { legend: { labels: { color: 'white' } } }
    }
  });

  populateYearlyTable(records);
}

// ------------------------------ Table population (rows per-record but first column indicates Month/Week/Year) ------------------------------
function populateMonthlyTable(records) {
  const tbody = document.getElementById('monthlyTableBody'); tbody.innerHTML = '';
  const sorted = records.slice().sort((a, b) => (a.BusinessMonthKey || '').localeCompare(b.BusinessMonthKey || '') || (a.BusinessDayKey || '').localeCompare(b.BusinessDayKey || ''));
  sorted.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td data-sort="${r.BusinessMonthKey}">${escapeHtml(r.BusinessMonthLabel || r.BusinessDate)}</td>
      <td data-sort="${escapeHtml(r.Protocol)}">${escapeHtml(r.Protocol)}</td>
      <td data-sort="${r.BusinessDayKey}">${escapeHtml(r.BusinessDate)}</td>
      <td data-sort="${escapeHtml(r.DeliveryType)}">${escapeHtml(r.DeliveryType)}</td>
      <td data-sort="${escapeHtml(r.DeliveryMode)}">${escapeHtml(r.DeliveryMode)}</td>
      <td data-sort="${escapeHtml(r.EndExecution)}">${escapeHtml(r.EndExecution)}</td>
      <td data-sort="${escapeHtml(r.LegalEntity)}">${escapeHtml(r.LegalEntity)}</td>
      <td data-sort="${escapeHtml(r.OLA_Met)}">${escapeHtml(r.OLA_Met)}</td>`;
    tbody.appendChild(tr);
  });
  attachSorting('monthlyTable');
}

function populateWeeklyTable(records) {
  const tbody = document.getElementById('weeklyTableBody'); tbody.innerHTML = '';
  const sorted = records.slice().sort((a, b) => (a.BusinessWeekKey || '').localeCompare(b.BusinessWeekKey || '') || (a.BusinessDayKey || '').localeCompare(b.BusinessDayKey || ''));
  sorted.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td data-sort="${r.BusinessWeekKey}">${escapeHtml(r.BusinessWeekLabel || r.BusinessDate)}</td>
      <td data-sort="${escapeHtml(r.Protocol)}">${escapeHtml(r.Protocol)}</td>
      <td data-sort="${r.BusinessDayKey}">${escapeHtml(r.BusinessDate)}</td>
      <td data-sort="${escapeHtml(r.DeliveryType)}">${escapeHtml(r.DeliveryType)}</td>
      <td data-sort="${escapeHtml(r.DeliveryMode)}">${escapeHtml(r.DeliveryMode)}</td>
      <td data-sort="${escapeHtml(r.EndExecution)}">${escapeHtml(r.EndExecution)}</td>
      <td data-sort="${escapeHtml(r.LegalEntity)}">${escapeHtml(r.LegalEntity)}</td>
      <td data-sort="${escapeHtml(r.OLA_Met)}">${escapeHtml(r.OLA_Met)}</td>`;
    tbody.appendChild(tr);
  });
  attachSorting('weeklyTable');
}

function populateYearlyTable(records) {
  const tbody = document.getElementById('yearlyTableBody'); tbody.innerHTML = '';
  const sorted = records.slice().sort((a, b) => (a.BusinessYear || '').localeCompare(b.BusinessYear || '') || (a.BusinessDayKey || '').localeCompare(b.BusinessDayKey || ''));
  sorted.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td data-sort="${r.BusinessYear}">${escapeHtml(r.BusinessYear || r.BusinessDate)}</td>
      <td data-sort="${escapeHtml(r.Protocol)}">${escapeHtml(r.Protocol)}</td>
      <td data-sort="${r.BusinessDayKey}">${escapeHtml(r.BusinessDate)}</td>
      <td data-sort="${escapeHtml(r.DeliveryType)}">${escapeHtml(r.DeliveryType)}</td>
      <td data-sort="${escapeHtml(r.DeliveryMode)}">${escapeHtml(r.DeliveryMode)}</td>
      <td data-sort="${escapeHtml(r.EndExecution)}">${escapeHtml(r.EndExecution)}</td>
      <td data-sort="${escapeHtml(r.LegalEntity)}">${escapeHtml(r.LegalEntity)}</td>
      <td data-sort="${escapeHtml(r.OLA_Met)}">${escapeHtml(r.OLA_Met)}</td>`;
    tbody.appendChild(tr);
  });
  attachSorting('yearlyTable');
}

function escapeHtml(s) { if (s === null || s === undefined) return ''; return String(s).replace(/[&<>"']/g, t => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[t])); }

// ------------------------------ Sorting (click headers toggle asc/desc) ------------------------------
function attachSorting(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const headers = table.querySelectorAll('thead th');
  headers.forEach((th, idx) => {
    if (th.dataset.bound === 'true') return;
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => sortTableByColumn(table, idx));
    th.dataset.bound = 'true';
  });
}
function sortTableByColumn(table, colIdx) {
  const tbody = table.tBodies[0];
  if (!tbody) return;
  const rows = Array.from(tbody.querySelectorAll('tr'));
  if (rows.length <= 1) return;
  const key = `sortDir_${colIdx}`;
  const current = table.dataset[key] || 'none';
  const dir = current === 'asc' ? 'desc' : 'asc';
  // update icons
  const headers = table.querySelectorAll('thead th');
  headers.forEach((h, i) => {
    const icon = h.querySelector('.sort-icon');
    if (!icon) return;
    if (i === colIdx) icon.textContent = dir === 'asc' ? '▲' : '▼';
    else icon.textContent = '⇅';
  });
  rows.sort((a, b) => {
    const aCell = a.children[colIdx], bCell = b.children[colIdx];
    const aVal = aCell && aCell.dataset && aCell.dataset.sort ? aCell.dataset.sort : (aCell ? aCell.textContent.trim() : '');
    const bVal = bCell && bCell.dataset && bCell.dataset.sort ? bCell.dataset.sort : (bCell ? bCell.textContent.trim() : '');
    const aNum = parseFloat(aVal.replace(/[^0-9.-]/g, '')), bNum = parseFloat(bVal.replace(/[^0-9.-]/g, ''));
    if (!isNaN(aNum) && !isNaN(bNum)) return dir === 'asc' ? aNum - bNum : bNum - aNum;
    return dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });
  rows.forEach(r => tbody.appendChild(r));
  table.dataset[key] = dir;
}

// ------------------------------ UI wiring ------------------------------
function activeComponent() {
  const btn = document.querySelector('.nav-btn.active');
  return btn ? btn.getAttribute('data-component') : 'monthly';
}
function showOnlySection(componentId) {
  document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(componentId);
  if (el) el.classList.add('active');
}

// Rebuild dashboard for current client and active report only
function rebuild() {
  clearAllCharts();

  // normalize all records for selected client
  const raw = clientsData[currentClient] || [];
  const normalized = raw.map(normalizeRaw);

  // Populate year selectors
  populateYearSelectors(normalized);

  const comp = activeComponent();
  // hide other sections, show only active
  showOnlySection(comp);

  if (comp === 'monthly') renderMonthly(normalized);
  else if (comp === 'weekly') renderWeekly(normalized);
  else if (comp === 'yearly') renderYearly(normalized);
}

// Initialize buttons and default behavior
function initClients() {
  document.querySelectorAll('.client-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.client-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentClient = this.getAttribute('data-client') || 'BFRDD';
      // reset report to monthly when client changes
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      const monthlyBtn = document.querySelector('.nav-btn[data-component="monthly"]');
      if (monthlyBtn) monthlyBtn.classList.add('active');
      rebuild();
    });
  });
}
function initNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      // show only that component and rebuild
      rebuild();
    });
  });
}

// ------------------------------ Export convenience (optional) ------------------------------
window.exportClientRaw = function () {
  const raw = clientsData[currentClient] || [];
  const blob = new Blob([JSON.stringify(raw, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${currentClient}_raw.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// ------------------------------ Init on DOM ready ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initClients();
  initNav();
  const monthlySelect = document.getElementById('monthlyYearSelect');
  const weeklySelect = document.getElementById('weeklyYearSelect');
  if (monthlySelect) monthlySelect.addEventListener('change', () => rebuild());
  if (weeklySelect) weeklySelect.addEventListener('change', () => rebuild());
  // pre-attach sorting binding for table headers (no-op until rows exist)
  ['monthlyTable', 'weeklyTable', 'yearlyTable'].forEach(id => {
    const t = document.getElementById(id);
    if (t) {
      const ths = t.querySelectorAll('thead th');
      ths.forEach((th, idx) => { th.style.cursor = 'pointer'; });
    }
  });
  // initial render (default client & monthly)
  rebuild();

  // hide loading overlay
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) setTimeout(() => overlay.classList.add('hidden'), 500);
});
