/**
 * Advanced Business Intelligence Queries for CFO-Level Analytics
 * Predefined high-value queries for executive decision making
 */

export const PREDEFINED_QUERIES = {
  // Spend Leakage Analysis
  "total spend leakage by department": {
    query: `
      SELECT 
        i.LHN as Department,
        COUNT(DISTINCT i.INVOICE_NUMBER) as Invoice_Count,
        SUM(l.TOTAL_LINE_AMOUNT_INC_GST) as Total_Spend,
        SUM(l.LEAKAGE_AMOUNT) as Total_Leakage,
        CASE 
          WHEN SUM(l.TOTAL_LINE_AMOUNT_INC_GST) > 0 
          THEN ROUND((SUM(l.LEAKAGE_AMOUNT) / SUM(l.TOTAL_LINE_AMOUNT_INC_GST)) * 100, 2)
          ELSE 0 
        END as Leakage_Percentage
      FROM goods_invoicefields_temp i
      INNER JOIN goods_lineitems_temp l ON i.INVOICE_NUMBER = l.INVOICE_NUMBER
      WHERE l.LEAKAGE_AMOUNT > 0
      GROUP BY i.LHN
      ORDER BY Total_Leakage DESC
    `,
    description:
      "Comprehensive spend leakage analysis by department with percentages",
    category: "Financial Risk",
  },

  "top 5 suppliers by spending": {
    query: `
      SELECT TOP 5
        i.SUPPLIER_NAME,
        COUNT(DISTINCT i.INVOICE_NUMBER) as Invoice_Count,
        SUM(TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2))) as Total_Spend,
        AVG(TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2))) as Average_Invoice_Value,
        SUM(l.LEAKAGE_AMOUNT) as Total_Leakage,
        CASE 
          WHEN SUM(TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2))) > 0 
          THEN ROUND((SUM(l.LEAKAGE_AMOUNT) / SUM(TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2)))) * 100, 2)
          ELSE 0 
        END as Leakage_Rate_Percent
      FROM goods_invoicefields_temp i
      LEFT JOIN goods_lineitems_temp l ON i.INVOICE_NUMBER = l.INVOICE_NUMBER
      WHERE TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2)) IS NOT NULL
      GROUP BY i.SUPPLIER_NAME
      ORDER BY Total_Spend DESC
    `,
    description: "Top 5 suppliers by total spending with leakage analysis",
    category: "Supplier Management",
  },

  "catalogue vs non-catalogue leakage": {
    query: `
      SELECT 
        CASE 
          WHEN l.IS_CATALOGUE = 1 THEN 'Catalogue Items'
          ELSE 'Non-Catalogue Items'
        END as Item_Type,
        COUNT(*) as Line_Item_Count,
        SUM(l.TOTAL_LINE_AMOUNT_INC_GST) as Total_Spend,
        SUM(l.LEAKAGE_AMOUNT) as Total_Leakage,
        CASE 
          WHEN SUM(l.TOTAL_LINE_AMOUNT_INC_GST) > 0 
          THEN ROUND((SUM(l.LEAKAGE_AMOUNT) / SUM(l.TOTAL_LINE_AMOUNT_INC_GST)) * 100, 2)
          ELSE 0 
        END as Leakage_Percentage,
        AVG(l.UNIT_PRICE) as Average_Unit_Price
      FROM goods_lineitems_temp l
      WHERE l.TOTAL_LINE_AMOUNT_INC_GST IS NOT NULL
      GROUP BY 
        CASE 
          WHEN l.IS_CATALOGUE = 1 THEN 'Catalogue Items'
          ELSE 'Non-Catalogue Items'
        END
      ORDER BY Total_Leakage DESC
    `,
    description:
      "Comparison of catalogue vs non-catalogue items showing leakage rates",
    category: "Procurement Strategy",
  },

  "contract compliance analysis": {
    query: `
      SELECT 
        l.CONTRACT_STATUS,
        COUNT(DISTINCT l.INVOICE_NUMBER) as Invoice_Count,
        COUNT(*) as Line_Item_Count,
        SUM(l.TOTAL_LINE_AMOUNT_INC_GST) as Total_Spend,
        SUM(l.LEAKAGE_AMOUNT) as Total_Leakage,
        CASE 
          WHEN SUM(l.TOTAL_LINE_AMOUNT_INC_GST) > 0 
          THEN ROUND((SUM(l.LEAKAGE_AMOUNT) / SUM(l.TOTAL_LINE_AMOUNT_INC_GST)) * 100, 2)
          ELSE 0 
        END as Leakage_Rate_Percent
      FROM goods_lineitems_temp l
      WHERE l.CONTRACT_STATUS IS NOT NULL AND l.CONTRACT_STATUS != ''
      GROUP BY l.CONTRACT_STATUS
      ORDER BY Total_Spend DESC
    `,
    description:
      "Contract compliance analysis showing spend and leakage by contract status",
    category: "Contract Management",
  },

  "high risk transactions": {
    query: `
      SELECT TOP 20
        i.INVOICE_NUMBER,
        i.SUPPLIER_NAME,
        i.LHN as Department,
        TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2)) as Invoice_Total,
        l.PRODUCT_DESCRIPTION,
        l.LEAKAGE_AMOUNT,
        CASE 
          WHEN l.TOTAL_LINE_AMOUNT_INC_GST > 0 
          THEN ROUND((l.LEAKAGE_AMOUNT / l.TOTAL_LINE_AMOUNT_INC_GST) * 100, 2)
          ELSE 0 
        END as Leakage_Percentage,
        l.CONTRACT_STATUS,
        CASE 
          WHEN l.IS_CATALOGUE = 1 THEN 'Catalogue'
          ELSE 'Non-Catalogue'
        END as Item_Type
      FROM goods_invoicefields_temp i
      INNER JOIN goods_lineitems_temp l ON i.INVOICE_NUMBER = l.INVOICE_NUMBER
      WHERE l.LEAKAGE_AMOUNT > 1000
      ORDER BY l.LEAKAGE_AMOUNT DESC
    `,
    description:
      "High-risk transactions with significant leakage amounts (>$1000)",
    category: "Risk Management",
  },

  "spend by product category": {
    query: `
      SELECT 
        l.UNSPSC_SEGMENT,
        l.UNSPSC_FAMILY,
        COUNT(DISTINCT i.SUPPLIER_NAME) as Supplier_Count,
        COUNT(*) as Line_Item_Count,
        SUM(l.TOTAL_LINE_AMOUNT_INC_GST) as Total_Spend,
        AVG(l.UNIT_PRICE) as Average_Unit_Price,
        SUM(l.LEAKAGE_AMOUNT) as Total_Leakage,
        CASE 
          WHEN SUM(l.TOTAL_LINE_AMOUNT_INC_GST) > 0 
          THEN ROUND((SUM(l.LEAKAGE_AMOUNT) / SUM(l.TOTAL_LINE_AMOUNT_INC_GST)) * 100, 2)
          ELSE 0 
        END as Leakage_Rate_Percent
      FROM goods_lineitems_temp l
      INNER JOIN goods_invoicefields_temp i ON l.INVOICE_NUMBER = i.INVOICE_NUMBER
      WHERE l.UNSPSC_SEGMENT IS NOT NULL AND l.UNSPSC_SEGMENT != ''
      GROUP BY l.UNSPSC_SEGMENT, l.UNSPSC_FAMILY
      HAVING SUM(l.TOTAL_LINE_AMOUNT_INC_GST) > 10000
      ORDER BY Total_Spend DESC
    `,
    description:
      "Spend analysis by UNSPSC product categories with supplier diversity",
    category: "Category Management",
  },

  "monthly spend trend": {
    query: `
      SELECT 
        YEAR(TRY_CAST(i.INVOICE_DATE AS DATE)) as Year,
        MONTH(TRY_CAST(i.INVOICE_DATE AS DATE)) as Month,
        DATENAME(MONTH, TRY_CAST(i.INVOICE_DATE AS DATE)) as Month_Name,
        COUNT(DISTINCT i.INVOICE_NUMBER) as Invoice_Count,
        COUNT(DISTINCT i.SUPPLIER_NAME) as Unique_Suppliers,
        SUM(TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2))) as Total_Spend,
        SUM(l.LEAKAGE_AMOUNT) as Total_Leakage,
        CASE 
          WHEN SUM(TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2))) > 0 
          THEN ROUND((SUM(l.LEAKAGE_AMOUNT) / SUM(TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2)))) * 100, 2)
          ELSE 0 
        END as Leakage_Rate_Percent
      FROM goods_invoicefields_temp i
      LEFT JOIN goods_lineitems_temp l ON i.INVOICE_NUMBER = l.INVOICE_NUMBER
      WHERE TRY_CAST(i.INVOICE_DATE AS DATE) IS NOT NULL
      GROUP BY YEAR(TRY_CAST(i.INVOICE_DATE AS DATE)), MONTH(TRY_CAST(i.INVOICE_DATE AS DATE)), DATENAME(MONTH, TRY_CAST(i.INVOICE_DATE AS DATE))
      ORDER BY Year DESC, Month DESC
    `,
    description: "Monthly spend trends with leakage analysis over time",
    category: "Trend Analysis",
  },

  "duplicate invoice detection": {
    query: `
      SELECT 
        i.SUPPLIER_NAME,
        i.INVOICE_NUMBER,
        i.PURCHASE_ORDER_NUMBER,
        TRY_CAST(i.INVOICE_TOTAL AS DECIMAL(18,2)) as Invoice_Total,
        i.INVOICE_DATE,
        COUNT(*) as Duplicate_Count,
        SUM(l.TOTAL_LINE_AMOUNT_INC_GST) as Total_Line_Amount
      FROM goods_invoicefields_temp i
      INNER JOIN goods_lineitems_temp l ON i.INVOICE_NUMBER = l.INVOICE_NUMBER
      WHERE l.IS_LINE_ITEMS_DOUBLED = 1
      GROUP BY i.SUPPLIER_NAME, i.INVOICE_NUMBER, i.PURCHASE_ORDER_NUMBER, i.INVOICE_TOTAL, i.INVOICE_DATE
      HAVING COUNT(*) > 1
      ORDER BY Invoice_Total DESC
    `,
    description: "Detection of potential duplicate invoices and line items",
    category: "Data Quality",
  },

  "price variance analysis": {
    query: `
      SELECT 
        l.PRODUCT_DESCRIPTION,
        COUNT(DISTINCT i.SUPPLIER_NAME) as Supplier_Count,
        COUNT(*) as Purchase_Count,
        MIN(l.UNIT_PRICE) as Min_Unit_Price,
        MAX(l.UNIT_PRICE) as Max_Unit_Price,
        AVG(l.UNIT_PRICE) as Avg_Unit_Price,
        AVG(l.CATALOGUE_PRICE) as Avg_Catalogue_Price,
        CASE 
          WHEN AVG(l.CATALOGUE_PRICE) > 0 
          THEN ROUND(((AVG(l.UNIT_PRICE) - AVG(l.CATALOGUE_PRICE)) / AVG(l.CATALOGUE_PRICE)) * 100, 2)
          ELSE 0 
        END as Price_Variance_Percent,
        SUM(l.TOTAL_LINE_AMOUNT_INC_GST) as Total_Spend
      FROM goods_lineitems_temp l
      INNER JOIN goods_invoicefields_temp i ON l.INVOICE_NUMBER = i.INVOICE_NUMBER
      WHERE l.UNIT_PRICE IS NOT NULL 
        AND l.PRODUCT_DESCRIPTION IS NOT NULL 
        AND l.PRODUCT_DESCRIPTION != ''
      GROUP BY l.PRODUCT_DESCRIPTION
      HAVING COUNT(*) > 5 AND MAX(l.UNIT_PRICE) > MIN(l.UNIT_PRICE)
      ORDER BY Price_Variance_Percent DESC
    `,
    description:
      "Price variance analysis showing products with significant price differences",
    category: "Price Management",
  },
};

