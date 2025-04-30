// Ініціалізація Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Додавання новин
document.getElementById('add-news-btn').addEventListener('click', function() {
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;

    if (title && content) {
        const newsRef = ref(database, 'news/');
        const newNewsRef = push(newsRef);

        set(newNewsRef, {
            title: title,
            content: content,
            timestamp: new Date().toISOString()
        });

        document.getElementById('news-title').value = '';
        document.getElementById('news-content').value = '';
    } else {
        alert('Заповніть всі поля!');
    }
});

// Отримання новин
const newsContainer = document.getElementById('news-container');
const newsRef = ref(database, 'news/');

onValue(newsRef, (snapshot) => {
    newsContainer.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const newsItem = childSnapshot.val();
        const newsElement = document.createElement('div');
        newsElement.innerHTML = `<h3>${newsItem.title}</h3><p>${newsItem.content}</p><small>${newsItem.timestamp}</small>`;
        newsContainer.appendChild(newsElement);
    });
});
