// /**
//  * Query Classification and Intent Detection
//  * Determines whether user input requires SQL query or conversational response
//  */

// export class QueryClassifier {
//   // Keywords that indicate data query intent
//   static DATA_QUERY_KEYWORDS = [
//     // Query verbs
//     "show",
//     "list",
//     "find",
//     "get",
//     "display",
//     "search",
//     "lookup",
//     "retrieve",
//     "give me",
//     "tell me",
//     "what are",
//     "how many",
//     "how much",
//     "which",

//     // Data entities
//     "invoice",
//     "invoices",
//     "supplier",
//     "suppliers",
//     "vendor",
//     "vendors",
//     "payment",
//     "payments",
//     "amount",
//     "total",
//     "spend",
//     "spending",
//     "contract",
//     "contracts",
//     "product",
//     "products",
//     "item",
//     "items",
//     "leakage",
//     "duplicate",
//     "duplicates",
//     "order",
//     "orders",

//     // Analysis terms
//     "top",
//     "bottom",
//     "highest",
//     "lowest",
//     "most",
//     "least",
//     "average",
//     "sum",
//     "count",
//     "total",
//     "breakdown",
//     "analysis",
//     "report",
//     "between",
//     "from",
//     "to",
//     "in",
//     "during",
//     "last",
//     "this",

//     // Sorting and filtering
//     "alphabetical",
//     "chronological",
//     "ascending",
//     "descending",
//     "greater than",
//     "less than",
//     "above",
//     "below",
//     "over",
//     "under",
//   ];

//   // Keywords that indicate conversational intent
//   static CONVERSATIONAL_KEYWORDS = [
//     "hello",
//     "hi",
//     "hey",
//     "greetings",
//     "good morning",
//     "good afternoon",
//     "how are you",
//     "what can you do",
//     "help",
//     "about",
//     "explain",
//     "what is",
//     "tell me about",
//     "describe",
//     "define",
//     "meaning",
//     "thank you",
//     "thanks",
//     "goodbye",
//     "bye",
//     "see you",
//   ];

//   // Keywords that indicate help requests
//   static HELP_KEYWORDS = [
//     "help",
//     "assist",
//     "support",
//     "guide",
//     "how to",
//     "can you",
//     "what can",
//     "capabilities",
//     "features",
//     "options",
//     "commands",
//   ];

//   /**
//    * Classifies user input to determine response type
//    * @param {string} userInput - User's message
//    * @returns {Object} - Classification result
//    */
//   static classifyQuery(userInput) {
//     const lowerInput = userInput.toLowerCase().trim();

//     // Check for greeting patterns
//     if (this.isGreeting(lowerInput)) {
//       return {
//         type: "greeting",
//         confidence: 0.9,
//         intent: "greeting",
//       };
//     }

//     // Check for help requests
//     if (this.isHelpRequest(lowerInput)) {
//       return {
//         type: "help",
//         confidence: 0.8,
//         intent: "help_request",
//       };
//     }

//     // Check for data query patterns
//     if (this.isDataQuery(lowerInput)) {
//       return {
//         type: "data_query",
//         confidence: this.calculateDataQueryConfidence(lowerInput),
//         intent: "data_analysis",
//       };
//     }

//     // Check for conversational patterns
//     if (this.isConversational(lowerInput)) {
//       return {
//         type: "conversational",
//         confidence: 0.7,
//         intent: "general_conversation",
//       };
//     }

//     // Default to data query if uncertain but contains business terms
//     if (this.containsBusinessTerms(lowerInput)) {
//       return {
//         type: "data_query",
//         confidence: 0.6,
//         intent: "potential_data_query",
//       };
//     }

//     // Default to conversational
//     return {
//       type: "conversational",
//       confidence: 0.5,
//       intent: "general_conversation",
//     };
//   }

//   /**
//    * Checks if input is a greeting
//    * @param {string} input - Lowercase user input
//    * @returns {boolean}
//    */
//   static isGreeting(input) {
//     const greetingPatterns = [
//       /^(hi|hello|hey|greetings)\b/,
//       /^good (morning|afternoon|evening)/,
//       /how are you/,
//       /^(what's up|whats up)/,
//     ];

//     return greetingPatterns.some((pattern) => pattern.test(input));
//   }

//   /**
//    * Checks if input is a help request
//    * @param {string} input - Lowercase user input
//    * @returns {boolean}
//    */
//   static isHelpRequest(input) {
//     return (
//       this.HELP_KEYWORDS.some((keyword) => input.includes(keyword)) ||
//       /what can you (do|help)/.test(input) ||
//       /how (do|can) i/.test(input)
//     );
//   }

