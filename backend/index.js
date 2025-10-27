// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import { OpenAI } from "openai";
// import sql from "mssql";
// import path from "path";
// import fs from "fs";

// // Import our new modules
// import {
//   SPEND_ANALYTIX_CONTEXT,
//   GREETING_RESPONSES,
// } from "./context/spend-analytix-context.js";
// import { SQLGuardrails } from "./guardrails/sql-guardrails.js";
// import { ADVANCED_SCHEMA_PROMPT } from "./utils/database-schema.js";
// import { ResultFormatter } from "./utils/result-formatter.js";
// import { QueryClassifier } from "./utils/query-classifier.js";
// // import { ExportManager } from "./utils/export-manager.js";

// // SQL connection config
// const sqlConfig = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   server: process.env.DB_SERVER,
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000,
//   },
//   options: {
//     encrypt: true,
//     trustServerCertificate: false,
//   },
// };

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/exports", express.static(path.join(process.cwd(), "exports")));

// // Initialize OpenAI
// const token = process.env.OPEN_API_KEY;
// const client = new OpenAI({
//   baseURL: "https://models.inference.ai.azure.com",
//   apiKey: token,
// });

// let lastQueryResults = null;
// let lastUserQuery = "";

// app.post("/chat", async (req, res) => {
//   try {
//     const userMessage = req.body.message;

//     if (!userMessage || typeof userMessage !== "string") {
//       return res.status(400).json({
//         reply: "❌ Please provide a valid message.",
//       });
//     }

//     if (QueryClassifier.isExportRequest(userMessage)) {
//       return await handleExportRequest(res, userMessage);
//     }

//     // Classify the user's query
//     const classification = QueryClassifier.classifyQuery(userMessage);
//     console.log(
//       `Query classified as: ${classification.type} (confidence: ${classification.confidence})`
//     );

//     // Handle different types of queries
//     switch (classification.type) {
//       case "greeting":
//         return await handleGreeting(res, userMessage);

//       case "help":
//         return await handleHelpRequest(res, userMessage);

//       case "predefined_query":
//         return await handlePredefinedQuery(res, classification);

//       case "query_suggestions":
//         return await handleQuerySuggestions(res, classification);

//       case "conversational":
//         return await handleConversationalQuery(res, userMessage);

//       case "data_query":
//         return await handleDataQuery(res, userMessage);

//       default:
//         // Fallback to conversational
//         return await handleConversationalQuery(res, userMessage);
//     }
//   } catch (error) {
//     console.error("Error in chat endpoint:", error);
//     res.status(500).json({
//       reply:
//         "❌ I'm experiencing technical difficulties. Please try again in a moment.",
//     });
//   }
// });

// async function handleGreeting(res, userMessage) {
//   const randomGreeting =
//     GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)];
//   return res.json({ reply: randomGreeting });
// }

// async function handleHelpRequest(res, userMessage) {
//   const helpResponse = `
// 🤖 **SpendBot - Advanced Spend Analytics Assistant**

// **🎯 Predefined Analytics (Just Ask!):**
// • Total spend leakage by department
// • Top 5 suppliers by spending with leakage analysis
// • Catalogue vs non-catalogue leakage comparison
// • Contract compliance analysis
// • High risk transactions (>$1000 leakage)
// • Spend by product category (UNSPSC)
// • Monthly spend trends over time
// • Duplicate invoice detection
// • Price variance analysis

// **💬 Natural Language Queries:**
// • "Show me suppliers in alphabetical order"
// • "Find invoices over $50,000 from last quarter"
// • "Which products have the highest price variance?"
// • "List all contracts with compliance issues"
// • "Show me duplicate payments by supplier"

// **📊 Advanced Features:**
// • Intelligent table joins across invoice headers and line items
// • Automatic data type conversion for calculations
// • Business intelligence insights with percentages and trends
// • Export results to CSV, Excel, or JSON formats
// • Professional formatting with currency and statistics

// **💡 Pro Tips:**
// • Ask for "query suggestions" to see all available analytics
// • Use specific terms like "leakage", "compliance", "variance"
// • Request exports: "Export this as Excel" after any query
// • I understand business context and provide executive-ready insights

