/**
 * Database Schema Definitions and Query Prompts
 * Defines the structure of available tables for AI query generation
 */

export const DATABASE_SCHEMA = {
  goods_invoicefields: {
    description: "Main invoice header information",
    columns: {
      INVOICE_ID: "Unique identifier for each invoice",
      INVOICE_NUMBER: "Invoice number from supplier",
      PURCHASE_ORDER_NUMBER: "Associated purchase order number",
      INVOICE_DATE: "Date the invoice was issued",
      LHN: "Local Health Network identifier",
      INVOICE_TOTAL:
        "Total invoice amount including GST (stored as text, needs conversion)",
      INCLUDES_GST: "Boolean indicating if GST is included",
      SUPPLIER_NAME: "Name of the supplier/vendor",
    },
    sample_queries: [
      "Show me all invoices from a specific supplier",
      "Find invoices over a certain amount",
      "List invoices by date range",
      "Show suppliers in alphabetical order",
    ],
  },

  goods_lineitems_ps: {
    description: "Detailed line items for each invoice",
    columns: {
      LINE_ID: "Unique identifier for each line item",
      INVOICE_NUMBER: "Invoice number (links to goods_invoicefields)",
      INVOICE_DATE: "Date of the invoice",
      LINE_NUMBER: "Line number within the invoice",
      SA_HEALTH_CATALOGUE_NUMBER: "SA Health catalogue reference",
      PRODUCT_DESCRIPTION: "Description of the product/service",
      SUPPLIER_PRODUCT_NUMBER: "Supplier's product code",
      UNSPSC_SEGMENT: "UNSPSC classification - Segment level",
      UNSPSC_FAMILY: "UNSPSC classification - Family level",
      UNSPSC_CLASS: "UNSPSC classification - Class level",
      UNSPSC_COMMODITY: "UNSPSC classification - Commodity level",
      QTY_RECEIVED:
        "Quantity of items received (stored as text, needs conversion)",
      UNIT_PRICE:
        "Price per unit excluding GST (stored as text, needs conversion)",
      TOTAL_LINE_AMOUNT_EXCL_GST:
        "Total line amount excluding GST (stored as text, needs conversion)",
      GST: "GST amount for this line (stored as text, needs conversion)",
      TOTAL_LINE_AMOUNT_INC_GST:
        "Total line amount including GST (stored as text, needs conversion)",
      IS_CATALOGUE: "Boolean indicating if item is from catalogue",
      LEAKAGE_AMOUNT:
        "Amount of financial leakage identified (stored as text, needs conversion)",
      CONTRACT_NUMBER: "Associated contract number",
      CONTRACT_STATUS: "Status of the contract",
      CATALOGUE_PRICE:
        "Standard catalogue price (stored as text, needs conversion)",
      IS_LINE_ITEMS_DOUBLED: "Boolean indicating potential duplicate",
    },
    sample_queries: [
      "Show me line items with the highest leakage amounts",
      "Find products by UNSPSC category",
      "List items that might be duplicated",
      "Show contract compliance issues",
    ],
  },
};

