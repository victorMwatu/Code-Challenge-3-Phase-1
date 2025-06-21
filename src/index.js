//Save nodes of interest in variables
const addPostForm = document.getElementById('addPostForm');
const addNewPostButton = document.querySelector('.add-post-btn');
const editPostForm = document.getElementById('editPostForm');
const editPostButton = document.getElementById('editPostButton');
const cancelEditPostButton = document.getElementById('cancelEditPostButton');
//Event listeners 
addNewPostButton.addEventListener('click', addPostFormToggle);
editPostButton.addEventListener('click', editPostFormToggle);
cancelEditPostButton.addEventListener('click', cancelEditPost);
//toggle add new post form when the respective button is clicked
function addPostFormToggle() {
    // if(addPostForm.classList.value.includes('active')) {
    //     addPostForm.classList.remove('active');
    // }else {
    //     addPostForm.classList.add('active');
    // }
    //Just learnt an easier way below
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