/**
 * Direct Download Manager - Generates downloads without server-side file storage
 * Provides immediate download functionality for query results
 */

export class DirectDownloadManager {
  /**
   * Generates download data for immediate client-side download
   * @param {Array} rows - Query result rows
   * @param {string} format - Export format (csv, json, excel)
   * @param {string} userQuery - Original user query for metadata
   * @returns {Object} - Download data ready for client
   */
  static generateDownloadData(rows, format = "csv", userQuery = "") {
    if (!rows || rows.length === 0) {
      throw new Error("No data to export")
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5)
    const baseFilename = this.generateFilename(userQuery)
    const filename = `${baseFilename}_${timestamp}`

    switch (format.toLowerCase()) {
      case "csv":
        return this.generateCSVDownload(rows, filename, userQuery)
      case "json":
        return this.generateJSONDownload(rows, filename, userQuery)
      case "excel":
        return this.generateExcelDownload(rows, filename, userQuery)
      default:
        throw new Error(`Unsupported export format: ${format}`)
    }
  }

  /**
   * Generates CSV download data
   */
  static generateCSVDownload(rows, filename, userQuery) {
    const headers = Object.keys(rows[0])

    // Format headers for better readability
    const formattedHeaders = headers.map((header) =>
      header
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(/Id\b/g, "ID")
        .replace(/Gst\b/g, "GST"),
    )

    // Create CSV content
    let csvContent = formattedHeaders.join(",") + "\n"

    // Add data rows
    rows.forEach((row) => {
      const values = headers.map((header) => {
        let value = row[header]

        if (value === null || value === undefined) {
          return ""
        }

        // Format dates
        if (header.toLowerCase().includes("date") && value) {
          const date = new Date(value)
          if (!isNaN(date.getTime())) {
            value = date.toLocaleDateString("en-AU")
          }
        }

        // Escape CSV special characters
        value = String(value)
        if (value.includes(",") || value.includes('"') || value.includes("\n")) {
          value = `"${value.replace(/"/g, '""')}"`
        }

        return value
      })

      csvContent += values.join(",") + "\n"
    })

    // Add metadata header
    const metadata =
      [
        `# Spend Analytix Export - ${new Date().toLocaleString("en-AU")}`,
        `# Query: ${userQuery}`,
        `# Records: ${rows.length}`,
        `#`,
      ].join("\n") + "\n"

    return {
      content: metadata + csvContent,
      filename: `${filename}.csv`,
      mimeType: "text/csv",
      size: (metadata + csvContent).length,
      recordCount: rows.length,
    }
  }

  /**
   * Generates JSON download data
   */
  static generateJSONDownload(rows, filename, userQuery) {
    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        query: userQuery,
        recordCount: rows.length,
        source: "Spend Analytix Bot",
        format: "JSON",
      },
      data: rows.map((row) => {
        const formattedRow = {}
        Object.entries(row).forEach(([key, value]) => {
          // Create camelCase keys
          const camelKey = key.toLowerCase().replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())

          // Format dates as ISO strings
          if (key.toLowerCase().includes("date") && value) {
            const date = new Date(value)
            if (!isNaN(date.getTime())) {
              formattedRow[camelKey] = date.toISOString()
              return
            }
          }

          // Convert numeric strings to numbers
          if (
            key.toLowerCase().includes("amount") ||
            key.toLowerCase().includes("total") ||
            key.toLowerCase().includes("price") ||
            key.toLowerCase().includes("qty")
          ) {
            const numValue = Number.parseFloat(value)
            if (!isNaN(numValue)) {
              formattedRow[camelKey] = numValue
              return
            }
          }

          formattedRow[camelKey] = value
        })
        return formattedRow
      }),
    }

    const jsonContent = JSON.stringify(exportData, null, 2)

    return {
      content: jsonContent,
      filename: `${filename}.json`,
      mimeType: "application/json",
      size: jsonContent.length,
      recordCount: rows.length,
    }
  }

  /**
   * Generates Excel-compatible download data
   */
  static generateExcelDownload(rows, filename, userQuery) {
    const headers = Object.keys(rows[0])

    // Format headers
    const formattedHeaders = headers.map((header) =>
      header
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(/Id\b/g, "ID")
        .replace(/Gst\b/g, "GST"),
    )

    // Create tab-separated content (Excel compatible)
    let content = formattedHeaders.join("\t") + "\n"

    rows.forEach((row) => {
      const values = headers.map((header) => {
        let value = row[header]

        if (value === null || value === undefined) {
          return ""
        }

        // Format dates for Excel
        if (header.toLowerCase().includes("date") && value) {
          const date = new Date(value)
          if (!isNaN(date.getTime())) {
            value = date.toLocaleDateString("en-AU")
          }
        }

        return String(value).replace(/\t/g, " ") // Remove tabs
      })

      content += values.join("\t") + "\n"
    })

    return {
      content: content,
      filename: `${filename}.xlsx`,
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: content.length,
      recordCount: rows.length,
      note: "Excel-compatible tab-separated format",
    }
  }

  /**
   * Generates a clean filename from user query
   */
  static generateFilename(userQuery) {
    if (!userQuery) return "spend_analytics_export"

    return (
      userQuery
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .substring(0, 30) || "spend_analytics_export"
    )
  }
}
