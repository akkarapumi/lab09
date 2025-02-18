document.addEventListener("DOMContentLoaded", () => {
    const postsList = document.getElementById("posts-list");
    const userNameElement = document.getElementById("user-name");

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (!userId) {
        postsList.innerHTML = "<p>ไม่พบโพสต์ของผู้ใช้</p>";
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            userNameElement.textContent = user.name;
        })
        .catch(error => console.error("Error fetching user:", error));

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postItem = document.createElement("div");
                postItem.classList.add("post-item");
                postItem.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <button class="toggle-comments" data-post-id="${post.id}">ดูความคิดเห็น</button>
                    <div class="comments" id="comments-${post.id}" style="display: none;"></div>
                `;
                postsList.appendChild(postItem);
            });

            document.querySelectorAll(".toggle-comments").forEach(button => {
                button.addEventListener("click", (event) => {
                    const postId = event.target.dataset.postId;
                    const commentsDiv = document.getElementById(`comments-${postId}`);

                    if (commentsDiv.style.display === "none") {
                        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                            .then(response => response.json())
                            .then(comments => {
                                commentsDiv.innerHTML = comments.map(comment => `
                                    <p><strong>${comment.name}</strong>: ${comment.body}</p>
                                `).join("");
                                commentsDiv.style.display = "block";
                                event.target.textContent = "ซ่อนความคิดเห็น";
                            })
                            .catch(error => console.error("Error fetching comments:", error));
                    } else {
                        commentsDiv.style.display = "none";
                        event.target.textContent = "ดูความคิดเห็น";
                    }
                });
            });
        })
        .catch(error => console.error("Error fetching posts:", error));
});