let currentPage = 1;
const reposPerPage = 5;

// 레포지토리 데이터를 페이지 별로 나누는 함수
function displayRepos(repos, page) {
    const startIndex = (page - 1) * reposPerPage;
    const endIndex = page * reposPerPage;
    const paginatedRepos = repos.slice(startIndex, endIndex);

    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = paginatedRepos.map(repo => `<div>${repo.name}</div>`).join('');

    displayPagination(repos.length, page);
}

// 페이지네이션 컨트롤을 표시하는 함수
function displayPagination(totalRepos, currentPage) {
    let currentPage = 1;
    const reposPerPage = 5;
    const pageCount = Math.ceil(totalRepos / reposPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => displayRepos(repos, i);
        if (i === currentPage) {
            button.classList.add('active');
        }
        pagination.appendChild(button);
    }
}

// 예시를 위한 레포지토리 데이터 가져오기 (실제로는 API 호출에서 가져옵니다)
fetch(`https://api.github.com/users/Shim-UNBO/repos`)
    .then(response => response.json())
    .then(repos => {
        displayRepos(repos, currentPage);
    });