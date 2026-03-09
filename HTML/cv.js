async function getCV() {
    try {
        const response = await fetch("cv.json");
        if (!response.ok) throw new Error("Kunde inte hämta CV-data");

        const data = await response.json();

        renderEducation(data.education);
        renderExperience(data.experience);
        renderMerits(data.merits);

    } catch (error) {
        console.error(error);
    }
}

getCV();

function renderEducation(list) {
    const container = document.getElementById("education");

    list.forEach(item => {
        const div = document.createElement("div");
        div.className = "cv-item";

        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.school}</p>
            <span>${item.years}</span>
        `;

        container.appendChild(div);
    });
}

function renderExperience(list) {
    const container = document.getElementById("experience");

    list.forEach(item => {
        const div = document.createElement("div");
        div.className = "cv-item";

        div.innerHTML = `
            <h3>${item.role}</h3>
            <p>${item.place}</p>
            <span>${item.years}</span>
        `;

        container.appendChild(div);
    });
}

function renderMerits(list) {
    const container = document.getElementById("merits");

    list.forEach(item => {
        const div = document.createElement("div");
        div.className = "cv-item";

        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.place}</p>
            <span>${item.years}</span>
        `;

        container.appendChild(div);
    });
}

// Klick påskägg
const colors = ["#ffb3b3", "#b3d9ff", "rgba(165, 148, 117, 1)"];
let currentColor = 0;

document.getElementById("secret-click").addEventListener("click", () => {
    document.body.style.backgroundColor = colors[currentColor];

    currentColor++;
    if (currentColor >= colors.length) {
        currentColor = 0; // börja om från första färgen
    }
});

// 1337 påskägget
let keySequence = "";
const secretCode = "1337";

document.addEventListener("keydown", (e) => {
    keySequence += e.key;

    if (keySequence.includes(secretCode)) {
        const modal = document.getElementById("easter-modal");
        if (modal) {
            modal.style.display = "flex";
        }
        keySequence = "";
    }

    if (keySequence.length > secretCode.length) {
        keySequence = keySequence.slice(-secretCode.length);
    }
});

const closeBtn = document.getElementById("close-modal");
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        document.getElementById("easter-modal").style.display = "none";
    });
}

// Github via API
async function loadGithubProjects() {
    const container = document.getElementById("github-projects");
    const loadingText = document.getElementById("loading");

    try {
        const response = await fetch("https://api.github.com/users/albinlinjer/repos");
        const repos = await response.json();

        loadingText.remove();

        repos.forEach(repo => {
            const div = document.createElement("div");
            div.className = "project-box";

            div.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Ingen beskrivning tillgänglig."}</p>
                <a href="${repo.html_url}" target="_blank" class="open-btn">Visa</a>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        loadingText.textContent = "Kunde inte ladda projekt.";
        console.error(error);
    }
}

loadGithubProjects();