//   /**
//    * Checks if input is a data query
//    * @param {string} input - Lowercase user input
//    * @returns {boolean}
//    */
//   static isDataQuery(input) {
//     const dataQueryCount = this.DATA_QUERY_KEYWORDS.filter((keyword) =>
//       input.includes(keyword)
//     ).length;

//     return dataQueryCount >= 2 || this.hasStrongDataQueryIndicators(input);
//   }

//   /**
//    * Checks for strong data query indicators
//    * @param {string} input - Lowercase user input
//    * @returns {boolean}
//    */
//   static hasStrongDataQueryIndicators(input) {
//     const strongIndicators = [
//       /show me (all|the|top|bottom)/,
//       /list (all|the|top)/,
//       /find (all|the|top)/,
//       /get (all|the|top)/,
//       /how many/,
//       /how much/,
//       /what are the (top|bottom|highest|lowest)/,
//       /give me (a list|the)/,
//       /in alphabetical order/,
//       /order by/,
//       /group by/,
//       /between .+ and/,
//       /greater than/,
//       /less than/,
//       /above \$?\d+/,
//       /below \$?\d+/,
//       /over \$?\d+/,
//       /under \$?\d+/,
//     ];

//     return strongIndicators.some((pattern) => pattern.test(input));
//   }

//   /**
//    * Checks if input is conversational
//    * @param {string} input - Lowercase user input
//    * @returns {boolean}
//    */
//   static isConversational(input) {
//     return this.CONVERSATIONAL_KEYWORDS.some((keyword) =>
//       input.includes(keyword)
//     );
//   }

//   /**
//    * Checks if input contains business terms
//    * @param {string} input - Lowercase user input
//    * @returns {boolean}
//    */
//   static containsBusinessTerms(input) {
//     const businessTerms = [
//       "spend",
//       "invoice",
//       "supplier",
//       "contract",
//       "payment",
//       "procurement",
//       "vendor",
//       "purchase",
//       "cost",
//       "budget",
//       "financial",
//       "analytics",
//     ];

//     return businessTerms.some((term) => input.includes(term));
//   }

//   /**
//    * Calculates confidence score for data queries
//    * @param {string} input - Lowercase user input
//    * @returns {number} - Confidence score between 0 and 1
//    */
//   static calculateDataQueryConfidence(input) {
//     let score = 0.5; // Base score

//     // Count matching keywords
//     const keywordMatches = this.DATA_QUERY_KEYWORDS.filter((keyword) =>
//       input.includes(keyword)
//     ).length;

//     score += Math.min(keywordMatches * 0.1, 0.3);

//     // Boost for strong indicators
//     if (this.hasStrongDataQueryIndicators(input)) {
//       score += 0.2;
//     }

//     // Boost for specific patterns
//     if (/\b(top|bottom)\s+\d+/.test(input)) score += 0.1;
//     if (/\$\d+/.test(input)) score += 0.1;
//     if (/\d{4}/.test(input)) score += 0.1; // Year patterns

//     return Math.min(score, 1.0);
//   }
// }

// // --- EXPORT LOGIC ---

export class QueryClassifier {
  // Keywords that indicate data query intent
  static DATA_QUERY_KEYWORDS = [
    // Query verbs
    "show",
    "list",
    "find",
    "get",
    "display",
    "search",
    "lookup",
    "retrieve",
    "give me",
    "tell me",
    "what are",
    "how many",
    "how much",
    "which",

    // Data entities
    "invoice",
    "invoices",
    "supplier",
    "suppliers",
    "vendor",
    "vendors",
    "payment",
    "payments",
    "amount",
    "total",
    "spend",
    "spending",
    "contract",
    "contracts",
    "product",
    "products",
    "item",
    "items",
    "leakage",
    "duplicate",
    "duplicates",
    "order",
    "orders",

    // Analysis terms
    "top",
    "bottom",
    "highest",
    "lowest",
    "most",
    "least",
    "average",
    "sum",
    "count",
    "total",
    "breakdown",
    "analysis",
    "report",
    "between",
    "from",
    "to",
    "in",
    "during",
    "last",
    "this",

    // Sorting and filtering
    "alphabetical",
    "chronological",
    "ascending",
    "descending",
    "greater than",
    "less than",
    "above",
    "below",
    "over",
    "under",
  ];

