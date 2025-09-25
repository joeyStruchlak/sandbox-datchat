/**
 * Professional SQL Result Formatting
 * Formats query results for optimal presentation
 */

export class ResultFormatter {
  /**
   * Formats SQL query results into readable text
   * @param {Array} rows - Query result rows
   * @param {string} userQuery - Original user query for context
   * @returns {string} - Formatted result string
   */
  static formatSqlResults(rows, userQuery = "") {
    if (!rows || rows.length === 0) {
      return "📊 No data found matching your criteria. Try adjusting your search parameters or date range.";
    }

    // Determine formatting style based on result size and content
    if (rows.length === 1) {
      return this.formatSingleResult(rows[0]);
    } else if (rows.length <= 10) {
      return this.formatDetailedResults(rows, userQuery);
    } else {
      return this.formatSummaryResults(rows, userQuery);
    }
  }

  /**
   * Formats a single result record
   * @param {Object} row - Single result row
   * @returns {string} - Formatted single result
   */
  static formatSingleResult(row) {
    const entries = Object.entries(row);
    const formatted = entries
      .map(([key, value]) => {
        const formattedKey = this.formatColumnName(key);
        const formattedValue = this.formatValue(value, key);
        return `• ${formattedKey}: ${formattedValue}`;
      })
      .join("\n");

    return `📋 **Result Details:**\n${formatted}`;
  }

  /**
   * Formats detailed results for small result sets
   * @param {Array} rows - Result rows
   * @param {string} userQuery - User query context
   * @returns {string} - Formatted detailed results
   */
  static formatDetailedResults(rows, userQuery) {
    const header = `📊 **Found ${rows.length} result${
      rows.length > 1 ? "s" : ""
    }:**\n`;

    const formatted = rows
      .map((row, index) => {
        const entries = Object.entries(row);
        const rowData = entries
          .map(([key, value]) => {
            const formattedKey = this.formatColumnName(key);
            const formattedValue = this.formatValue(value, key);
            return `   ${formattedKey}: ${formattedValue}`;
          })
          .join("\n");

        return `\n**${index + 1}.** \n${rowData}`;
      })
      .join("\n");

    return header + formatted;
  }

  /**
   * Formats summary results for large result sets
   * @param {Array} rows - Result rows
   * @param {string} userQuery - User query context
   * @returns {string} - Formatted summary results
   */
  static formatSummaryResults(rows, userQuery) {
    const header = `📊 **Found ${rows.length} results** (showing summary format):\n`;

    // For large datasets, show in table-like format
    const columns = Object.keys(rows[0]);
    const maxRows = Math.min(rows.length, 50); // Limit display to 50 rows

    let formatted = "";

    // Add column headers
    const headerRow = columns
      .map((col) => this.formatColumnName(col))
      .join(" | ");
    formatted += `\n${headerRow}\n`;
    formatted += `${"-".repeat(headerRow.length)}\n`;

    // Add data rows
    for (let i = 0; i < maxRows; i++) {
      const row = rows[i];
      const rowData = columns
        .map((col) => this.formatValue(row[col], col, true))
        .join(" | ");
      formatted += `${rowData}\n`;
    }

    if (rows.length > maxRows) {
      formatted += `\n... and ${rows.length - maxRows} more results\n`;
    }

    // Add summary statistics if applicable
    const summary = this.generateSummary(rows);
    if (summary) {
      formatted += `\n📈 **Summary:**\n${summary}`;
    }

    return header + formatted;
  }

  /**
   * Formats column names for display
   * @param {string} columnName - Raw column name
   * @returns {string} - Formatted column name
   */
  static formatColumnName(columnName) {
    return columnName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .replace(/Id\b/g, "ID")
      .replace(/Gst\b/g, "GST")
      .replace(/Lhn\b/g, "LHN")
      .replace(/Unspsc/g, "UNSPSC");
  }

