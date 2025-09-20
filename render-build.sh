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

// Levenshtein distance calculation
function levenshteinDistance(a, b) {
    const matrix = [];
    
    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    
    // Fill in the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    
    return matrix[b.length][a.length];
}

// Calculate similarity ratio based on Levenshtein distance
function similarityRatio(str1, str2) {
    const distance = levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    
    if (maxLength === 0) return 100;
    return ((maxLength - distance) / maxLength) * 100;
}

// Normalize names for better matching
function normalizeName(name) {
    // Remove special characters and extra spaces
    let normalized = name.replace(/[^a-zA-Z ]/g, '').toLowerCase().trim();
    
    // Handle common name variations
    normalized = normalized.replace(/\bmohd\b/g, 'mohammed')
                        .replace(/\bmd\b/g, 'mohammed');
    
    // Sort name parts for order-independent matching
    return normalized.split(' ').sort().join(' ');
}

// Token set ratio implementation
function tokenSetRatio(str1, str2) {
    const tokens1 = new Set(str1.split(/\s+/));
    const tokens2 = new Set(str2.split(/\s+/));
    
    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
    const union = new Set([...tokens1, ...tokens2]);
    
    if (union.size === 0) return 100;
    return (intersection.size / union.size) * 100;
}

// Token sort ratio implementation
function tokenSortRatio(str1, str2) {
    const sorted1 = str1.split(/\s+/).sort().join(' ');
    const sorted2 = str2.split(/\s+/).sort().join(' ');
    return similarityRatio(sorted1, sorted2);
}

// Partial ratio implementation
function partialRatio(str1, str2) {
    const shorter = str1.length <= str2.length ? str1 : str2;
    const longer = str1.length <= str2.length ? str2 : str1;
    
    let bestScore = 0;
    
    // Slide the shorter string over the longer one
    for (let i = 0; i <= longer.length - shorter.length; i++) {
        const substring = longer.substring(i, i + shorter.length);
        const score = similarityRatio(shorter, substring);
        if (score > bestScore) {
            bestScore = score;
        }
    }
    
    return bestScore;
}

// Weighted ratio implementation
function weightedRatio(str1, str2) {
    const strategies = [
        tokenSetRatio,
        tokenSortRatio,
        partialRatio,
        similarityRatio
    ];
    
    let total = 0;
    for (const strategy of strategies) {
        total += strategy(str1, str2);
    }
    
    return total / strategies.length;
}

// Find the best matching player
function findPlayer(fullName, playerData, threshold = 80) {
    // First try exact match with normalization
    const normalizedSearch = normalizeName(fullName);
    for (let i = 0; i < playerData.length; i++) {
        if (normalizeName(playerData[i].name) === normalizedSearch) {
            return {
                player: playerData[i],
                score: 100,
                method: "Exact match after normalization"
            };
        }
    }
    
    // Then try fuzzy matching with multiple strategies
    const strategies = [
        { func: tokenSetRatio, name: "Token set ratio" },
        { func: tokenSortRatio, name: "Token sort ratio" },
        { func: partialRatio, name: "Partial ratio" },
        { func: weightedRatio, name: "Weighted ratio" }
    ];
    
    let bestMatch = null;
    let bestScore = 0;
    let bestMethod = "";
    
    for (const player of playerData) {
        const dbName = player.name;
        
        for (const strategy of strategies) {
            const score = strategy.func(fullName, dbName);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = player;
                bestMethod = strategy.name;
                if (bestScore === 100) {
                    return {
                        player: bestMatch,
                        score: bestScore,
                        method: bestMethod
                    };
                }
            }
        }
    }
    
    // Also check initials match (e.g., "A. N. Singh" vs "Akash Naman Singh")
    if (bestScore < threshold) {
        const getInitials = (name) => {
            return name.split(/\s+/)
                .filter(word => word.length > 1 && /[A-Z]/.test(word[0]))
                .map(word => word[0])
                .join('');
        };
        
        const searchInitials = getInitials(fullName);
        for (const player of playerData) {
            const dbName = player.name;
            const dbInitials = getInitials(dbName);
            if (dbInitials && searchInitials === dbInitials) {
                return {
                    player: player,
                    score: 85, // Arbitrary score for initials match
                    method: "Initials match"
                };
            }
        }
    }
    
    if (bestScore >= threshold) {
        return {
            player: bestMatch,
            score: bestScore,
            method: bestMethod
        };
    }
    
    return null;
}

// Example usage with dictionary-style player data
const playerData = [
    {id: 1, team: "Team A", name: "Mohammed Salah", position: "Forward"},
    {id: 2, team: "Team A", name: "Akash Naman Singh", position: "Defender"},
    {id: 3, team: "Team B", name: "Mohd. Ahmed Khan", position: "Midfielder"},
    {id: 4, team: "Team B", name: "A. N. Singh", position: "Defender"},
    {id: 5, team: "Team C", name: "Md. Rahman", position: "Forward"},
    {id: 6, team: "Team C", name: "John David Smith", position: "Midfielder"},
    {id: 7, team: "Team D", name: "J. D. Smith", position: "Defender"},
    {id: 8, team: "Team D", name: "Robert James Johnson", position: "Goalkeeper"}
];

// Test the function
console.log(findPlayer("Akash Singh", playerData)); 
console.log(findPlayer("M. Salah", playerData));    
console.log(findPlayer("J. Smith", playerData));