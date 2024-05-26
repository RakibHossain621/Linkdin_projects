const backdrop = document.querySelector('.backdrop');
const post_modal_wrapper = document.querySelector(".post_modal_wrapper");
const post_button = document.querySelector(".post_button");
const post_box = document.querySelector(".post_box");
const post_input = document.querySelector(".post-input input");
const file_input = document.querySelector("#file_input");
const fileList = document.querySelector(".file-list");
const add_img = document.querySelector(".add_img")
const errorMessage = document.getElementById('error-message');
const posts_container = document.querySelector("#posts-container");
let totalFiles = 0;

function addPost() {
    const postText = post_box.value.trim();
    const files = file_input.files;

    if (postText === '' && files.length === 0) {
        alert('Please enter text or upload at least one image.');
        return;
    }

    let imagesHtml = '';
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const imgSrc = URL.createObjectURL(file);
                imagesHtml += `<img src="${imgSrc}" alt="Uploaded Image">`;
            }
        }
    }

    posts_container.innerHTML += `
        <div class="main-content">
            <div class="feed-item">
                <div class="post_img">
                    <img src="/images/rakib.jpg" alt="">

                    <div class="post_contant">
                        <div class="div">
                            <h3>Md Rakib Hossain</h3>
                            <h6>Manager, Human Resources ll MBA (HRM) ll LLB ll CODP</h6>
                        </div>
                        <a href="#">+Follow</a>
                    </div>
                </div>
                <div class="post_concect">
                    <p>${postText}</p>
                    ${imagesHtml}
                    <div class="post_like_wrapper">
                        <div class="like">
                            <i class="fa-solid fa-thumbs-up"></i>
                            <i class="fa-solid fa-heart"></i>
                            <i class="fa-solid fa-comment"></i>
                        </div>
                        <div class="comment">
                            <p>${0} comments ${0} reposts</p>
                        </div>
                    </div>
                    <div class="post_comment_wrapeer">
                        <button class="post_btn">
                            <img src="/images/right.png" alt="">
                            <span>Like</span>
                        </button>
                        <button class="post_btn">
                            <img src="/images/comment.png" alt="">
                            <span>Comment</span>
                        </button>
                        <button class="post_btn">
                            <img src="/images/repost.png" alt="">
                            <span>Repost</span>
                        </button>
                        <button class="post_btn">
                            <img src="/images/send.png" alt="">
                            <span>Send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Clear inputs and reset states
    post_box.value = '';
    fileList.innerHTML = '';
    totalFiles = 0;
    imagesHtml = ''
    post_button.disabled = true;
    handleRemove()

}





post_input.addEventListener("click", () => {
    backdrop.classList.add("active")
    post_modal_wrapper.classList.add("active")
});

file_input.addEventListener("change", () => {
    const files = file_input.files;
    errorMessage.textContent = '';

    if (totalFiles + files.length > 4) {
        errorMessage.textContent = 'You can only upload a total of up to 4 files.';
    } else {
        totalFiles += files.length;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => URL.revokeObjectURL(img.src);
                fileList.appendChild(img);
            }
        }
    }
})

post_button.addEventListener("click", addPost)
post_box.addEventListener("input", () => {
    if (post_box.value.trim() === "") {
        post_button.disabled = true;
    } else {
        post_button.disabled = false;
    }
})


backdrop.addEventListener("click", () => {
    handleRemove()
})


function handleRemove() {
    backdrop.classList.remove("active")
    post_modal_wrapper.classList.remove("active")
}