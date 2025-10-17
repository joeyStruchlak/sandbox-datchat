// /**
//  * Professional SQL Result Formatting
//  * Formats query results for optimal presentation
//  */

// export class ResultFormatter {
//   /**
//    * Formats SQL query results into readable text
//    * @param {Array} rows - Query result rows
//    * @param {string} userQuery - Original user query for context
//    * @returns {string} - Formatted result string
//    */
//   static formatSqlResults(rows, userQuery = "") {
//     if (!rows || rows.length === 0) {
//       return "📊 No data found matching your criteria. Try adjusting your search parameters or date range.";
//     }

//     // Determine formatting style based on result size and content
//     if (rows.length === 1) {
//       return this.formatSingleResult(rows[0]);
//     } else if (rows.length <= 10) {
//       return this.formatDetailedResults(rows, userQuery);
//     } else {
//       return this.formatSummaryResults(rows, userQuery);
//     }
//   }

//   /**
//    * Formats a single result record
//    * @param {Object} row - Single result row
//    * @returns {string} - Formatted single result
//    */
//   static formatSingleResult(row) {
//     const entries = Object.entries(row);
//     const formatted = entries
//       .map(([key, value]) => {
//         const formattedKey = this.formatColumnName(key);
//         const formattedValue = this.formatValue(value, key);
//         return `• ${formattedKey}: ${formattedValue}`;
//       })
//       .join("\n");

//     return `📋 **Result Details:**\n${formatted}`;
//   }

//   /**
//    * Formats detailed results for small result sets
//    * @param {Array} rows - Result rows
//    * @param {string} userQuery - User query context
//    * @returns {string} - Formatted detailed results
//    */
//   static formatDetailedResults(rows, userQuery) {
//     const header = `📊 **Found ${rows.length} result${
//       rows.length > 1 ? "s" : ""
//     }:**\n`;

//     const formatted = rows
//       .map((row, index) => {
//         const entries = Object.entries(row);
//         const rowData = entries
//           .map(([key, value]) => {
//             const formattedKey = this.formatColumnName(key);
//             const formattedValue = this.formatValue(value, key);
//             return `   ${formattedKey}: ${formattedValue}`;
//           })
//           .join("\n");

//         return `\n**${index + 1}.** \n${rowData}`;
//       })
//       .join("\n");

//     return header + formatted;
//   }

//   /**
//    * Formats summary results for large result sets
//    * @param {Array} rows - Result rows
//    * @param {string} userQuery - User query context
//    * @returns {string} - Formatted summary results
//    */
//   static formatSummaryResults(rows, userQuery) {
//     const header = `**Found ${rows.length} results** (showing summary format):\n`;

//     // For large datasets, show in table-like format
//     const columns = Object.keys(rows[0]);
//     const maxRows = Math.min(rows.length, 50); // Limit display to 50 rows

//     let formatted = "";

//     // Add column headers
//     const headerRow = columns
//       .map((col) => this.formatColumnName(col))
//       .join(" | ");
//     formatted += `\n${headerRow}\n`;
//     formatted += `${"-".repeat(headerRow.length)}\n`;

//     // Add data rows
//     for (let i = 0; i < maxRows; i++) {
//       const row = rows[i];
//       const rowData = columns
//         .map((col) => this.formatValue(row[col], col, true))
//         .join(" | ");
//       formatted += `${rowData}\n`;
//     }

//     if (rows.length > maxRows) {
//       formatted += `\n... and ${rows.length - maxRows} more results\n`;
//     }

//     // Add summary statistics if applicable
//     const summary = this.generateSummary(rows);
//     if (summary) {
//       formatted += `\n📈 **Summary:**\n${summary}`;
//     }

//     return header + formatted;
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
//       .replace(/Unspsc/g, "UNSPSC");
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
//       return compact ? "N/A" : "Not Available";
//     }

//     const lowerColumn = columnName.toLowerCase();

