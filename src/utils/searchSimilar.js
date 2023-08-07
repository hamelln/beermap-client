const consonants = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";
const vowels = "ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ";

function levenshteinDistance(a, b) {
  const matrix = [];
  let i, j;

  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function decomposeHangul(syllable) {
  const baseCode = syllable.charCodeAt(0) - 44032;
  if (baseCode < 0 || baseCode > 11171) return null;

  const consonantIndex = Math.floor(baseCode / 588);
  const vowelIndex = Math.floor((baseCode - consonantIndex * 588) / 28);
  const finalIndex = (baseCode % 28) - 1;

  return [
    consonants[consonantIndex],
    vowels[vowelIndex],
    ...(finalIndex >= 0 ? [consonants[finalIndex]] : []),
  ];
}

function separateJamos(word) {
  return word.split("").flatMap(decomposeHangul).join("");
}

function searchSimilar(query, breweries) {
  const decomposedQuery = separateJamos(query);
  const threshold = 0.3;

  return breweries.filter((brewery) => {
    const decomposedName = separateJamos(brewery.name);
    const distance = levenshteinDistance(decomposedName, decomposedQuery);
    const similarity =
      1 - distance / Math.max(decomposedName.length, decomposedQuery.length);

    return similarity >= threshold;
  });
}

export default searchSimilar;