// **🔍 Example Advanced Query:**
// "Show me suppliers with highest leakage rates and their contract status"

// What financial insights would you like to explore?
//   `;

//   return res.json({ reply: helpResponse.trim() });
// }

// async function handleConversationalQuery(res, userMessage) {
//   try {
//     const response = await client.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         {
//           role: "system",
//           content: SPEND_ANALYTIX_CONTEXT,
//         },
//         {
//           role: "user",
//           content: userMessage,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 1000,
//       top_p: 1,
//     });

//     return res.json({ reply: response.choices[0].message.content });
//   } catch (error) {
//     console.error("Error in conversational query:", error);
//     return res.json({
//       reply:
//         "I'm here to help with Spend Analytix questions and data analysis. What would you like to know?",
//     });
//   }
// }

// async function handleDataQuery(res, userMessage) {
//   try {
//     // Sanitize user input
//     const sanitizedInput = SQLGuardrails.sanitizeInput(userMessage);

//     // Connect to database
//     const pool = await sql.connect(sqlConfig);

//     const gptResponse = await client.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         {
//           role: "system",
//           content: ADVANCED_SCHEMA_PROMPT,
//         },
//         {
//           role: "user",
//           content: sanitizedInput,
//         },
//       ],
//       temperature: 0,
//       max_tokens: 800, // Increased token limit for complex queries
//     });

//     let generatedQuery = gptResponse.choices[0].message.content.trim();

//     // Remove any markdown formatting
//     generatedQuery = generatedQuery
//       .replace(/```sql\n?/g, "")
//       .replace(/```\n?/g, "");

//     console.log("Generated advanced query:", generatedQuery);

//     // Validate query with guardrails
//     const validation = SQLGuardrails.validateQuery(generatedQuery);

//     if (!validation.isValid) {
//       return res.json({
//         reply: `🚫 **Query Safety Check Failed:** ${validation.message}\n\nPlease rephrase your request to focus on data analysis and reporting.`,
//       });
//     }

//     // Enhance query with safety measures
//     const safeQuery = SQLGuardrails.enhanceQuery(generatedQuery);

//     console.log("Executing safe advanced query:", safeQuery);

//     // Execute the query
//     const result = await pool.request().query(safeQuery);

//     lastQueryResults = result.recordset;
//     lastUserQuery = userMessage;

//     const formattedResults = ResultFormatter.formatSqlResults(
//       result.recordset,
//       userMessage,
//       {
//         isAdvancedAnalytics: true,
//         queryType: "custom",
//       }
//     );

//     return res.json({ reply: formattedResults });
//   } catch (error) {
//     console.error("Database query error:", error);

//     let errorMessage = "❌ **Advanced Query Error:** ";

//     if (error.message.includes("Operand data type nvarchar is invalid")) {
//       errorMessage +=
//         "Data type conversion issue detected. The system attempted to perform mathematical operations on text fields. This has been automatically corrected in newer queries.";
//     } else if (error.message.includes("Invalid object name")) {
//       errorMessage +=
//         "The requested data table was not found. Available tables: goods_invoicefields_temp, goods_lineitems_temp";
//     } else if (error.message.includes("Invalid column name")) {
//       errorMessage +=
//         "One or more column names in the query are invalid. Please verify the field names or ask for 'query suggestions'.";
//     } else if (error.message.includes("Syntax error")) {
//       errorMessage +=
//         "There was a syntax error in the generated query. Please try rephrasing your request.";
//     } else if (error.message.includes("Conversion failed")) {
//       errorMessage +=
//         "Unable to convert text data to numbers for calculation. Some data may contain invalid numeric values.";
//     } else {
//       errorMessage +=
//         "Unable to process your advanced data request. Please try a different query or contact support.";
//     }

//     errorMessage += "\n\n💡 **Try These Instead:**\n";
//     errorMessage +=
//       "• 'Show me query suggestions' - See all available analytics\n";
//     errorMessage += "• 'Top 5 suppliers by spending' - Predefined analysis\n";
//     errorMessage +=
//       "• 'Total spend leakage by department' - Executive insights\n";
//     errorMessage += "• 'List all suppliers' - Simple data retrieval\n";

