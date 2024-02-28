import dotenv from 'dotenv';
dotenv.config();

// GitHub repository details
const baseURL = 'https://api.github.com/repos';
const owner = 'codefori';
const repo = 'vscode-ibmi';
const token = process.env.GITHUB_TOKEN || '';

async function fetchFromGitHub(endpoint: string) {
    console.log(token); 
    if (!token) {
        console.error('No GitHub token provided. Setup .env file.');
        return null;
    }

    const url = `${baseURL}/${owner}/${repo}/${endpoint}`;
    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
    };
    try {
        const response = await fetch(url, { headers });
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