//     // Format currency values
//     if (
//       lowerColumn.includes("amount") ||
//       lowerColumn.includes("total") ||
//       lowerColumn.includes("price") ||
//       lowerColumn.includes("gst") ||
//       lowerColumn.includes("leakage")
//     ) {
//       const numValue = Number.parseFloat(value);
//       if (!isNaN(numValue)) {
//         return compact
//           ? `$${numValue.toLocaleString("en-AU", {
//               minimumFractionDigits: 0,
//               maximumFractionDigits: 0,
//             })}`
//           : `$${numValue.toLocaleString("en-AU", {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })}`;
//       }
//     }

//     // Format dates
//     if (lowerColumn.includes("date")) {
//       const date = new Date(value);
//       if (!isNaN(date.getTime())) {
//         return compact
//           ? date.toLocaleDateString("en-AU")
//           : date.toLocaleDateString("en-AU", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             });
//       }
//     }

//     // Format quantities
//     if (lowerColumn.includes("qty") || lowerColumn.includes("quantity")) {
//       const numValue = Number.parseFloat(value);
//       if (!isNaN(numValue)) {
//         return numValue.toLocaleString("en-AU");
//       }
//     }

//     // Format boolean values
//     if (typeof value === "boolean" || value === 0 || value === 1) {
//       if (lowerColumn.includes("includes") || lowerColumn.includes("is_")) {
//         return value ? "✓ Yes" : "✗ No";
//       }
//     }

//     // Truncate long text in compact mode
//     if (compact && typeof value === "string" && value.length > 30) {
//       return value.substring(0, 27) + "...";
//     }

//     return String(value);
//   }

//   /**
//    * Generates summary statistics for result sets
//    * @param {Array} rows - Result rows
//    * @returns {string} - Summary text
//    */
//   static generateSummary(rows) {
//     if (!rows || rows.length === 0) return "";

//     const columns = Object.keys(rows[0]);
//     const summaries = [];

//     // Look for amount columns to summarize
//     const amountColumns = columns.filter(
//       (col) =>
//         col.toLowerCase().includes("amount") ||
//         col.toLowerCase().includes("total") ||
//         col.toLowerCase().includes("price")
//     );

//     amountColumns.forEach((col) => {
//       const values = rows
//         .map((row) => Number.parseFloat(row[col]))
//         .filter((val) => !isNaN(val));

//       if (values.length > 0) {
//         const sum = values.reduce((a, b) => a + b, 0);
//         const avg = sum / values.length;
//         const formattedCol = this.formatColumnName(col);

//         summaries.push(
//           `• Total ${formattedCol}: $${sum.toLocaleString("en-AU", {
//             minimumFractionDigits: 2,
//           })}`
//         );

//         if (values.length > 1) {
//           summaries.push(
//             `• Average ${formattedCol}: $${avg.toLocaleString("en-AU", {
//               minimumFractionDigits: 2,
//             })}`
//           );
//         }
//       }
//     });

//     return summaries.join("\n");
//   }
// }

export class ResultFormatter {
  static DISPLAY_LIMITS = {
    SINGLE_RESULT: 1,
    DETAILED_RESULTS: 5,
    SUMMARY_PREVIEW: 10,
    MAX_CHAT_LENGTH: 2000,
  };

  /**
   * Formats SQL query results with enhanced display and download options
   * @param {Array} rows - Query result rows
   * @param {string} userQuery - Original user query for context
   * @param {Object} options - Formatting options
   * @returns {Object} - Formatted result with display text and download data
   */
  static formatSqlResults(rows, userQuery = "", options = {}) {
    if (!rows || rows.length === 0) {
      return {
        displayText:
          "**No Results Found**\n\nNo data matches your criteria. Try adjusting your search parameters or date range.",
        hasDownload: false,
        downloadData: null,
      };
    }

    // Handle single result - just show the data without download buttons
    if (rows.length === 1) {
      const row = rows[0];
      const entries = Object.entries(row);
      let formatted = "**1.** ";

      const formattedFields = [];
      entries.forEach(([key, value]) => {
        const formattedKey = this.formatColumnName(key);
        const formattedValue = this.formatValue(value, key);
        formattedFields.push(`${formattedValue}`);
      });

      formatted += formattedFields.join(", ");

      return {
        displayText: formatted,
        hasDownload: false,
        downloadData: null,
        summaryData: null,
      };
    }

    // Handle multiple results - show summary and download buttons
    const summaryData = this.generateStructuredSummary(rows);

    const displayResult =
      `*Complete dataset available for detailed analysis and export.*\n\n` +
      this.addDownloadButtons(rows.length);

    return {
      displayText: displayResult,
      hasDownload: true,
      downloadData: {
        rows: rows,
        query: userQuery,
        recordCount: rows.length,
      },
      summaryData: summaryData,
    };
  }