//     return res.json({ reply: errorMessage });
//   }
// }

// // async function handleExportRequest(res, userMessage) {
// //   try {
// //     if (!lastQueryResults || lastQueryResults.length === 0) {
// //       return res.json({
// //         reply:
// //           '❌ **No Data to Export**\n\nPlease run a data query first, then ask me to export the results.\n\n💡 **Example:**\n1. Ask: "Show me all suppliers"\n2. Then ask: "Export this as CSV"',
// //       });
// //     }

// //     // Determine export format from user message
// //     const format = QueryClassifier.getExportFormat(userMessage);

// //     // Generate filename based on query
// //     const filename = QueryClassifier.generateExportFilename(lastUserQuery);

// //     console.log(`Exporting ${lastQueryResults.length} records as ${format}`);

// //     // Export the data
// //     const exportResult = await ExportManager.exportData(
// //       lastQueryResults,
// //       format,
// //       filename,
// //       lastUserQuery
// //     );

// //     let response =
// //       `✅ **Export Successful!**\n\n` +
// //       `📁 **File Details:**\n` +
// //       `• Format: ${exportResult.format}\n` +
// //       `• Records: ${exportResult.recordCount.toLocaleString()}\n` +
// //       `• File Size: ${exportResult.fileSize}\n` +
// //       `• Filename: ${exportResult.filename}\n\n` +
// //       `📥 **Download Link:**\n` +
// //       `http://localhost:3001${exportResult.downloadUrl}\n\n` +
// //       `💡 **Tip:** Right-click the link and select "Save As" to download the file.`;

// //     if (exportResult.note) {
// //       response += `\n\n📝 **Note:** ${exportResult.note}`;
// //     }

// //     return res.json({ reply: response });
// //   } catch (error) {
// //     console.error("Export error:", error);
// //     return res.json({
// //       reply: `❌ **Export Error:** ${error.message}\n\nPlease try again or use a different export format.`,
// //     });
// //   }
// // }

// async function handlePredefinedQuery(res, classification) {
//   try {
//     const { query, category } = classification.query;

//     console.log(`Executing predefined query from category: ${category}`);
//     console.log("Query:", query.query);

//     // Connect to database
//     const pool = await sql.connect(sqlConfig);

//     // Execute the predefined query directly (already validated)
//     const result = await pool.request().query(query.query);

//     lastQueryResults = result.recordset;
//     lastUserQuery = query.description;

//     // Format results with enhanced context
//     const formattedResults = ResultFormatter.formatSqlResults(
//       result.recordset,
//       query.description,
//       {
//         category: category,
//         isAdvancedAnalytics: true,
//         queryType: "predefined",
//       }
//     );

//     return res.json({ reply: formattedResults });
//   } catch (error) {
//     console.error("Predefined query error:", error);
//     return res.json({
//       reply: `❌ **Advanced Analytics Error:** Unable to execute the ${classification.query.category} analysis. Please try a different query or contact support.`,
//     });
//   }
// }

// async function handleQuerySuggestions(res, classification) {
//   const suggestions = classification.suggestions;

//   let response = `🎯 **Spend Analytix - Advanced Analytics Queries**\n\n`;
//   response += `Here are some powerful insights I can provide:\n\n`;

//   suggestions.forEach((suggestion, index) => {
//     response += `**${index + 1}. ${suggestion.title}**\n`;
//     response += `${suggestion.description}\n`;
//     response += `💡 *Try asking: "${suggestion.keywords
//       .slice(0, 2)
//       .join(" ")}"*\n\n`;
//   });

//   response += `📊 **Quick Examples:**\n`;
//   response += `• "Show me suppliers with highest leakage rates and their contract status"\n`;
//   response += `• "Top 5 suppliers by spending"\n`;
//   response += `• "Catalogue vs non-catalogue leakage"\n`;
//   response += `• "List all contracts with compliance issues"\n`;
//   response += `• "Show me duplicate invoice line items"\n\n`;

//   response += `💬 **Or ask me anything about your spend data in natural language!**`;

//   return res.json({ reply: response });
// }

// app.get("/api/download/:filename", (req, res) => {
//   try {
//     const filename = req.params.filename;
//     const filePath = path.join(process.cwd(), "exports", filename);

