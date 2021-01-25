// difine variables
let theInput = document.querySelector('.username');
let theButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');

theButton.onclick = function() {
    getRepos();
};
    
    function getRepos() {
    if (theInput.value == "") {
        reposData.innerHTML = '<span>please write the username</span>';
    }
    else {
        fetch(`http://api.github.com/users/${theInput.value}/repos`)
            .then(response => response.json())
            .then(repositories => {
            
            //empty repo data   
            reposData.innerHTML = '';
            
            repositories.forEach (repo => {
               
                let mainDiv = document.createElement('div');
                
                let repoName = document.createTextNode(repo.name);
                
                // append the reponame to the main div 
                mainDiv.appendChild(repoName);
                
                // creat a tag
                let theUrl = document.createElement('a');
                
                // creat text "visit"
                let theUrlText = document.createTextNode("visit");
                
                // append the text to the a tag
                theUrl.appendChild(theUrlText);
                
                theUrl.href = `http://github.com/${theInput.value}/${repo.name}`;
                
                theUrl.setAttribute('target', '_blank');
                //
                mainDiv.appendChild(theUrl);
                
                let starsSpan = document.createElement('span');
                
                let starsText = document.createTextNode(`stars ${repo.stargazers_count}`);
                
                starsSpan.appendChild(starsText);
                
                mainDiv.appendChild(starsSpan);
                
                mainDiv.className = 'repo-box';
                //append the main div to repodata
                reposData.appendChild(mainDiv)
            });
        });

    }
}