  static formatSingleResult(row) {
    const entries = Object.entries(row);
    let formatted = "**Result Found**\n\n";

    entries.forEach(([key, value]) => {
      const formattedKey = this.formatColumnName(key);
      const formattedValue = this.formatValue(value, key);
      formatted += `**${formattedKey}:** ${formattedValue}\n\n`;
    });

    return formatted;
  }

  static formatDetailedResults(rows, userQuery) {
    let formatted = `**Found ${rows.length} Result${
      rows.length > 1 ? "s" : ""
    }**\n\n`;

    rows.forEach((row, index) => {
      formatted += `**${index + 1}.**\n`;

      const keyFields = this.getKeyFields(row);

      const remainingFields = Object.entries(row).filter(
        ([key]) => !keyFields.some(([keyField]) => keyField === key)
      );

      const fieldsToDisplay = keyFields.concat(remainingFields).slice(0, 5);

      fieldsToDisplay.forEach(([key, value]) => {
        const formattedKey = this.formatColumnName(key);
        const formattedValue = this.formatValue(value, key);
        formatted += `**${formattedKey}:** ${formattedValue}\n\n`;
      });

      if (index < rows.length - 1) {
        formatted += "\n";
      }
    });

    const summary = this.generateSummary(rows);
    if (summary) {
      formatted += `**Summary**\n\n${summary}\n\n`;
    }

    return formatted;
  }

  static formatAsMarkdownTable(rows) {
    if (!rows || rows.length === 0) return "";

    const headers = Object.keys(rows[0]);
    const headerRow = `| ${headers.join(" | ")} |`;
    const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`;

    const dataRows = rows.map((row) => {
      return `| ${headers
        .map((key) => this.formatValue(row[key], key))
        .join(" | ")} |`;
    });

    return (
      `**Results Table (${rows.length} rows)**\n\n` +
      [headerRow, separatorRow, ...dataRows].join("\n")
    );
  }

  static formatLargeResultSet(rows, userQuery) {
    let formatted = `📊 **Found ${rows.length.toLocaleString()} Result${
      rows.length > 1 ? "s" : ""
    }**\n\n`;

    const previewRows = rows.slice(0, this.DISPLAY_LIMITS.SUMMARY_PREVIEW);

    previewRows.forEach((row, index) => {
      formatted += `**${index + 1}.**\n`;

      const keyFields = this.getKeyFields(row);

      keyFields.forEach(([key, value]) => {
        const formattedKey = this.formatColumnName(key);
        const formattedValue = this.formatValue(value, key, true);
        formatted += `**${formattedKey}:** ${formattedValue}\n\n`;
      });

      const additionalFields = Object.entries(row)
        .filter(([key]) => !keyFields.some(([kf]) => kf === key))
        .slice(0, 2);

      additionalFields.forEach(([key, value]) => {
        const formattedKey = this.formatColumnName(key);
        const formattedValue = this.formatValue(value, key, true);
        formatted += `_${formattedKey}:_ ${formattedValue}\n\n`;
      });

      formatted += `\n`;
    });

    if (rows.length > this.DISPLAY_LIMITS.SUMMARY_PREVIEW) {
      formatted += `📎 _...and ${
        rows.length - this.DISPLAY_LIMITS.SUMMARY_PREVIEW
      } more results not shown._\n\n`;
    }

    const summary = this.generateSummary(rows);
    if (summary) {
      formatted += `🧾 **Key Insights**\n\n${summary}\n\n`;
    }

    return formatted;
  }

  static getKeyFields(row) {
    const entries = Object.entries(row);
    const priorityFields = [
      "supplier_name",
      "invoice_number",
      "total",
      "amount",
      "leakage",
      "department",
      "lhn",
    ];

    const keyFields = [];
    const otherFields = [];

    entries.forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      if (priorityFields.some((priority) => lowerKey.includes(priority))) {
        keyFields.push([key, value]);
      } else {
        otherFields.push([key, value]);
      }
    });

    return keyFields.slice(0, 3);
  }

  static selectKeyColumns(columns) {
    const priorityColumns = [
      "supplier_name",
      "invoice_number",
      "total",
      "amount",
      "leakage",
      "department",
      "lhn",
      "product_description",
    ];

    const selectedColumns = [];

    priorityColumns.forEach((priority) => {
      const matchingCol = columns.find((col) =>
        col.toLowerCase().includes(priority)
      );
      if (matchingCol && selectedColumns.length < 4) {
        selectedColumns.push(matchingCol);
      }
    });

    if (selectedColumns.length < 4) {
      const remainingCols = columns.filter(
        (col) => !selectedColumns.includes(col)
      );
      selectedColumns.push(
        ...remainingCols.slice(0, 4 - selectedColumns.length)
      );
    }

    return selectedColumns;
  }

  static formatAsTable(rows) {
    if (!rows || rows.length === 0) return "";

    const headers = Object.keys(rows[0]);
    const headerRow = `| ${headers.join(" | ")} |`;
    const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`;

    const dataRows = rows.map((row) => {
      return `| ${headers
        .map((key) => this.formatValue(row[key], key))
        .join(" | ")} |`;
    });

    return [headerRow, separatorRow, ...dataRows].join("\n");
  }

