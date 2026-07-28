// SEO Keyword Auto-Linker for SAINIK Hospital Blog

export const TARGET_KEYWORDS = [
  { keyword: "best skin doctors near me", url: "/doctors" },
  { keyword: "best hair doctors near me", url: "/doctors" },
  { keyword: "best lady doctors near me", url: "/doctors" },
  { keyword: "good doctors near me", url: "/doctors" },
  { keyword: "best doctors near me", url: "/doctors" }
];

// Sort keywords by length descending so longer specific phrases match before shorter ones
TARGET_KEYWORDS.sort((a, b) => b.keyword.length - a.keyword.length);

/**
 * Automatically converts the first occurrence of each SEO target keyword into an internal link
 * subject to:
 * 1. Max 1 link per keyword per article.
 * 2. At least 1000 characters between consecutive linked keywords.
 * 3. Excludes headings (h1-h6), existing anchor tags (a), buttons, image captions, and URLs.
 * 4. Preserves all original HTML structure, tags, and formatting.
 */
export const processBlogSEOContent = (htmlContent) => {
  if (!htmlContent) return "";

  const usedKeywords = new Set();
  let lastLinkedCharIndex = -1000; // Allow first link immediately
  let cumulativeCharCount = 0;

  // Regex to split HTML into tags vs text nodes
  const tokens = htmlContent.split(/(<[^>]+>)/g);
  
  let excludedTagStack = [];

  const processedTokens = tokens.map((token) => {
    // If token is an HTML tag
    if (token.startsWith("<") && token.endsWith(">")) {
      const tagNameMatch = token.match(/^<\/?([a-zA-Z0-9]+)/);
      if (tagNameMatch) {
        const tag = tagNameMatch[1].toLowerCase();
        const isClosing = token.startsWith("</");

        // Track tags inside which linking is prohibited
        if (["h1", "h2", "h3", "h4", "h5", "h6", "a", "button", "figcaption", "script", "style"].includes(tag)) {
          if (!isClosing && !token.endsWith("/>")) {
            excludedTagStack.push(tag);
          } else if (isClosing) {
            const lastIdx = excludedTagStack.lastIndexOf(tag);
            if (lastIdx !== -1) {
              excludedTagStack.splice(lastIdx, 1);
            }
          }
        }
      }
      return token; // Return HTML tag unmodified
    }

    // Token is a text node
    if (excludedTagStack.length > 0 || !token.trim()) {
      cumulativeCharCount += token.length;
      return token; // Inside excluded tag (like <h2> or <a>), return untouched
    }

    let resultText = "";
    let textIndex = 0;

    while (textIndex < token.length) {
      let earliestMatch = null;
      let earliestMatchKeyword = null;

      // Find the earliest valid matching target keyword in this text node
      for (const item of TARGET_KEYWORDS) {
        const kwLower = item.keyword.toLowerCase();
        if (usedKeywords.has(kwLower)) continue; // Rule 2 & 5: max 1 per keyword

        // Escape regex special chars
        const escapedKw = item.keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKw}\\b`, 'gi');
        regex.lastIndex = textIndex;
        
        const match = regex.exec(token);
        if (match) {
          const matchIndex = match.index;
          if (!earliestMatch || matchIndex < earliestMatch.index) {
            earliestMatch = match;
            earliestMatchKeyword = item;
          }
        }
      }

      if (earliestMatch && earliestMatchKeyword) {
        const matchPos = earliestMatch.index;
        const matchText = earliestMatch[0];
        const absolutePos = cumulativeCharCount + matchPos;

        // Check Rule 3 & 4: Must be at least 1000 characters after previous linked keyword
        if (absolutePos - lastLinkedCharIndex >= 1000) {
          // Append text before match
          resultText += token.slice(textIndex, matchPos);
          // Append link tag
          resultText += `<a href="${earliestMatchKeyword.url}" class="blog-inline-link">${matchText}</a>`;
          
          // Update tracking
          usedKeywords.add(earliestMatchKeyword.keyword.toLowerCase());
          lastLinkedCharIndex = absolutePos;
          textIndex = matchPos + matchText.length;
        } else {
          // Under 1000 char threshold -> keep plain text up to end of match
          resultText += token.slice(textIndex, matchPos + matchText.length);
          textIndex = matchPos + matchText.length;
        }
      } else {
        // No further keyword matches in this text token
        resultText += token.slice(textIndex);
        break;
      }
    }

    cumulativeCharCount += token.length;
    return resultText;
  });

  return processedTokens.join("");
};