//     // Security check - ensure file exists and is in exports directory
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ error: "File not found" });
//     }

//     // Verify file is actually in exports directory (prevent directory traversal)
//     const resolvedPath = path.resolve(filePath);
//     const exportsDir = path.resolve(path.join(process.cwd(), "exports"));

//     if (!resolvedPath.startsWith(exportsDir)) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     // Set appropriate headers for download
//     const ext = path.extname(filename).toLowerCase();
//     let contentType = "application/octet-stream";

//     switch (ext) {
//       case ".csv":
//         contentType = "text/csv";
//         break;
//       case ".json":
//         contentType = "application/json";
//         break;
//       case ".xlsx":
//         contentType =
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//         break;
//     }

//     res.setHeader("Content-Type", contentType);
//     res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

//     // Stream the file
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
//   } catch (error) {
//     console.error("Download error:", error);
//     res.status(500).json({ error: "Download failed" });
//   }
// });

// // app.get("/api/exports", (req, res) => {
// //   try {
// //     const exports = ExportManager.listExports();
// //     res.json({
// //       success: true,
// //       exports: exports,
// //       count: exports.length,
// //     });
// //   } catch (error) {
// //     console.error("List exports error:", error);
// //     res.status(500).json({ error: "Failed to list exports" });
// //   }
// // });

// app.get("/env-debug", (req, res) => {
//   res.json({
//     DB_SERVER: process.env.DB_SERVER ? "✓ Set" : "❌ Missing",
//     DB_USER: process.env.DB_USER ? "✓ Set" : "❌ Missing",
//     DB_DATABASE: process.env.DB_DATABASE ? "✓ Set" : "❌ Missing",
//     OPEN_API_KEY: process.env.OPEN_API_KEY ? "✓ Set" : "❌ Missing",
//     timestamp: new Date().toISOString(),
//     status: "Spend Analytix Backend Active",
//   });
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     service: "Spend Analytix Backend",
//     version: "1.0.0",
//     timestamp: new Date().toISOString(),
//   });
// });

// // Start server
// app.listen(3001, () => {
//   console.log("Backend running on http://localhost:3001");
//   console.log("🤖 SpendBot is ready to analyze your spend data!");

//   // console.log("🧹 Cleaning up old export files...");
//   // ExportManager.cleanupOldExports();
// });

// // // --- EXPORT LOGIC  ---

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import sql from "mssql";
import path from "path";
import fs from "fs";
import XLSX from "xlsx";

// Import our new modules
import {
  SPEND_ANALYTIX_CONTEXT,
  GREETING_RESPONSES,
} from "./context/spend-analytix-context.js";
import { SQLGuardrails } from "./guardrails/sql-guardrails.js";
import { ADVANCED_SCHEMA_PROMPT } from "./utils/database-schema.js";
import { ResultFormatter } from "./utils/result-formatter.js";
import { QueryClassifier } from "./utils/query-classifier.js";
import { ExportManager } from "./utils/export-manager.js";
import { DirectDownloadManager } from "./utils/direct-download-manager.js";

// SQL connection config
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

const app = express();
app.use(cors());
app.use(express.json());

app.use("/exports", express.static(path.join(process.cwd(), "exports")));

// Initialize OpenAI
const token = process.env.OPEN_API_KEY;
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: token,
});

const queryLogs = []; // Could later persist to DB or file

let lastQueryResults = null;
let lastUserQuery = "";
let lastDownloadData = null;

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("User request received:", userMessage);

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({
        reply: "❌ Please provide a valid message.",
      });
    }

    if (userMessage === "DOWNLOAD_EXCEL_BUTTON") {
      return await handleExcelDownload(res);
    }

    if (QueryClassifier.isExportRequest(userMessage)) {
      return await handleExportRequest(res, userMessage);
    }

    // Classify the user's query
    const classification = QueryClassifier.classifyQuery(userMessage);
    console.log(
      `Query classified as: ${classification.type} (confidence: ${classification.confidence})`
    );

    // Handle different types of queries
    switch (classification.type) {
      case "greeting":
        return await handleGreeting(res, userMessage);

      case "help":
        return await handleHelpRequest(res, userMessage);

      case "predefined_query":
        return await handlePredefinedQuery(res, classification);

      case "query_suggestions":
        return await handleQuerySuggestions(res, classification);

      case "conversational":
        return await handleConversationalQuery(res, userMessage);

      case "data_query":
        return await handleDataQuery(res, userMessage);

      default:
        // Fallback to conversational
        return await handleConversationalQuery(res, userMessage);
    }
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({
      reply:
        "❌ I'm experiencing technical difficulties. Please try again in a moment.",
    });
  }
});

