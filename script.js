document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');

                const userLink = document.createElement('a');
                userLink.href = `user-detail.html?id=${user.id}`;
                userLink.style.textDecoration = 'none';
                userLink.style.color = 'inherit';

                const userName = document.createElement('h2');
                userName.textContent = user.name;

                const userEmail = document.createElement('p');
                userEmail.innerHTML = `<strong>Email:</strong> ${user.email}`;

                const userPhone = document.createElement('p');
                userPhone.innerHTML = `<strong>Phone:</strong> ${user.phone}`;

                const userWebsite = document.createElement('p');
                userWebsite.innerHTML = `<strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a>`;

                userLink.append(userName, userEmail, userPhone, userWebsite);
                userCard.appendChild(userLink);
                userList.appendChild(userCard);
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userList.innerHTML = '<p>Failed to load user data.</p>';
        });
});