export const QUERY_SUGGESTIONS = [
  {
    title: "💰 Total Spend Leakage by Department",
    description: "Identify departments with highest financial leakage",
    keywords: ["leakage", "department", "spend", "waste"],
  },
  {
    title: "🏆 Top 5 Suppliers by Spending",
    description: "Your biggest suppliers with leakage analysis",
    keywords: ["suppliers", "top", "spending", "vendor"],
  },
  {
    title: "📊 Catalogue vs Non-Catalogue Leakage",
    description:
      "Compare leakage rates between catalogue and off-catalogue purchases",
    keywords: ["catalogue", "non-catalogue", "leakage", "procurement"],
  },
  {
    title: "📋 Contract Compliance Analysis",
    description: "Analyze spend and leakage by contract status",
    keywords: ["contract", "compliance", "status"],
  },
  {
    title: "⚠️ High Risk Transactions",
    description: "Transactions with significant leakage amounts (>$1000)",
    keywords: ["risk", "high", "leakage", "transactions"],
  },
  {
    title: "🏷️ Spend by Product Category",
    description: "UNSPSC category analysis with supplier diversity",
    keywords: ["category", "product", "unspsc", "classification"],
  },
  {
    title: "📈 Monthly Spend Trends",
    description: "Track spending patterns and leakage over time",
    keywords: ["monthly", "trend", "time", "pattern"],
  },
  {
    title: "🔍 Duplicate Invoice Detection",
    description: "Identify potential duplicate invoices and payments",
    keywords: ["duplicate", "invoice", "double", "payment"],
  },
  {
    title: "💲 Price Variance Analysis",
    description:
      "Find products with significant price differences across suppliers",
    keywords: ["price", "variance", "difference", "cost"],
  },
];

export function findPredefinedQuery(userInput) {
  const input = userInput.toLowerCase();

  // Direct matches
  for (const [key, query] of Object.entries(PREDEFINED_QUERIES)) {
    if (input.includes(key.toLowerCase())) {
      return query;
    }
  }

  // Keyword-based matching
  for (const suggestion of QUERY_SUGGESTIONS) {
    const matchCount = suggestion.keywords.filter((keyword) =>
      input.includes(keyword.toLowerCase())
    ).length;

    if (matchCount >= 2) {
      const queryKey = Object.keys(PREDEFINED_QUERIES).find((key) =>
        suggestion.title.toLowerCase().includes(key.split(" ")[0])
      );
      if (queryKey) {
        return PREDEFINED_QUERIES[queryKey];
      }
    }
  }

  return null;
}

export function getQuerySuggestions() {
  return QUERY_SUGGESTIONS;
}