async function handleGreeting(res, userMessage) {
  const randomGreeting =
    GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)];
  return res.json({ reply: randomGreeting });
}

async function handleHelpRequest(res, userMessage) {
  const helpResponse = `
🤖 **SpendBot - Advanced Spend Analytics Assistant**

**🎯 Predefined Analytics (Just Ask!):**
• Total spend leakage by department
• Top 5 suppliers by spending with leakage analysis  
• Catalogue vs non-catalogue leakage comparison
• Contract compliance analysis
• High risk transactions (>$1000 leakage)
• Spend by product category (UNSPSC)
• Monthly spend trends over time
• Duplicate invoice detection
• Price variance analysis

**💬 Natural Language Queries:**
• "Show me suppliers in alphabetical order"
• "Find invoices over $50,000 from last quarter"
• "Which products have the highest price variance?"
• "List all contracts with compliance issues"
• "Show me duplicate payments by supplier"

**📊 Advanced Features:**
• Intelligent table joins across invoice headers and line items
• Automatic data type conversion for calculations
• Business intelligence insights with percentages and trends
• Export results to CSV, Excel, or JSON formats
• Professional formatting with currency and statistics

**💡 Pro Tips:**
• Ask for "query suggestions" to see all available analytics
• Use specific terms like "leakage", "compliance", "variance"
• Request exports: "Export this as Excel" after any query
• I understand business context and provide executive-ready insights

**🔍 Example Advanced Query:**
"Show me suppliers with highest leakage rates and their contract status"

What financial insights would you like to explore?
  `;

  return res.json({ reply: helpResponse.trim() });
}

async function handleConversationalQuery(res, userMessage) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: SPEND_ANALYTIX_CONTEXT,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
    });

    return res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error in conversational query:", error);
    return res.json({
      reply:
        "I'm here to help with your data questions and data analysis. What would you like to know?",
    });
  }
}