  static addDownloadButtons(recordCount) {
    return (
      `---\n\n` +
      `**Download Complete Results**\n\n` +
      `**${recordCount.toLocaleString()} records** available for download\n\n` +
      `⭳ **[Download Excel File](http://localhost:3001/download-excel)**\n\n` +
      `⭳ **[Download CSV File](http://localhost:3001/download-csv)**\n\n` +
      `⭳ **[Download JSON File](http://localhost:3001/download-json)**\n\n`
    );
  }

  static formatColumnName(columnName) {
    const specialCases = {
      SUPPLIER_NAME: "Supplier Name",
      INVOICE_NUMBER: "Invoice Number",
      INVOICE_TOTAL: "Invoice Total",
      INVOICE_HEADER_TOTAL: "Invoice Header Total",
      Invoice_Header_Total: "Invoice Header Total",
      LINE_ITEMS_TOTAL: "Line Items Total",
      Line_Items_Total: "Line Items Total",
      TOTAL_LINE_AMOUNT_INC_GST: "Total Amount (Inc. GST)",
      TOTAL_LINE_AMOUNT_EXCL_GST: "Total Amount (Exc. GST)",
      PURCHASE_ORDER_NUMBER: "Purchase Order Number",
      INVOICE_DATE: "Invoice Date",
      PRODUCT_DESCRIPTION: "Product Description",
      UNIT_PRICE: "Unit Price",
      QTY_RECEIVED: "Quantity Received",
      LEAKAGE_AMOUNT: "Leakage Amount",
      CONTRACT_NUMBER: "Contract Number",
      CONTRACT_STATUS: "Contract Status",
      DISCREPANCY: "Discrepancy",
      LHN: "Department",
      GST: "GST",
      GST_AMOUNT: "GST Amount",
      UNSPSC_SEGMENT: "UNSPSC Segment",
      UNSPSC_FAMILY: "UNSPSC Family",
      UNSPSC_CLASS: "UNSPSC Class",
      UNSPSC_COMMODITY: "UNSPSC Commodity",
      IS_CATALOGUE: "Catalogue Item",
      INCLUDES_GST: "Includes GST",
      DEPARTMENT_NAME: "Department Name",
      CATEGORY: "Category",
      SUBCATEGORY: "Subcategory",
      PAYMENT_DATE: "Payment Date",
      DUE_DATE: "Due Date",
      CREATED_DATE: "Created Date",
      MODIFIED_DATE: "Modified Date",
      TOTAL_SPEND: "Total Spend",
      AVERAGE_SPEND: "Average Spend",
    };

    if (specialCases[columnName]) {
      return specialCases[columnName];
    }

    return columnName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .replace(/Id\b/g, "ID")
      .replace(/Gst\b/gi, "GST")
      .replace(/Lhn\b/gi, "Department")
      .replace(/Unspsc/gi, "UNSPSC")
      .replace(/Inc\b/gi, "Inc.")
      .replace(/Excl\b/gi, "Exc.")
      .replace(/Qty\b/gi, "Quantity");
  }

