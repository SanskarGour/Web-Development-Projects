async function fetchUserInfo(login) {
    try {
        const response = await fetch(`https://api.github.com/users/${login}`);
        const data = await response.json();
        console.log(data);
        render(data);
    } catch (e) {
       console.log(e);
    }
}

//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

const userContainer = document.querySelector('.user-info-container');
// console.log(userContainer);
userContainer.classList.remove('active');

function render(data){
    const userIcon = document.querySelector('.user-icon');
    const userName = document.querySelector('[user-name]');
    const userDate = document.querySelector('[user-joined-date]');
    const userLink = document.querySelector('[github-link]');
    const userDesc = document.querySelector('.desc');
    const userrepo = document.querySelector('[user-repo-number]');
    const userfollowers = document.querySelector('[user-followers-number]');
    const userfollowing = document.querySelector('[user-following-number]');
    const userlocation = document.querySelector('[user-location]');
    const userwebsite = document.querySelector('[user-website]');
    const usertwitter = document.querySelector('[user-twitter]');
    const usercompany = document.querySelector('[user-company]');
    
    userIcon.src = `${data?.avatar_url}`;
    userName.textContent = data?.name;
    userDate.textContent = data?.created_at;
    userDesc.textContent = data?.bio;
    userrepo.textContent = data?.public_repos;
    userfollowers.textContent = data?.followers;
    userfollowing.textContent = data?.following;
    userlocation.textContent = data?.location;
    userwebsite.textContent = data?.email;
    usertwitter.textContent = data?.twitter_username;
    usercompany.textContent = data?.company;
    userLink.href = `${data?.url}`;
    userLink.textContent = `@${data?.login}`;


    if(data?.location === null){
        userlocation.textContent = 'Not Available';
    }
    if(data?.twitter_username === null){
        usertwitter.textContent = 'Not Available';
    }
    if(data?.email === null){
        userwebsite.textContent = 'Not Available';
    }
    if(data?.company === null){
        usercompany.textContent = 'Not Available';
    }

    userContainer.classList.add('active');
}

const searchInput = document.querySelector('[search-input]');
const searchForm = document.querySelector('[search-form]');

searchForm.addEventListener("submit" , (e)=>{
    e.preventDefault();
    let userSearchName = searchInput.value;
    
    if(userSearchName === ''){
        return;
    }
    else {
        fetchUserInfo(userSearchName);
    }
});

const modeBtn = document.querySelector('.mode-btn');
const wrapper = document.querySelector('.wrapper');
const nav = document.querySelector('.nav');
const searchContainer = document.querySelector('.search-container');
const userInfoContainer = document.querySelector('.user-info-container');
const userInfoCard = document.querySelector('.user-info-card');
const modeImg = document.querySelector('[mode-img]');
const mode = document.querySelector('[mode]');

lightMode();

modeBtn.addEventListener('click',()=>{
    if(wrapper.classList.contains('dark')) lightMode();
    else darkMode();
});

function darkMode(){
    modeImg.src = "assets/images/sun-icon.svg";
    mode.textContent = 'Light';
    wrapper.classList.add('dark');
    nav.classList.add('dark');
    searchContainer.classList.add('dark');
    userInfoContainer.classList.add('dark');
    userInfoCard.classList.add('dark');
}

function lightMode(){   
    modeImg.src = "assets/images/moon-icon.svg";
    mode.textContent = 'Dark';
    wrapper.classList.remove('dark');
    nav.classList.remove('dark');
    searchContainer.classList.remove('dark');
    userInfoContainer.classList.remove('dark');
    userInfoCard.classList.remove('dark');
}

