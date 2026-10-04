
(() => {
    const form = document.getElementById("terminalForm");
    const input = document.getElementById("terminalInput");
    const output = document.getElementById("terminalOutput");

    if (!form || !input || !output) return;

    /*
     * PERSONAL PROFILE
     * Edit these values to make the terminal yours.
     */
    const profile = {
        name: "Dren Veliu",
        age: "18",
        location: "Currently living in: Berlin, Germany",
        origin: "Originally from North Macedonia but I am Albanian",
        spokenLanguages: [
            "Albanian",
            "Spanisch",
            "German",
            "English"
        ],
        programmingLanguages: [
            "Python",
            "JavaScript",
            "PHP",
            "Java",
            "CSS"
        ],
        interests: [
            "Web development",
            "Software engineering",
            "UI/UX design",
            "Building creative projects"
        ],
        email: "drenveliu01@gmail.com",
        website: "https://drenveliu.com"
    };

    const history = [];
    let historyIndex = 0;


const typingQueue = [];
let isTyping = false;

function addLine(text = "", type = "") {
    const line = document.createElement("div");
    line.className = "output-line" + (type ? " " + type : "");
    output.appendChild(line);

    typingQueue.push({ line, text });
    processTypingQueue();

    return line;
}

function processTypingQueue() {
    if (isTyping || typingQueue.length === 0) return;

    isTyping = true;

    const { line, text } = typingQueue.shift();
    let i = 0;
    const speed = 15;

    function typeNext() {
        if (i < text.length) {
            line.textContent += text.charAt(i);
            i++;
            scrollToBottom();
            setTimeout(typeNext, speed);
        } else {
            isTyping = false;
            processTypingQueue();
        }
    }

    typeNext();
}

    function addGap() {
        const gap = document.createElement("div");
        gap.className = "output-line output-gap";
        output.appendChild(gap);
    }

    function addHeading(text) {
        addLine(text, "output-heading");
    }

    function addList(items) {
        items.forEach(item => {
            addLine("  →  " + item);
        });
    }

    function scrollToBottom() {
        output.scrollTop = output.scrollHeight;
    }

    function showCommand(command) {
        addGap();
        addLine(
              "The command '" + command + "' was requested. Look below to see the output.",
              "output-green"
                );
    }

    const commands = {
        help() {
            addHeading("AVAILABLE COMMANDS");
            addLine("Explore my profile using any of these commands.");
            addGap();

            addList([
                "help       — Show available commands",
                "about      — A little introduction",
                "age        — How old am I?",
                "location   — Where I currently live",
                "origin     — Where I'm from",
                "languages  — Languages I speak",
                "skills     — My programming languages",
                "interests  — What I'm interested in",
                "contact    — Get in touch",
                "whoami     — Profile overview",
                "clear      — Clear the terminal"
            ]);
        },

        about() {
            addHeading("ABOUT ME");
            addLine("Hey, I'm " + profile.name + ".");
            addLine(
                "I'm a curious junior developer who enjoys creating things " +
                "for the web and exploring software and design."
            );
            addLine("I'm always learning, experimenting, and building.");
        },

        age() {
            addHeading("A LITTLE ABOUT ME");
            addLine("Age: " + profile.age + " years old");
        },

        location() {
            addHeading("CURRENT LOCATION");
            addLine(profile.location);
        },

        origin() {
            addHeading("WHERE I'M FROM");
            addLine(profile.origin);
        },

        languages() {
            addHeading("I speak the following languages: ");
            addList(profile.spokenLanguages);
        },

        skills() {
            addHeading("PROGRAMMING LANGUAGES");
            addList(profile.programmingLanguages);
            addGap();
        },

        interests() {
            addHeading("Things I'm interested in:");
            addList(profile.interests);
        },

        contact() {
            addHeading("Contact me");
            addLine("Have a internship? I would love to participate in it.");
            addLine("Email: " + profile.email);
            addLine("Website: " + profile.website);
        },

        whoami() {
            addHeading("PROFILE SUMMARY");
            addLine("Name:     " + profile.name);
            addLine("Age:      " + profile.age);
            addLine("Location: " + profile.location);
            addLine("Origin:   " + profile.origin);
            addLine("Languages: " + profile.spokenLanguages.join(", "));
        },

        clear() {
            output.replaceChildren();
            return;
        }
    };

    
function typeText(element, text, speed = 20) {
    element.textContent = "";

    let i = 0;

    function typeNext() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeNext, speed);
        }
    }

    typeNext();
}

    function runCommand(rawCommand) {
        const command = rawCommand.trim().toLowerCase();

        if (!command) return;

        showCommand(rawCommand.trim());

        if (command === "clear") {
            commands.clear();
            scrollToBottom();
            return;
        }

        const handler = commands[command];

        if (handler) {
            handler();
        } else {
            addLine("Command not found: " + command, "output-error");
            addLine("Type 'help' to see the available commands.");
        }

        scrollToBottom();
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const command = input.value.trim();
        if (!command) return;

        if (history[history.length - 1] !== command) {
            history.push(command);
        }

        historyIndex = history.length;
        input.value = "";

        runCommand(command);
    });

    input.addEventListener("keydown", event => {
        if (event.key === "ArrowUp") {
            event.preventDefault();

            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            }
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();

            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = "";
            }
        }
    });

    document.querySelectorAll(".terminal-shortcuts [data-command]")
        .forEach(button => {
            button.addEventListener("click", () => {
                runCommand(button.dataset.command);
                input.focus();
            });
        });

    // Focus the input when clicking inside the terminal.
    document.querySelector(".terminal-box")
        ?.addEventListener("click", event => {
            if (!event.target.closest("button")) {
                input.focus();
            }
        });
})();


function updateDate(){

    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    let month = today.getMonth();
    currentMonth = month + 1;
    currentMonth = currentMonth.toString().padStart(2, "0")
    const year = today.getFullYear().toString();

    const dateString = `${day}/${currentMonth}/${year}`;
    document.getElementById("date").textContent = dateString;
}

updateDate();

setInterval(updateDate, 1000);