async function handleDataQuery(res, userMessage) {
  try {
    // Sanitize user input
    const sanitizedInput = SQLGuardrails.sanitizeInput(userMessage);

    // Connect to database
    const pool = await sql.connect(sqlConfig);

    const gptResponse = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: ADVANCED_SCHEMA_PROMPT,
        },
        {
          role: "user",
          content: sanitizedInput,
        },
      ],
      temperature: 0,
      max_tokens: 800, // Increased token limit for complex queries
    });

    let generatedQuery = gptResponse.choices[0].message.content.trim();

    // Remove any markdown formatting
    generatedQuery = generatedQuery
      .replace(/```sql\n?/g, "")
      .replace(/```\n?/g, "");

    console.log("Generated advanced query:", generatedQuery);

    // Validate query with guardrails
    const validation = SQLGuardrails.validateQuery(generatedQuery);

    if (!validation.isValid) {
      return res.json({
        reply: `🚫 **Query Safety Check Failed:** ${validation.message}\n\nPlease rephrase your request to focus on data analysis and reporting.`,
      });
    }

    // Enhance query with safety measures
    const safeQuery = SQLGuardrails.enhanceQuery(generatedQuery);

    console.log("Executing safe advanced query:", safeQuery);

    // Execute the query
    const result = await pool.request().query(safeQuery);

    const formattedResult = ResultFormatter.formatSqlResults(
      result.recordset,
      userMessage
    );

    // Store results for potential download
    lastQueryResults = result.recordset;
    lastUserQuery = userMessage;

    if (formattedResult.hasDownload) {
      lastDownloadData = formattedResult.downloadData;
    }

    // New: Log full query context for visualisation or auditing
    queryLogs.push({
      timestamp: new Date().toISOString(),
      userQuestion: userMessage,
      generatedSQL: generatedQuery,
      executedSQL: safeQuery,
      recordSample: result.recordset.slice(0, 10), // optional: log a sample
      rowCount: result.recordset.length,
    });

    console.log("✅ Logged Query:", queryLogs[queryLogs.length - 1]);

    return res.json({
      reply: formattedResult.displayText,
      hasDownload: formattedResult.hasDownload,
      chartData: result.recordset,
      recordCount: result.recordset.length,
    });
  } catch (error) {
    console.error("Database query error:", error);

    let errorMessage = "❌ **Advanced Query Error:** ";

    if (error.message.includes("Operand data type nvarchar is invalid")) {
      errorMessage +=
        "Data type conversion issue detected. The system attempted to perform mathematical operations on text fields. This has been automatically corrected in newer queries.";
    } else if (error.message.includes("Invalid object name")) {
      errorMessage +=
        "The requested data table was not found. Available tables: goods_invoicefields, goods_lineitems_ps";
    } else if (error.message.includes("Invalid column name")) {
      errorMessage +=
        "One or more column names in the query are invalid. Please verify the field names or ask for 'query suggestions'.";
    } else if (error.message.includes("Syntax error")) {
      errorMessage +=
        "There was a syntax error in the generated query. Please try rephrasing your request.";
    } else if (error.message.includes("Conversion failed")) {
      errorMessage +=
        "Unable to convert text data to numbers for calculation. Some data may contain invalid numeric values.";
    } else {
      errorMessage +=
        "Unable to process your advanced data request. Please try a different query or contact support.";
    }

    errorMessage += "\n\n💡 **Try These Instead:**\n";
    errorMessage +=
      "• 'Show me query suggestions' - See all available analytics\n";
    errorMessage += "• 'Top 5 suppliers by spending' - Predefined analysis\n";
    errorMessage +=
      "• 'Total spend leakage by department' - Executive insights\n";
    errorMessage += "• 'List all suppliers' - Simple data retrieval\n";

    return res.json({ reply: errorMessage });
  }
}

async function handleExcelDownload(res) {
  try {
    if (!lastQueryResults || lastQueryResults.length === 0) {
      return res.json({
        reply:
          "❌ **No Data Available**\n\nPlease run a data query first to generate results for download.",
      });
    }

    console.log(
      `Generating Excel download for ${lastQueryResults.length} records`
    );

    const downloadData = DirectDownloadManager.generateDownloadData(
      lastQueryResults,
      "excel",
      lastUserQuery
    );

    return res.json({
      reply: `✅ **Excel Download Ready!**\n\n📁 **File Details:**\n• Format: Excel (.xlsx)\n• Records: ${downloadData.recordCount.toLocaleString()}\n• Size: ${formatFileSize(
        downloadData.size
      )}\n\n🔽 **Your Excel file is downloading now...**`,
      downloadReady: true,
      downloadData: {
        content: downloadData.content,
        filename: downloadData.filename,
        mimeType: downloadData.mimeType,
        size: downloadData.size,
      },
    });
  } catch (error) {
    console.error("Excel download error:", error);
    return res.json({
      reply: `❌ **Excel Download Error:** ${error.message}\n\nPlease try running your query again.`,
    });
  }
}