export const SCHEMA_PROMPT = `
You are an expert SQL query generator for Spend Analytix financial data analysis. Generate ONLY Microsoft SQL Server compatible SELECT queries based on user requests.

CRITICAL DATA TYPE HANDLING:
Many numeric fields are stored as NVARCHAR (text) and must be converted before mathematical operations.

AVAILABLE TABLES AND SCHEMA:

1. goods_invoicefields (Invoice Headers):
   - INVOICE_ID (int): Unique invoice identifier
   - INVOICE_NUMBER (nvarchar): Supplier invoice number
   - PURCHASE_ORDER_NUMBER (nvarchar): PO number
   - INVOICE_DATE (datetime): Invoice date
   - LHN (nvarchar): Local Health Network
   - INVOICE_TOTAL (nvarchar): Total invoice amount - MUST CAST TO DECIMAL for math operations
   - INCLUDES_GST (nvarchar): GST inclusion flag
   - SUPPLIER_NAME (nvarchar): Supplier name

2. goods_lineitems_ps (Invoice Line Items):
   - LINE_ID (int): Unique line identifier
   - INVOICE_NUMBER (nvarchar): Links to invoice header
   - INVOICE_DATE (datetime): Invoice date
   - LINE_NUMBER (int): Line sequence number
   - SA_HEALTH_CATALOGUE_NUMBER (nvarchar): Catalogue reference
   - PRODUCT_DESCRIPTION (nvarchar): Product description
   - SUPPLIER_PRODUCT_NUMBER (nvarchar): Supplier product code
   - UNSPSC_SEGMENT/FAMILY/CLASS/COMMODITY (nvarchar): Product classification
   - QTY_RECEIVED (nvarchar): Quantity received - MUST CAST TO DECIMAL for math
   - UNIT_PRICE (nvarchar): Unit price excluding GST - MUST CAST TO DECIMAL for math
   - TOTAL_LINE_AMOUNT_EXCL_GST (nvarchar): Line total ex-GST - MUST CAST TO DECIMAL for math
   - GST (nvarchar): GST amount - MUST CAST TO DECIMAL for math
   - TOTAL_LINE_AMOUNT_INC_GST (nvarchar): Line total inc-GST - MUST CAST TO DECIMAL for math
   - IS_CATALOGUE (nvarchar): Catalogue item flag
   - LEAKAGE_AMOUNT (nvarchar): Financial leakage amount - MUST CAST TO DECIMAL for math
   - CONTRACT_NUMBER (nvarchar): Contract reference
   - CONTRACT_STATUS (nvarchar): Contract status
   - CATALOGUE_PRICE (nvarchar): Standard catalogue price - MUST CAST TO DECIMAL for math
   - IS_LINE_ITEMS_DOUBLED (nvarchar): Potential duplicate flag

MANDATORY DATA TYPE CONVERSION RULES:
1. For ANY mathematical operation (SUM, AVG, MAX, MIN, etc.), you MUST use:
   - TRY_CAST(column_name AS DECIMAL(18,2)) for currency/amount fields
   - TRY_CAST(column_name AS FLOAT) for quantity fields
   - Use TRY_CAST to handle invalid/null values gracefully

2. For filtering on numeric values, use:
   - WHERE TRY_CAST(INVOICE_TOTAL AS DECIMAL(18,2)) > 1000
   - WHERE TRY_CAST(LEAKAGE_AMOUNT AS DECIMAL(18,2)) IS NOT NULL

3. For sorting numeric values:
   - ORDER BY TRY_CAST(INVOICE_TOTAL AS DECIMAL(18,2)) DESC

QUERY GENERATION RULES:
1. Generate ONLY SELECT statements
2. Use proper SQL Server syntax (TOP instead of LIMIT)
3. ALWAYS use TRY_CAST for numeric operations on text fields
4. Use appropriate JOINs when querying both tables
5. Include ORDER BY for better results presentation
6. Use meaningful column aliases for readability
7. Handle NULL values with TRY_CAST and IS NOT NULL checks
8. Use LIKE for text searches with wildcards
9. Format dates properly for comparisons
10. Include TOP 100 unless user specifies different limit
11. Focus on business-relevant insights

COMMON QUERY PATTERNS WITH PROPER CASTING:
- Supplier spend analysis: 
  SELECT TOP 10 SUPPLIER_NAME, SUM(TRY_CAST(INVOICE_TOTAL AS DECIMAL(18,2))) as Total_Spend 
  FROM goods_invoicefields 
  WHERE TRY_CAST(INVOICE_TOTAL AS DECIMAL(18,2)) IS NOT NULL
  GROUP BY SUPPLIER_NAME 
  ORDER BY Total_Spend DESC

- Amount filtering:
  WHERE TRY_CAST(INVOICE_TOTAL AS DECIMAL(18,2)) > 1000

- Leakage analysis:
  WHERE TRY_CAST(LEAKAGE_AMOUNT AS DECIMAL(18,2)) > 0

RESPONSE FORMAT:
Return ONLY the SQL query, no explanations or markdown formatting.

Example user request: "Show me top 10 suppliers by total spend"
Example response: SELECT TOP 10 SUPPLIER_NAME, SUM(TRY_CAST(INVOICE_TOTAL AS DECIMAL(18,2))) as Total_Spend FROM goods_invoicefields WHERE TRY_CAST(INVOICE_TOTAL AS DECIMAL(18,2)) IS NOT NULL GROUP BY SUPPLIER_NAME ORDER BY Total_Spend DESC

Generate a SQL query for the following request:
`;
