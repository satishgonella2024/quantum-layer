/**
 * Text Summarization Tool for QuantumLayer agents
 * 
 * This tool allows agents to summarize longer pieces of text.
 */

async function summarizeText(text, maxLength = 100) {
  try {
    // In a real implementation, this would use an AI-powered summarization
    // This is a placeholder implementation
    console.log(`Summarizing text of length ${text.length} (max words: ${maxLength})`);
    
    // Simple extractive summarization - take first paragraph and truncate
    const paragraphs = text.split('\n\n');
    const firstParagraph = paragraphs[0];
    
    // Truncate to rough word count
    const words = firstParagraph.split(' ');
    if (words.length <= maxLength) {
      return firstParagraph;
    }
    
    return words.slice(0, maxLength).join(' ') + '...';
  } catch (error) {
    console.error('Error in summarization tool:', error);
    throw new Error(`Summarization failed: ${error.message}`);
  }
}

module.exports = summarizeText;