async function handleExportRequest(res, userMessage) {
  try {
    if (!lastQueryResults || lastQueryResults.length === 0) {
      return res.json({
        reply:
          '❌ **No Data Available**\n\nPlease run a data query first, then ask me to export the results.\n\n💡 **Example:**\n1. Ask: "Show me all suppliers"\n2. Then ask: "Download as CSV"',
      });
    }

    // Determine export format
    const format = QueryClassifier.getExportFormat(userMessage);

    console.log(
      `Generating direct download for ${lastQueryResults.length} records as ${format}`
    );

    const downloadData = DirectDownloadManager.generateDownloadData(
      lastQueryResults,
      format,
      lastUserQuery
    );

    return res.json({
      reply: `✅ **Download Ready!**\n\n📁 **File Details:**\n• Format: ${format.toUpperCase()}\n• Records: ${downloadData.recordCount.toLocaleString()}\n• Size: ${formatFileSize(
        downloadData.size
      )}\n\n🔽 **Your download will start automatically...**`,
      downloadReady: true,
      downloadData: {
        content: downloadData.content,
        filename: downloadData.filename,
        mimeType: downloadData.mimeType,
        size: downloadData.size,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return res.json({
      reply: `❌ **Export Error:** ${error.message}\n\nPlease try again or use a different export format.`,
    });
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

async function handlePredefinedQuery(res, classification) {
  try {
    const { query, category } = classification.query;

    console.log(`Executing predefined query from category: ${category}`);
    console.log("Query:", query.query);

    // Connect to database
    const pool = await sql.connect(sqlConfig);

    // Execute the predefined query directly (already validated)
    const result = await pool.request().query(query.query);

    lastQueryResults = result.recordset;
    lastUserQuery = query.description;

    // Format results with enhanced context
    const formattedResults = ResultFormatter.formatSqlResults(
      result.recordset,
      query.description,
      {
        category: category,
        isAdvancedAnalytics: true,
        queryType: "predefined",
      }
    );

    return res.json({ reply: formattedResults });
  } catch (error) {
    console.error("Predefined query error:", error);
    return res.json({
      reply: `❌ **Advanced Analytics Error:** Unable to execute the ${classification.query.category} analysis. Please try a different query or contact support.`,
    });
  }
}

async function handleQuerySuggestions(res, classification) {
  const suggestions = classification.suggestions;

  let response = `**Spend Analytix - Advanced Analytics Queries**\n\n`;
  response += `Here are some powerful insights I can provide:\n\n`;

  suggestions.forEach((suggestion, index) => {
    response += `**${index + 1}. ${suggestion.title}**\n`;
    response += `${suggestion.description}\n`;
    response += `💡 *Try asking: "${suggestion.keywords
      .slice(0, 2)
      .join(" ")}"*\n\n`;
  });

  response += `**Quick Examples:**\n`;
  response += `• "Show me suppliers with highest leakage rates and their contract status"\n`;
  response += `• "Top 5 suppliers by spending"\n`;
  response += `• "Catalogue vs non-catalogue leakage"\n`;
  response += `• "List all contracts with compliance issues"\n`;
  response += `• "Show me duplicate invoice line items"\n\n`;

  response += `**Or ask me anything about your spend data in natural language!**`;

  return res.json({ reply: response });
}

// JOEY set other file endpoints
app.get("/download-excel", (req, res) => {
  if (!lastQueryResults || lastQueryResults.length === 0) {
    return res.status(400).send("No data available to download.");
  }

  const worksheet = XLSX.utils.json_to_sheet(lastQueryResults);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=SpendAnalytix_Results.xlsx"
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.send(buffer);
});

app.get("/api/download/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), "exports", filename);

    // Security
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    // Verify file is actually in exports directory (prevent directory traversal)
    const resolvedPath = path.resolve(filePath);
    const exportsDir = path.resolve(path.join(process.cwd(), "exports"));

    if (!resolvedPath.startsWith(exportsDir)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";

    switch (ext) {
      case ".csv":
        contentType = "text/csv";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".xlsx":
        contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Download failed" });
  }
});

app.get("/api/exports", (req, res) => {
  try {
    const exports = ExportManager.listExports();
    res.json({
      success: true,
      exports: exports,
      count: exports.length,
    });
  } catch (error) {
    console.error("List exports error:", error);
    res.status(500).json({ error: "Failed to list exports" });
  }
});

app.get("/env-debug", (req, res) => {
  res.json({
    DB_SERVER: process.env.DB_SERVER ? "✓ Set" : "❌ Missing",
    DB_USER: process.env.DB_USER ? "✓ Set" : "❌ Missing",
    DB_DATABASE: process.env.DB_DATABASE ? "✓ Set" : "❌ Missing",
    OPEN_API_KEY: process.env.OPEN_API_KEY ? "✓ Set" : "❌ Missing",
    timestamp: new Date().toISOString(),
    status: "Spend Analytix Backend Active",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "Spend Analytix Backend",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
  console.log("SpendBot is ready to analyze your spend data!");

  console.log("Cleaning up old export files...");
  ExportManager.cleanupOldExports();
});
