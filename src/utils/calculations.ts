export const calculateResults = (userInput: string, sampleText: string, time: number) => {
    const totalCharacters = userInput.length;
    const words = userInput.trim().split(/\s+/).length;
    const wpm = Math.round((words / time) * 60);
    
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === sampleText[i]) {
        correctChars++;
      }
    }
    const accuracy = totalCharacters > 0 ? Math.round((correctChars / totalCharacters) * 100) : 0;
  
    return { wpm, accuracy, words, characters: totalCharacters };
};
  

export const formatTextIntoLines = (text: string, charsPerLine: number) => {
    const words = text.split(' ');
    const result: string[] = [];
    let currentLine = '';
  
    words.forEach(word => {
      if (currentLine.length + word.length + 1 <= charsPerLine) {
        currentLine += (currentLine.length === 0 ? '' : ' ') + word;
      } else {
        result.push(currentLine);
        currentLine = word;
      }
    });
  
    if (currentLine.length > 0) {
      result.push(currentLine);
    }
  
    return result;
};