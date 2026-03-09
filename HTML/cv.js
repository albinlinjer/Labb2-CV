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

const colors = ["#ffb3b3", "#b3d9ff", "rgba(165, 148, 117, 1)"];
let currentColor = 0;

document.getElementById("secret-click").addEventListener("click", () => {
    document.body.style.backgroundColor = colors[currentColor];

    currentColor++;
    if (currentColor >= colors.length) {
        currentColor = 0; // börja om från första färgen
    }
});