  // Keywords that indicate conversational intent
  static CONVERSATIONAL_KEYWORDS = [
    "hello",
    "hi",
    "hey",
    "greetings",
    "good morning",
    "good afternoon",
    "how are you",
    "what can you do",
    "help",
    "about",
    "explain",
    "what is",
    "tell me about",
    "describe",
    "define",
    "meaning",
    "thank you",
    "thanks",
    "goodbye",
    "bye",
    "see you",
  ];

  // Keywords that indicate help requests
  static HELP_KEYWORDS = [
    "help",
    "assist",
    "support",
    "guide",
    "how to",
    "can you",
    "what can",
    "capabilities",
    "features",
    "options",
    "commands",
  ];

  static EXPORT_KEYWORDS = [
    "export",
    "download",
    "save",
    "file",
    "csv",
    "excel",
    "json",
    "spreadsheet",
    "extract",
  ];

  /**
   * Classifies user input to determine response type
   * @param {string} userInput - User's message
   * @returns {Object} - Classification result
   */
  static classifyQuery(userInput) {
    const lowerInput = userInput.toLowerCase().trim();

    // Check for greeting patterns
    if (this.isGreeting(lowerInput)) {
      return {
        type: "greeting",
        confidence: 0.9,
        intent: "greeting",
      };
    }

    // Check for help requests
    if (this.isHelpRequest(lowerInput)) {
      return {
        type: "help",
        confidence: 0.8,
        intent: "help_request",
      };
    }

    // Check for data query patterns
    if (this.isDataQuery(lowerInput)) {
      return {
        type: "data_query",
        confidence: this.calculateDataQueryConfidence(lowerInput),
        intent: "data_analysis",
      };
    }

    // Check for conversational patterns
    if (this.isConversational(lowerInput)) {
      return {
        type: "conversational",
        confidence: 0.7,
        intent: "general_conversation",
      };
    }

    // Default to data query if uncertain but contains business terms
    if (this.containsBusinessTerms(lowerInput)) {
      return {
        type: "data_query",
        confidence: 0.6,
        intent: "potential_data_query",
      };
    }

    // Default to conversational
    return {
      type: "conversational",
      confidence: 0.5,
      intent: "general_conversation",
    };
  }

