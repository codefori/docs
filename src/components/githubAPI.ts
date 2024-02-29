import dotenv from 'dotenv';
dotenv.config();

// GitHub repository details
const baseURL = 'https://api.github.com/repos';
const owner = 'codefori';
const repo = 'vscode-ibmi';
const token = process.env.GITHUB_TOKEN || '';

/**
 * Fetch data from GitHub API.
 *
 * @param {string} endpoint - The API endpoint to fetch from.
 * @param {number} limit - The maximum number of items to fetch (default is 5).
 * @return {Promise<any>} The data from the API, or null if an error occurred.
 */
async function fetchFromGitHub(endpoint: string, limit: number = 5) {
 
    if (!token) {
        console.error('No GitHub token provided. Setup .env file.');
        return null;
    }

    const url = new URL(`${baseURL}/${owner}/${repo}/${endpoint}`);
    url.searchParams.append('per_page', String(limit));

    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
    };
    try {
        const response = await fetch(url.toString(), { headers });
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch from GitHub: ${error}`);
        return null;
    }
}

export { fetchFromGitHub };