  /**
   * Formats individual values based on type and context
   * @param {any} value - Value to format
   * @param {string} columnName - Column name for context
   * @param {boolean} compact - Whether to use compact formatting
   * @returns {string} - Formatted value
   */
  static formatValue(value, columnName = "", compact = false) {
    if (value === null || value === undefined) {
      return compact ? "N/A" : "Not Available";
    }

    const lowerColumn = columnName.toLowerCase();

    // Format currency values
    if (
      lowerColumn.includes("amount") ||
      lowerColumn.includes("total") ||
      lowerColumn.includes("price") ||
      lowerColumn.includes("gst") ||
      lowerColumn.includes("leakage")
    ) {
      const numValue = Number.parseFloat(value);
      if (!isNaN(numValue)) {
        return compact
          ? `$${numValue.toLocaleString("en-AU", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}`
          : `$${numValue.toLocaleString("en-AU", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
      }
    }

    // Format dates
    if (lowerColumn.includes("date")) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return compact
          ? date.toLocaleDateString("en-AU")
          : date.toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
      }
    }

    // Format quantities
    if (lowerColumn.includes("qty") || lowerColumn.includes("quantity")) {
      const numValue = Number.parseFloat(value);
      if (!isNaN(numValue)) {
        return numValue.toLocaleString("en-AU");
      }
    }

    // Format boolean values
    if (typeof value === "boolean" || value === 0 || value === 1) {
      if (lowerColumn.includes("includes") || lowerColumn.includes("is_")) {
        return value ? "✓ Yes" : "✗ No";
      }
    }

    // Truncate long text in compact mode
    if (compact && typeof value === "string" && value.length > 30) {
      return value.substring(0, 27) + "...";
    }

    return String(value);
  }

  /**
   * Generates summary statistics for result sets
   * @param {Array} rows - Result rows
   * @returns {string} - Summary text
   */
  static generateSummary(rows) {
    if (!rows || rows.length === 0) return "";

    const columns = Object.keys(rows[0]);
    const summaries = [];

    // Look for amount columns to summarize
    const amountColumns = columns.filter(
      (col) =>
        col.toLowerCase().includes("amount") ||
        col.toLowerCase().includes("total") ||
        col.toLowerCase().includes("price")
    );

    amountColumns.forEach((col) => {
      const values = rows
        .map((row) => Number.parseFloat(row[col]))
        .filter((val) => !isNaN(val));

      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        const formattedCol = this.formatColumnName(col);

        summaries.push(
          `• Total ${formattedCol}: $${sum.toLocaleString("en-AU", {
            minimumFractionDigits: 2,
          })}`
        );

        if (values.length > 1) {
          summaries.push(
            `• Average ${formattedCol}: $${avg.toLocaleString("en-AU", {
              minimumFractionDigits: 2,
            })}`
          );
        }
      }
    });

    return summaries.join("\n");
  }
}










// --- EXPORT LOGIC ---

// export class ResultFormatter {
//   /**
//    * Formats SQL query results into readable text
//    * @param {Array} rows - Query result rows
//    * @param {string} userQuery - Original user query for context
//    * @param {boolean} includeExportOptions - Whether to include export options
//    * @returns {string} - Formatted result string
//    */
//   static formatSqlResults(rows, userQuery = "", includeExportOptions = true) {
//     if (!rows || rows.length === 0) {
//       return "📊 No data found matching your criteria. Try adjusting your search parameters or date range."
//     }

//     let formattedResult = ""

//     // Determine formatting style based on result size and content
//     if (rows.length === 1) {
//       formattedResult = this.formatSingleResult(rows[0])
//     } else if (rows.length <= 10) {
//       formattedResult = this.formatDetailedResults(rows, userQuery)
//     } else {
//       formattedResult = this.formatSummaryResults(rows, userQuery)
//     }

//     if (includeExportOptions && rows.length > 0) {
//       formattedResult += this.addExportOptions(rows.length)
//     }

//     return formattedResult
//   }

//   /**
//    * Formats a single result record
//    * @param {Object} row - Single result row
//    * @returns {string} - Formatted single result
//    */
//   static formatSingleResult(row) {
//     const entries = Object.entries(row)
//     const formatted = entries
//       .map(([key, value]) => {
//         const formattedKey = this.formatColumnName(key)
//         const formattedValue = this.formatValue(value, key)
//         return `• ${formattedKey}: ${formattedValue}`
//       })
//       .join("\n")

//     return `📋 **Result Details:**\n${formatted}`
//   }

//   /**
//    * Formats detailed results for small result sets
//    * @param {Array} rows - Result rows
//    * @param {string} userQuery - User query context
//    * @returns {string} - Formatted detailed results
//    */
//   static formatDetailedResults(rows, userQuery) {
//     const header = `📊 **Found ${rows.length} result${rows.length > 1 ? "s" : ""}:**\n`

//     const formatted = rows
//       .map((row, index) => {
//         const entries = Object.entries(row)
//         const rowData = entries
//           .map(([key, value]) => {
//             const formattedKey = this.formatColumnName(key)
//             const formattedValue = this.formatValue(value, key)
//             return `   ${formattedKey}: ${formattedValue}`
//           })
//           .join("\n")

//         return `\n**${index + 1}.** \n${rowData}`
//       })
//       .join("\n")

//     return header + formatted
//   }

//   /**
//    * Formats summary results for large result sets
//    * @param {Array} rows - Result rows
//    * @param {string} userQuery - User query context
//    * @returns {string} - Formatted summary results
//    */
//   static formatSummaryResults(rows, userQuery) {
//     const header = `📊 **Found ${rows.length} results** (showing summary format):\n`

//     // For large datasets, show in table-like format
//     const columns = Object.keys(rows[0])
//     const maxRows = Math.min(rows.length, 50) // Limit display to 50 rows

//     let formatted = ""

//     // Add column headers
//     const headerRow = columns.map((col) => this.formatColumnName(col)).join(" | ")
//     formatted += `\n${headerRow}\n`
//     formatted += `${"-".repeat(headerRow.length)}\n`

//     // Add data rows
//     for (let i = 0; i < maxRows; i++) {
//       const row = rows[i]
//       const rowData = columns.map((col) => this.formatValue(row[col], col, true)).join(" | ")
//       formatted += `${rowData}\n`
//     }

//     if (rows.length > maxRows) {
//       formatted += `\n... and ${rows.length - maxRows} more results\n`
//     }

//     // Add summary statistics if applicable
//     const summary = this.generateSummary(rows)
//     if (summary) {
//       formatted += `\n📈 **Summary:**\n${summary}`
//     }

//     return header + formatted
//   }

//   /**
//    * Formats column names for display
//    * @param {string} columnName - Raw column name
//    * @returns {string} - Formatted column name
//    */
//   static formatColumnName(columnName) {
//     return columnName
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, (l) => l.toUpperCase())
//       .replace(/Id\b/g, "ID")
//       .replace(/Gst\b/g, "GST")
//       .replace(/Lhn\b/g, "LHN")
//       .replace(/Unspsc/g, "UNSPSC")
//   }

//   /**
//    * Formats individual values based on type and context
//    * @param {any} value - Value to format
//    * @param {string} columnName - Column name for context
//    * @param {boolean} compact - Whether to use compact formatting
//    * @returns {string} - Formatted value
//    */
//   static formatValue(value, columnName = "", compact = false) {
//     if (value === null || value === undefined) {
//       return compact ? "N/A" : "Not Available"
//     }

//     const lowerColumn = columnName.toLowerCase()

//     // Format currency values
//     if (
//       lowerColumn.includes("amount") ||
//       lowerColumn.includes("total") ||
//       lowerColumn.includes("price") ||
//       lowerColumn.includes("gst") ||
//       lowerColumn.includes("leakage")
//     ) {
//       const numValue = Number.parseFloat(value)
//       if (!isNaN(numValue)) {
//         return compact
//           ? `$${numValue.toLocaleString("en-AU", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
//           : `$${numValue.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
//       }
//     }

//     // Format dates
//     if (lowerColumn.includes("date")) {
//       const date = new Date(value)
//       if (!isNaN(date.getTime())) {
//         return compact
//           ? date.toLocaleDateString("en-AU")
//           : date.toLocaleDateString("en-AU", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })
//       }
//     }

//     // Format quantities
//     if (lowerColumn.includes("qty") || lowerColumn.includes("quantity")) {
//       const numValue = Number.parseFloat(value)
//       if (!isNaN(numValue)) {
//         return numValue.toLocaleString("en-AU")
//       }
//     }

//     // Format boolean values
//     if (typeof value === "boolean" || value === 0 || value === 1) {
//       if (lowerColumn.includes("includes") || lowerColumn.includes("is_")) {
//         return value ? "✓ Yes" : "✗ No"
//       }
//     }

//     // Truncate long text in compact mode
//     if (compact && typeof value === "string" && value.length > 30) {
//       return value.substring(0, 27) + "..."
//     }

//     return String(value)
//   }

//   /**
//    * Generates summary statistics for result sets
//    * @param {Array} rows - Result rows
//    * @returns {string} - Summary text
//    */
//   static generateSummary(rows) {
//     if (!rows || rows.length === 0) return ""

//     const columns = Object.keys(rows[0])
//     const summaries = []

//     // Look for amount columns to summarize
//     const amountColumns = columns.filter(
//       (col) =>
//         col.toLowerCase().includes("amount") ||
//         col.toLowerCase().includes("total") ||
//         col.toLowerCase().includes("price"),
//     )

//     amountColumns.forEach((col) => {
//       const values = rows.map((row) => Number.parseFloat(row[col])).filter((val) => !isNaN(val))

//       if (values.length > 0) {
//         const sum = values.reduce((a, b) => a + b, 0)
//         const avg = sum / values.length
//         const formattedCol = this.formatColumnName(col)

//         summaries.push(`• Total ${formattedCol}: $${sum.toLocaleString("en-AU", { minimumFractionDigits: 2 })}`)

//         if (values.length > 1) {
//           summaries.push(`• Average ${formattedCol}: $${avg.toLocaleString("en-AU", { minimumFractionDigits: 2 })}`)
//         }
//       }
//     })

//     return summaries.join("\n")
//   }

//   /**
//    * Adds export options to the formatted result
//    * @param {number} recordCount - Number of records available for export
//    * @returns {string} - Export options text
//    */
//   static addExportOptions(recordCount) {
//     return (
//       `\n\n📥 **Export Options Available:**\n` +
//       `• CSV format - Perfect for Excel and data analysis\n` +
//       `• JSON format - Great for developers and APIs\n` +
//       `• Excel format - Business-ready spreadsheet\n\n` +
//       `💡 To export this data, just ask: "Export this as CSV" or "Download as Excel"\n` +
//       `📊 ${recordCount} records ready for export`
//     )
//   }
// }