  /**
   * Checks if input is a greeting
   * @param {string} input - Lowercase user input
   * @returns {boolean}
   */
  static isGreeting(input) {
    const greetingPatterns = [
      /^(hi|hello|hey|greetings)\b/,
      /^good (morning|afternoon|evening)/,
      /how are you/,
      /^(what's up|whats up)/,
    ];

    return greetingPatterns.some((pattern) => pattern.test(input));
  }

  /**
   * Checks if input is a help request
   * @param {string} input - Lowercase user input
   * @returns {boolean}
   */
  static isHelpRequest(input) {
    return (
      this.HELP_KEYWORDS.some((keyword) => input.includes(keyword)) ||
      /what can you (do|help)/.test(input) ||
      /how (do|can) i/.test(input)
    );
  }

  /**
   * Checks if input is a data query
   * @param {string} input - Lowercase user input
   * @returns {boolean}
   */
  static isDataQuery(input) {
    const dataQueryCount = this.DATA_QUERY_KEYWORDS.filter((keyword) =>
      input.includes(keyword)
    ).length;

    return dataQueryCount >= 2 || this.hasStrongDataQueryIndicators(input);
  }

  /**
   * Checks for strong data query indicators
   * @param {string} input - Lowercase user input
   * @returns {boolean}
   */
  static hasStrongDataQueryIndicators(input) {
    const strongIndicators = [
      /show me (all|the|top|bottom)/,
      /list (all|the|top)/,
      /find (all|the|top)/,
      /get (all|the|top)/,
      /how many/,
      /how much/,
      /what are the (top|bottom|highest|lowest)/,
      /give me (a list|the)/,
      /in alphabetical order/,
      /order by/,
      /group by/,
      /between .+ and/,
      /greater than/,
      /less than/,
      /above \$?\d+/,
      /below \$?\d+/,
      /over \$?\d+/,
      /under \$?\d+/,
    ];

    return strongIndicators.some((pattern) => pattern.test(input));
  }

  /**
   * Checks if input is conversational
   * @param {string} input - Lowercase user input
   * @returns {boolean}
   */
  static isConversational(input) {
    return this.CONVERSATIONAL_KEYWORDS.some((keyword) =>
      input.includes(keyword)
    );
  }

  /**
   * Checks if input contains business terms
   * @param {string} input - Lowercase user input
   * @returns {boolean}
   */
  static containsBusinessTerms(input) {
    const businessTerms = [
      "spend",
      "invoice",
      "supplier",
      "contract",
      "payment",
      "procurement",
      "vendor",
      "purchase",
      "cost",
      "budget",
      "financial",
      "analytics",
    ];

    return businessTerms.some((term) => input.includes(term));
  }

  /**
   * Calculates confidence score for data queries
   * @param {string} input - Lowercase user input
   * @returns {number} - Confidence score between 0 and 1
   */
  static calculateDataQueryConfidence(input) {
    let score = 0.5; // Base score

    // Count matching keywords
    const keywordMatches = this.DATA_QUERY_KEYWORDS.filter((keyword) =>
      input.includes(keyword)
    ).length;

    score += Math.min(keywordMatches * 0.1, 0.3);

    // Boost for strong indicators
    if (this.hasStrongDataQueryIndicators(input)) {
      score += 0.2;
    }

    // Boost for specific patterns
    if (/\b(top|bottom)\s+\d+/.test(input)) score += 0.1;
    if (/\$\d+/.test(input)) score += 0.1;
    if (/\d{4}/.test(input)) score += 0.1; // Year patterns

    return Math.min(score, 1.0);
  }

  /**
   * Checks if input is an export request
   * @param {string} userInput - User's message
   * @returns {boolean}
   */
  static isExportRequest(userInput) {
    const lowerInput = userInput.toLowerCase().trim();

    // Direct export patterns
    const exportPatterns = [
      /export (this|that|the data|results?)/,
      /download (this|that|the data|results?)/,
      /save (this|that|the data|results?) (as|to)/,
      /export (as|to) (csv|excel|json)/,
      /download (as|to) (csv|excel|json)/,
      /give me (a|the) (csv|excel|json) file/,
      /can you export/,
      /i want to download/,
      /save to file/,
      /create (a|an) (csv|excel|json)/,
    ];

    // Check for export patterns
    if (exportPatterns.some((pattern) => pattern.test(lowerInput))) {
      return true;
    }

    // Check for export keywords combined with format keywords
    const hasExportKeyword = this.EXPORT_KEYWORDS.some((keyword) =>
      lowerInput.includes(keyword)
    );
    const hasFormatKeyword = [
      "csv",
      "excel",
      "json",
      "spreadsheet",
      "file",
    ].some((format) => lowerInput.includes(format));

    return (
      hasExportKeyword &&
      (hasFormatKeyword ||
        lowerInput.includes("this") ||
        lowerInput.includes("data"))
    );
  }

  /**
   * Determines export format from user input
   * @param {string} userInput - User's message
   * @returns {string} - Export format (csv, excel, json)
   */
  static getExportFormat(userInput) {
    const lowerInput = userInput.toLowerCase();

    if (
      lowerInput.includes("excel") ||
      lowerInput.includes("xlsx") ||
      lowerInput.includes("spreadsheet")
    ) {
      return "excel";
    }

    if (lowerInput.includes("json")) {
      return "json";
    }

    // Default to CSV (most common business format)
    return "csv";
  }

  /**
   * Generates appropriate filename based on the original query
   * @param {string} originalQuery - The original data query
   * @returns {string} - Generated filename
   */
  static generateExportFilename(originalQuery) {
    if (!originalQuery) {
      return "spend_analytics_data";
    }

    const lowerQuery = originalQuery.toLowerCase();

    // Extract key terms for filename
    let filename = "spend_analytics";

    if (lowerQuery.includes("supplier")) {
      filename += "_suppliers";
    } else if (lowerQuery.includes("invoice")) {
      filename += "_invoices";
    } else if (lowerQuery.includes("contract")) {
      filename += "_contracts";
    } else if (lowerQuery.includes("payment")) {
      filename += "_payments";
    } else if (lowerQuery.includes("product")) {
      filename += "_products";
    } else if (lowerQuery.includes("leakage")) {
      filename += "_leakage";
    } else if (lowerQuery.includes("duplicate")) {
      filename += "_duplicates";
    } else {
      filename += "_data";
    }

    // Add analysis type
    if (lowerQuery.includes("top")) {
      filename += "_top";
    } else if (lowerQuery.includes("summary") || lowerQuery.includes("total")) {
      filename += "_summary";
    } else if (lowerQuery.includes("detail")) {
      filename += "_detailed";
    }

    return filename;
  }
}
