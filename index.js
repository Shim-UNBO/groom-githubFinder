const searchButton = document.getElementById('search-button');
const searchUserInput = document.getElementById('search-user');
const profilePhoto = document.getElementById('profile-photo');
const userName = document.getElementById('profile-name');
const followers = document.getElementById('followers-count');
const following = document.getElementById('following-count');
const githubSite = document.getElementById('github-site');
const company = document.getElementById('company');
const reposCount = document.getElementById('repos-count');
const gistsConnt = document.getElementById('gists-count');
const userLocation = document.getElementById('location');
const createAt = document.getElementById('created');

searchButton.addEventListener('click', function() {
    const username = searchUserInput.value.trim(); 
    if (!username) { 
        alert('Please enter a username to search.'); 
    } else {
    fetchGitHubInfo(username);
    }
});
//엔터 처리
searchUserInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { 
        searchButton.click();
    }
});
// 유저정보 가져
function fetchGitHubInfo(username) {
    showSpinner();
    // 사용자 정보 가져오기
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(user => {
            profilePhoto.src = user.avatar_url;
            userName.textContent = user.login;
            followers.textContent = user.followers;
            following.textContent = user.following;
            githubSite.textContent = user.html_url;
            githubSite.href = user.html_url;
            company.textContent = user.company;
            reposCount.textContent = user.public_repos;
            gistsConnt.textContent = user.public_gists;
            userLocation.textContent = user.location;
            createAt.textContent = user.created_at;
        });

    // 레포지토리 정보 가져오기
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            displayRepos(repos);
            hideSpinner();
        });
        fetch('https://api.github.com/users/Shim-UNBO/events')
        .then(response => response.json())
        .then(repos => {
            console.log(repos);
        });
    }

// 레포지토리 목록 보여주기
function displayRepos(repos) {
    const reposContainer = document.getElementById('repos-container');
    reposContainer.innerHTML = '';
    repos.forEach(repo => {
        const repoItem = document.createElement('div');
        repoItem.classList.add('repo-item');
        repoItem.innerHTML = `
            <div class="repo-name">${repo.name}</div>
            <div class="repo-description">${repo.description || 'No description'}</div>
            <div class="repo-info">Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}</div>
        `;
        reposContainer.appendChild(repoItem);
    });
}

//스피너 처리
function showSpinner() {
    document.getElementById('spinner').style.display = 'block';
}

function hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
}
