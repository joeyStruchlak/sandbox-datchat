/**
 * Export Manager - Handles data export functionality
 * Supports CSV, Excel, and JSON exports
 */

import fs from "fs"
import path from "path"

export class ExportManager {
  /**
   * Exports query results to specified format
   * @param {Array} rows - Query result rows
   * @param {string} format - Export format (csv, json, excel)
   * @param {string} filename - Base filename
   * @param {string} userQuery - Original user query for metadata
   * @returns {Object} - Export result with file path and metadata
   */
  static async exportData(rows, format = "csv", filename = "spend_analytics_export", userQuery = "") {
    if (!rows || rows.length === 0) {
      throw new Error("No data to export")
    }

    // Create exports directory if it doesn't exist
    const exportsDir = path.join(process.cwd(), "exports")
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5)
    const fullFilename = `${filename}_${timestamp}`

    switch (format.toLowerCase()) {
      case "csv":
        return await this.exportToCSV(rows, fullFilename, exportsDir, userQuery)
      case "json":
        return await this.exportToJSON(rows, fullFilename, exportsDir, userQuery)
      case "excel":
        return await this.exportToExcel(rows, fullFilename, exportsDir, userQuery)
      default:
        throw new Error(`Unsupported export format: ${format}`)
    }
  }

  /**
   * Exports data to CSV format
   * @param {Array} rows - Data rows
   * @param {string} filename - Filename without extension
   * @param {string} exportsDir - Export directory path
   * @param {string} userQuery - User query for metadata
   * @returns {Object} - Export result
   */
  static async exportToCSV(rows, filename, exportsDir, userQuery) {
    const filePath = path.join(exportsDir, `${filename}.csv`)

    // Get column headers
    const headers = Object.keys(rows[0])

    // Format headers (make them readable)
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

        // Handle null/undefined values
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

        // Escape commas and quotes in CSV
        value = String(value)
        if (value.includes(",") || value.includes('"') || value.includes("\n")) {
          value = `"${value.replace(/"/g, '""')}"`
        }

        return value
      })

      csvContent += values.join(",") + "\n"
    })

    // Add metadata as comments at the top
    const metadata =
      [
        `# Spend Analytix Export`,
        `# Generated: ${new Date().toLocaleString("en-AU")}`,
        `# Query: ${userQuery}`,
        `# Records: ${rows.length}`,
        `#`,
      ].join("\n") + "\n"

    const finalContent = metadata + csvContent

    // Write file
    fs.writeFileSync(filePath, finalContent, "utf8")

    return {
      success: true,
      format: "CSV",
      filePath: filePath,
      filename: `${filename}.csv`,
      recordCount: rows.length,
      fileSize: this.getFileSize(filePath),
      downloadUrl: `/api/download/${filename}.csv`,
    }
  }

  /**
   * Exports data to JSON format
   * @param {Array} rows - Data rows
   * @param {string} filename - Filename without extension
   * @param {string} exportsDir - Export directory path
   * @param {string} userQuery - User query for metadata
   * @returns {Object} - Export result
   */
  static async exportToJSON(rows, filename, exportsDir, userQuery) {
    const filePath = path.join(exportsDir, `${filename}.json`)

    // Create structured JSON with metadata
    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        query: userQuery,
        recordCount: rows.length,
        source: "Spend Analytix Bot",
        format: "JSON",
      },
      data: rows.map((row) => {
        // Format the data for better JSON structure
        const formattedRow = {}
        Object.entries(row).forEach(([key, value]) => {
          // Create camelCase keys for JSON
          const camelKey = key.toLowerCase().replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())

          // Format dates as ISO strings
          if (key.toLowerCase().includes("date") && value) {
            const date = new Date(value)
            if (!isNaN(date.getTime())) {
              formattedRow[camelKey] = date.toISOString()
              return
            }
          }

          // Convert numeric strings to numbers where appropriate
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

    // Write file with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2), "utf8")

    return {
      success: true,
      format: "JSON",
      filePath: filePath,
      filename: `${filename}.json`,
      recordCount: rows.length,
      fileSize: this.getFileSize(filePath),
      downloadUrl: `/api/download/${filename}.json`,
    }
  }

  /**
   * Exports data to Excel format (simplified - creates CSV with .xlsx extension)
   * For full Excel support, you'd need a library like 'exceljs'
   * @param {Array} rows - Data rows
   * @param {string} filename - Filename without extension
   * @param {string} exportsDir - Export directory path
   * @param {string} userQuery - User query for metadata
   * @returns {Object} - Export result
   */
  static async exportToExcel(rows, filename, exportsDir, userQuery) {
    // For now, create a tab-separated file that Excel can open
    // In production, you'd want to use a proper Excel library
    const filePath = path.join(exportsDir, `${filename}.xlsx`)

    // Get column headers
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

    // Write file
    fs.writeFileSync(filePath, content, "utf8")

    return {
      success: true,
      format: "Excel (Tab-separated)",
      filePath: filePath,
      filename: `${filename}.xlsx`,
      recordCount: rows.length,
      fileSize: this.getFileSize(filePath),
      downloadUrl: `/api/download/${filename}.xlsx`,
      note: "Excel-compatible tab-separated format. For full Excel features, consider upgrading to ExcelJS library.",
    }
  }

  /**
   * Gets file size in human-readable format
   * @param {string} filePath - Path to file
   * @returns {string} - Formatted file size
   */
  static getFileSize(filePath) {
    const stats = fs.statSync(filePath)
    const bytes = stats.size

    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  /**
   * Lists available export files
   * @returns {Array} - List of available export files
   */
  static listExports() {
    const exportsDir = path.join(process.cwd(), "exports")

    if (!fs.existsSync(exportsDir)) {
      return []
    }

    const files = fs.readdirSync(exportsDir)
    return files.map((file) => {
      const filePath = path.join(exportsDir, file)
      const stats = fs.statSync(filePath)

      return {
        filename: file,
        size: this.getFileSize(filePath),
        created: stats.birthtime.toLocaleString("en-AU"),
        downloadUrl: `/api/download/${file}`,
      }
    })
  }

  /**
   * Cleans up old export files (older than 24 hours)
   */
  static cleanupOldExports() {
    const exportsDir = path.join(process.cwd(), "exports")

    if (!fs.existsSync(exportsDir)) {
      return
    }

    const files = fs.readdirSync(exportsDir)
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

    files.forEach((file) => {
      const filePath = path.join(exportsDir, file)
      const stats = fs.statSync(filePath)

      if (stats.birthtime.getTime() < oneDayAgo) {
        fs.unlinkSync(filePath)
        console.log(`[Export Cleanup] Removed old export: ${file}`)
      }
    })
  }
}
