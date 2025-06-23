//Save nodes of interest in variables
const addPostForm = document.getElementById('addPostForm');
const addNewPostButton = document.querySelector('.add-post-btn');
const editPostForm = document.getElementById('editPostForm');
const editPostButton = document.getElementById('editPostButton');
const cancelEditPostButton = document.getElementById('cancelEditPostButton');
const postList = document.getElementById('postList');
const postCount = document.getElementById('postCount');
const currentContent = document.getElementById('currentContent');
const currentImage = document.getElementById('currentImage');
const currentTitle = document.getElementById('currentTitle');
const currentMeta = document.getElementById('currentMeta');
const cancelAddPost = document.getElementById('cancelAddPost');
const deleteCurrentPost = document.getElementById('deleteCurrentPost');
//Event listeners 
addPostForm.addEventListener('submit', addNewPostListener);
addNewPostButton.addEventListener('click', addPostFormToggle);
editPostButton.addEventListener('click', editPostFormToggle);
cancelEditPostButton.addEventListener('click', cancelEditPost);
postList.addEventListener('click', handlePostClick);
cancelAddPost.addEventListener('click', handleCancelAddPost);
deleteCurrentPost.addEventListener('click', deletePost);
editPostForm.addEventListener('submit', editPost);
//Main function that runs on page load
document.addEventListener('DOMContentLoaded', main);
function main() {
    displayPosts();
    showPostCount();
    setCurrentContent();
}

 
//toggle add new post form when the respective button is clicked
function addPostFormToggle() {
    addPostForm.classList.toggle('active');
}
//show edit post in place of the post when edit button is clicked
function editPostFormToggle() {
    if(!editPostForm.classList.value.includes('active')) {
        document.getElementById('currentImage').style.display = 'none';
        document.getElementById('currentContent').style.display = 'none';
        editPostForm.classList.add('active');
    }
}
//remove the edit form and replace it with current post when cancel button clicked on edit form
function cancelEditPost() {
    document.getElementById('currentImage').style.removeProperty('display');
    document.getElementById('currentContent').style.removeProperty('display');
    editPostForm.classList.remove('active');
}
//Display posts on side panel
function displayPosts() {
    
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then( data => data.forEach( post => {
        const li = document.createElement('li');
        const titleDiv = document.createElement('div');
        const metaDiv = document.createElement('div');
        titleDiv.classList.add('post-title');
        metaDiv.classList.add('post-meta');
        li.classList.add('post-item');
        titleDiv.innerText = post['postTitle'];
        metaDiv.innerText = `${post['author']} • ${post['date']}`;
        li.appendChild(titleDiv);
        li.appendChild(metaDiv);
        postList.appendChild(li);
    }
    ))
    .catch(error => postList.innerText = `Error: ${error}`);
}
function showPostCount() {
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(d => postCount.innerText = `${d.length} Posts`);
}
function handlePostClick(e) {
    const li = e.target.parentElement;
    const ol = li.parentElement;
    const listItems = ol.querySelectorAll('li');
    listItems.forEach( list => list.classList.remove('active'));//remove active class from other li nodes
    li.classList.add('active');//set active class for styling, so much work but I put more work on the style 
    const postName = li.querySelector('div').innerText;

    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then( data => {
        const p = data.find( post => post.postTitle === postName);
        currentContent.innerText = p.post;
        currentImage.src = p.imageUrl;
        currentTitle.innerText = p.postTitle;
        currentMeta.innerText = `${p['author']} • ${p['date']}`;
    })
    .catch(error => currentContent.innerText = `Error: ${error}`);
}
//Add new post to json.db
function addNewPostListener(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.date = new Date().toISOString().split('T')[0];

    fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(post => {
        console.log('Post added:', post);
        postList.innerHTML = "";
        displayPosts();
        addPostForm.reset();
        addPostForm.classList.toggle('active');
    })
    .catch(err => console.error('Error:', err));
    
}
//Cancel adding new post 
function handleCancelAddPost() {
    addPostForm.reset();
    addPostFormToggle();
}
function setCurrentContent(postId = 0) {
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then( data => {
        const p = data[postId];
        currentContent.innerText = p.post;
        currentImage.src = p.imageUrl;
        currentTitle.innerText = p.postTitle;
        currentMeta.innerText = `${p['author']} • ${p['date']}`;
    })
    .catch(error => currentContent.innerText = `Error: ${error}`);
}
function editPost(e) {
    e.preventDefault();
     fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then( data => {
            const current = data.find( post => post.postTitle === currentTitle.innerText);
            
            const formData = new FormData(e.target);
            const newData = Object.fromEntries(formData.entries());
            const updatedData = {postTitle: newData.postTitle,
                                 post: newData.post
                                }
            fetch(`http://localhost:3000/posts/${current['id']}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(updatedData)
            })   
            .then(response => response.json())
            .then(data => console.log(`update ${data}`));
        
             postList.innerHTML = "";
            
            setCurrentContent();
            displayPosts();
            cancelEditPost();
        });
}    


function deletePost() {
    const sureness = confirm('Are you sure you want to delete the post? The post will be removed permanently from the database');
    if (sureness) {
        fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then( data => {
            const current = data.find( post => post.postTitle === currentTitle.innerText);
            console.log(current);
            fetch(`http://localhost:3000/posts/${current['id']}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                }
            })   
            .then(response => response.json())
            .then(data => {console.log(`deleted ${data}`)}
            );
            postList.innerHTML = "";
            currentContent.innerHTML = "";
            currentImage.innerHTML = "";
            setCurrentContent();
            displayPosts();
        })
        .catch(error => console.log(error));
    }    
}