  static formatValue(value, columnName = "", compact = false) {
    if (value === null || value === undefined) {
      return compact ? "N/A" : "Not Available";
    }

    const lowerColumn = columnName.toLowerCase();

    if (
      lowerColumn.includes("amount") ||
      lowerColumn.includes("total") ||
      lowerColumn.includes("price") ||
      lowerColumn.includes("gst") ||
      lowerColumn.includes("leakage") ||
      lowerColumn.includes("spend") ||
      lowerColumn.includes("invoice_header") ||
      lowerColumn.includes("line_items")
    ) {
      const numValue = Number.parseFloat(value);
      if (!isNaN(numValue)) {
        if (compact && Math.abs(numValue) >= 1000000) {
          return `$${(numValue / 1000000).toFixed(1)}M`;
        } else if (compact && Math.abs(numValue) >= 1000) {
          return `$${(numValue / 1000).toFixed(1)}K`;
        }
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

    if (lowerColumn.includes("date")) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return compact
          ? date.toLocaleDateString("en-AU", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
          : date.toLocaleDateString("en-AU", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
      }
    }

    if (lowerColumn.includes("qty") || lowerColumn.includes("quantity")) {
      const numValue = Number.parseFloat(value);
      if (!isNaN(numValue)) {
        return numValue.toLocaleString("en-AU");
      }
    }

    if (typeof value === "boolean" || value === 0 || value === 1) {
      if (lowerColumn.includes("includes") || lowerColumn.includes("is_")) {
        return value ? "Yes" : "No";
      }
    }

    if (compact && typeof value === "string" && value.length > 25) {
      return value.substring(0, 22) + "...";
    }

    return String(value);
  }

  static generateStructuredSummary(rows) {
    if (!rows || rows.length === 0) return null;

    const columns = Object.keys(rows[0]);
    const metrics = [];

    const amountColumns = columns.filter(
      (col) =>
        col.toLowerCase().includes("amount") ||
        col.toLowerCase().includes("total") ||
        col.toLowerCase().includes("price") ||
        col.toLowerCase().includes("leakage") ||
        col.toLowerCase().includes("spend") ||
        col.toLowerCase().includes("discrepancy")
    );

    amountColumns.forEach((col) => {
      const values = rows
        .map((row) => Number.parseFloat(row[col]))
        .filter((val) => !isNaN(val));

      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        const formattedCol = this.formatColumnName(col);

        metrics.push({
          label: formattedCol,
          value: sum,
          formattedValue: `$${sum.toLocaleString("en-AU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          type: "currency",
        });

        if (values.length > 1) {
          metrics.push({
            label: `Average ${formattedCol}`,
            value: avg,
            formattedValue: `$${avg.toLocaleString("en-AU", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            type: "currency",
          });
        }
      }
    });

    return {
      totalRecords: rows.length,
      metrics: metrics.slice(0, 4), // Limit to 4 key metrics
    };
  }

  static generateSummary(rows) {
    if (!rows || rows.length === 0) return "";

    const columns = Object.keys(rows[0]);
    const summaries = [];

    const amountColumns = columns.filter(
      (col) =>
        col.toLowerCase().includes("amount") ||
        col.toLowerCase().includes("total") ||
        col.toLowerCase().includes("price") ||
        col.toLowerCase().includes("leakage") ||
        col.toLowerCase().includes("spend")
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
          `**${formattedCol}:** $${sum.toLocaleString("en-AU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        );

        if (values.length > 1) {
          summaries.push(
            `**Average ${formattedCol}:** $${avg.toLocaleString("en-AU", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          );
        }
      }
    });

    const recordSummary = `**Total Records:** ${rows.length.toLocaleString()}`;

    if (summaries.length > 0) {
      return [recordSummary, ...summaries.slice(0, 3)].join("  |  ");
    }

    return recordSummary;
  }
}
