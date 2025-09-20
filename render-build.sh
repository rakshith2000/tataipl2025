#!/usr/bin/env bash
# render-build.sh

# Update package list and install required dependencies
apt-get update
apt-get install -y wget gnupg2

# Install Chrome
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
apt-get update
apt-get install -y google-chrome-stable

# Verify installation
google-chrome --version

<!DOCTYPE html>
<html>
<head>
  <title>Player Finder</title>
</head>
<body>
  <script>
    // --- All functions go here ---
    // (same code as above, just remove module.exports)

    function normalizeName(name) {
      return name.toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\bmohd\b/g, "mohammed")
        .replace(/\bmd\b/g, "mohammed")
        .split(" ")
        .sort()
        .join(" ");
    }

    function levenshtein(a, b) {
      const matrix = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
      );
      for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
      for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          if (a[i - 1] === b[j - 1]) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + 1
            );
          }
        }
      }
      return matrix[a.length][b.length];
    }

    function similarity(a, b) {
      if (!a.length && !b.length) return 100;
      const dist = levenshtein(a, b);
      const maxLen = Math.max(a.length, b.length);
      return Math.round(((maxLen - dist) / maxLen) * 100);
    }

    function tokenSetRatio(a, b) {
      const setA = new Set(a.toLowerCase().split(/\s+/));
      const setB = new Set(b.toLowerCase().split(/\s+/));
      const common = [...setA].filter(x => setB.has(x)).join(" ");
      const diffA = [...setA].filter(x => !setB.has(x)).join(" ");
      const diffB = [...setB].filter(x => !setA.has(x)).join(" ");
      const partials = [
        similarity(common, a),
        similarity(common, b),
        similarity(common + " " + diffA, common + " " + diffB)
      ];
      return Math.max(...partials);
    }

    function tokenSortRatio(a, b) {
      const sortStr = str => str.toLowerCase().split(/\s+/).sort().join(" ");
      return similarity(sortStr(a), sortStr(b));
    }

    function partialRatio(a, b) {
      if (a.length > b.length) [a, b] = [b, a];
      let maxScore = 0;
      for (let i = 0; i <= b.length - a.length; i++) {
        const substring = b.slice(i, i + a.length);
        maxScore = Math.max(maxScore, similarity(a, substring));
      }
      return maxScore;
    }

    function weightedRatio(a, b) {
      return Math.max(
        similarity(a, b),
        tokenSortRatio(a, b),
        tokenSetRatio(a, b),
        partialRatio(a, b)
      );
    }

    function findPlayer(fullName, playerData, threshold = 80) {
      const normalizedSearch = normalizeName(fullName);

      for (const player of playerData) {
        if (normalizeName(player[2]) === normalizedSearch) {
          return player;
        }
      }

      let bestMatch = null;
      let bestScore = 0;

      const strategies = [tokenSetRatio, tokenSortRatio, partialRatio, weightedRatio];

      for (const player of playerData) {
        const dbName = player[2];
        for (const strategy of strategies) {
          const score = strategy(fullName, dbName);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = player;
            if (bestScore === 100) return bestMatch;
          }
        }
      }

      if (bestScore < threshold) {
        const searchInitials = fullName
          .split(/\s+/)
          .filter(w => w.length > 1)
          .map(w => w[0].toUpperCase())
          .join("");

        for (const player of playerData) {
          const dbName = player[2];
          const dbInitials = dbName
            .split(/\s+/)
            .filter(w => w.length > 1)
            .map(w => w[0].toUpperCase())
            .join("");

          if (dbInitials && searchInitials === dbInitials) {
            return player;
          }
        }
      }

      return bestScore >= threshold ? bestMatch : null;
    }

    // Example usage in browser:
    const players = [
      [1, "team1", "Akash Naman Singh"],
      [2, "team2", "Mohammed A Khan"],
      [3, "team3", "John Doe"]
    ];

    console.log(findPlayer("A N Singh", players));
    console.log(findPlayer("Md A Khan", players));
  </script>
</body>
</html>