/**
 * SQL Security Guardrails and Validation
 * Ensures safe and appropriate database queries
 */

export class SQLGuardrails {
  // Allowed SQL operations (read-only)
  static ALLOWED_OPERATIONS = ["SELECT", "WITH"];

  // Forbidden SQL keywords and patterns
  static FORBIDDEN_KEYWORDS = [
    "DROP",
    "DELETE",
    "UPDATE",
    "INSERT",
    "ALTER",
    "CREATE",
    "TRUNCATE",
    "EXEC",
    "EXECUTE",
    "SP_",
    "XP_",
    "OPENROWSET",
    "OPENDATASOURCE",
    "BULK",
    "BACKUP",
    "RESTORE",
    "SHUTDOWN",
    "RECONFIGURE",
  ];

  // Allowed tables for querying
  static ALLOWED_TABLES = ["goods_invoicefields_temp", "goods_lineitems_temp"];

  // Maximum result limit
  static MAX_RESULTS = 1000;

  /**
   * Validates if a SQL query is safe to execute
   * @param {string} query - The SQL query to validate
   * @returns {Object} - Validation result with isValid and message
   */
  static validateQuery(query) {
    const upperQuery = query.toUpperCase().trim();

    // Check if query starts with allowed operation
    const startsWithAllowed = this.ALLOWED_OPERATIONS.some((op) =>
      upperQuery.startsWith(op)
    );

    if (!startsWithAllowed) {
      return {
        isValid: false,
        message: "Only SELECT queries are allowed for data analysis.",
      };
    }

    // Check for forbidden keywords
    const hasForbiddenKeyword = this.FORBIDDEN_KEYWORDS.some((keyword) =>
      upperQuery.includes(keyword)
    );

    if (hasForbiddenKeyword) {
      return {
        isValid: false,
        message:
          "Query contains forbidden operations. Only read-only queries are permitted.",
      };
    }

    // Check for allowed tables only
    const hasAllowedTable = this.ALLOWED_TABLES.some((table) =>
      upperQuery.includes(table.toUpperCase())
    );

    if (!hasAllowedTable) {
      return {
        isValid: false,
        message:
          "Query must reference allowed tables: goods_invoicefields_temp, goods_lineitems_temp",
      };
    }

    if (this.hasNumericOperationsWithoutCast(upperQuery)) {
      return {
        isValid: false,
        message:
          "Numeric operations detected without proper data type conversion. Query needs TRY_CAST for text-to-number conversions.",
      };
    }

    return {
      isValid: true,
      message: "Query validation passed.",
    };
  }

  /**
   * Checks if query has numeric operations without proper casting
   * @param {string} upperQuery - Uppercase query string
   * @returns {boolean} - True if unsafe numeric operations found
   */
  static hasNumericOperationsWithoutCast(upperQuery) {
    // Fields that are stored as text but used for numeric operations
    const textNumericFields = [
      "INVOICE_TOTAL",
      "UNIT_PRICE",
      "TOTAL_LINE_AMOUNT_EXCL_GST",
      "TOTAL_LINE_AMOUNT_INC_GST",
      "GST",
      "LEAKAGE_AMOUNT",
      "CATALOGUE_PRICE",
      "QTY_RECEIVED",
    ];

    // Numeric operations that require casting
    const numericOperations = ["SUM(", "AVG(", "MAX(", "MIN(", "COUNT("];

    // Check if any numeric operation is used on text fields without TRY_CAST
    for (const operation of numericOperations) {
      for (const field of textNumericFields) {
        const directUsage = `${operation}${field}`;
        if (
          upperQuery.includes(directUsage) &&
          !upperQuery.includes(`TRY_CAST(${field}`)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Enhances query with safety measures
   * @param {string} query - Original query
   * @returns {string} - Enhanced safe query
   */
  static enhanceQuery(query) {
    let enhancedQuery = query.trim();
    const upperQuery = enhancedQuery.toUpperCase();

    // Add TOP clause if not present
    if (!upperQuery.includes("TOP") && !upperQuery.includes("LIMIT")) {
      enhancedQuery = enhancedQuery.replace(
        /^SELECT\s+/i,
        `SELECT TOP ${this.MAX_RESULTS} `
      );
    }

    enhancedQuery = this.autoFixDataTypes(enhancedQuery);

    return enhancedQuery;
  }

  /**
   * Automatically fixes common data type conversion issues
   * @param {string} query - Original query
   * @returns {string} - Query with data type fixes
   */
  static autoFixDataTypes(query) {
    let fixedQuery = query;

    // Fields that need casting for numeric operations
    const numericFields = {
      INVOICE_TOTAL: "DECIMAL(18,2)",
      UNIT_PRICE: "DECIMAL(18,2)",
      TOTAL_LINE_AMOUNT_EXCL_GST: "DECIMAL(18,2)",
      TOTAL_LINE_AMOUNT_INC_GST: "DECIMAL(18,2)",
      GST: "DECIMAL(18,2)",
      LEAKAGE_AMOUNT: "DECIMAL(18,2)",
      CATALOGUE_PRICE: "DECIMAL(18,2)",
      QTY_RECEIVED: "FLOAT",
    };

    // Numeric operations that require casting
    const operations = ["SUM", "AVG", "MAX", "MIN"];

    // Fix each operation + field combination
    for (const [field, dataType] of Object.entries(numericFields)) {
      for (const operation of operations) {
        const pattern = new RegExp(
          `\\b${operation}\\s*\$$\\s*${field}\\s*\$$`,
          "gi"
        );
        const replacement = `${operation}(TRY_CAST(${field} AS ${dataType}))`;
        fixedQuery = fixedQuery.replace(pattern, replacement);
      }

      // Fix ORDER BY clauses
      const orderPattern = new RegExp(`ORDER\\s+BY\\s+${field}`, "gi");
      const orderReplacement = `ORDER BY TRY_CAST(${field} AS ${dataType})`;
      fixedQuery = fixedQuery.replace(orderPattern, orderReplacement);

      // Fix WHERE clauses with comparisons
      const wherePattern = new RegExp(
        `WHERE\\s+${field}\\s*([><=]+)\\s*(\\d+)`,
        "gi"
      );
      const whereReplacement = `WHERE TRY_CAST(${field} AS ${dataType}) $1 $2`;
      fixedQuery = fixedQuery.replace(wherePattern, whereReplacement);
    }

    return fixedQuery;
  }

  /**
   * Sanitizes user input for SQL generation
   * @param {string} userInput - User's natural language input
   * @returns {string} - Sanitized input
   */
  static sanitizeInput(userInput) {
    // Remove potentially dangerous characters and patterns
    return userInput
      .replace(/[';]/g, "") // Remove semicolons and single quotes
      .replace(/--/g, "") // Remove SQL comment patterns
      .replace(/\b(exec|execute|sp_|xp_)\b/gi, "") // Remove procedure calls
      .trim();
  }
}
