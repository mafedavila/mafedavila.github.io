document.addEventListener("DOMContentLoaded", function () {
    const decisionTreeContainer = document.getElementById("decision-tree");

    // Define the decision tree structure
    const tree = {
        question: "What column types are present in the original/target dataset?",
        options: [
            {
                text: "Categorical, Numerical, and Mixed (categorical and numerical in one column)",
                next: {
                    question: "Is preservation of inter-table correlations necessary?",
                    options: [
                        {
                            text: "No",
                            next: {
                                question: "Is preservation of integrity constraints necessary?",
                                options: [
                                    {
                                        text: "No",
                                        next: {
                                            question: "Is differential privacy necessary?",
                                            options: [
                                                {
                                                    text: "No",
                                                    result: [
                                                        { name: "TabDDPM", link: "https://github.com/yandex-research/tab-ddpm" },
                                                        { name: "CTAB-GAN", link: "https://github.com/Team-TUD/CTAB-GAN" },
                                                        { name: "AutoDiff", link: "https://github.com/UCLA-Trustworthy-AI-Lab/AutoDiffusion" },
                                                        { name: "TabSyn", link: "https://github.com/amazon-science/tabsyn" },
                                                    ],
                                                },
                                                {
                                                    text: "Yes",
                                                    result: [
                                                        { name: "CTAB-GAN+", link: "https://github.com/Team-TUD/CTAB-GAN-Plus" },
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        text: "Yes",
                                        next: {
                                            question: "Are inter-record constraints necessary?",
                                            options: [
                                                {
                                                    text: "No",
                                                    result: [
                                                        { name: "C3TGAN", link: "https://www.techrxiv.org/doi/full/10.36227/techrxiv.24249643.v1" },
                                                    ],
                                                },
                                                {
                                                    text: "Yes",
                                                    result: [
                                                        { name: "Kamino", link: "https://github.com/cgebest/kamino" },
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            text: "Yes",
                            next: {
                                question: "Is preservation of integrity constraints necessary?",
                                options: [
                                    {
                                        text: "No",
                                        result: [
                                            { name: "REaLTabFormer (two tables)", link: "https://github.com/worldbank/REaLTabFormer" },
                                            { name: "PrivLava (more than two tables)", link: "https://github.com/Wind-Gone/awesome-olap-paper" },
                                        ],
                                    },
                                    {
                                        text: "Yes",
                                        result: [
                                            { name: "Research Gap" },
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            {
                text: "Categorical, Numerical, and Temporal",
                next: {
                    question:
                        "Is preservation of integrity constraints or inter-table correlations or customized generation necessary?",
                    options: [
                        {
                            text: "No",
                            next: {
                                question: "Is preservation of long-term temporal dependencies necessary?",
                                options: [
                                    {
                                        text: "No",
                                        result: [
                                            { name: "TimeVAE", link: "https://github.com/abudesai/timeVAE" },
                                            { name: "TimeGAN", link: "https://github.com/jsyoon0823/TimeGAN" },
                                            { name: "TSGM", link: "https://github.com/AlexanderVNikitin/tsgm" },
                                        ],
                                    },
                                    {
                                        text: "Yes",
                                        result: [
                                            { name: "DoppelGANger", link: "https://github.com/fjxmlzn/DoppelGANger" },
                                        ],
                                    },
                                ],
                            },
                        },
                        {
                            text: "Yes",
                            result: [
                                { name: "Research Gap" },
                            ],
                        },
                    ],
                },
            },
            {
                text: "Categorical, Numerical, Mixed, Temporal, and Text",
                next: {
                    question:
                        "Is preservation of integrity constraints or temporal dependencies necessary?",
                    options: [
                        {
                            text: "No",
                            next: {
                                question:
                                    "Is preservation of inter-table correlations necessary?",
                                options: [
                                    {
                                        text: "No",
                                        result: [
                                            { name: "GReaT", link: "https://github.com/kathrinse/be_great" },
                                            { name: "Tabula", link: "https://github.com/zhao-zilong/Tabula" },
                                        ],
                                    },
                                    {
                                        text: "Yes",
                                        result: [
                                            { name: "REaLTabFormer (two tables)", link: "https://github.com/worldbank/REaLTabFormer" },
                                            { name: "More than two tables: Research Gap" },
                                        ],
                                    },
                                ],
                            },
                        },
                        {
                            text: "Yes",
                            result: [
                                { name: "Research Gap" },
                            ],
                        },
                    ],
                },
            },
        ],
    };

    function renderQuestion(node) {
        decisionTreeContainer.innerHTML = ""; // Clear previous content
        const questionElement = document.createElement("h2");
        questionElement.textContent = node.question;
        decisionTreeContainer.appendChild(questionElement);

        node.options.forEach((option) => {
            const button = document.createElement("button");
            button.textContent = option.text;
            button.onclick = function () {
                if (option.next) {
                    renderQuestion(option.next); // Show the next question
                } else {
                    renderResult(option.result); // Show the final result
                }
            };
            decisionTreeContainer.appendChild(button);
        });
    }

    function renderResult(results) {
        decisionTreeContainer.innerHTML = ""; // Clear previous content

        const resultTitle = document.createElement("h2");
        resultTitle.textContent = "Recommended Tools:";
        decisionTreeContainer.appendChild(resultTitle);

        if (Array.isArray(results)) {
            results.forEach((result) => {
                if (result.name === "Research Gap" || result.name.includes("Gap")) {
                    // Render as plain text
                    const text = document.createElement("p");
                    text.textContent = result.name;
                    text.style.margin = "5px 0"; // Add some spacing
                    decisionTreeContainer.appendChild(text);
                } else {
                    // Render as a clickable link
                    const link = document.createElement("a");
                    link.textContent = result.name;
                    link.href = result.link;
                    link.target = "_blank";
                    link.style.display = "block";
                    decisionTreeContainer.appendChild(link);
                }
            });
        } else {
            const noResult = document.createElement("p");
            noResult.textContent = "No tools found.";
            decisionTreeContainer.appendChild(noResult);
        }

        // Add "Start Again" button
        const restartButton = document.createElement("button");
        restartButton.textContent = "Start Again";
        restartButton.style.marginTop = "20px";
        restartButton.onclick = function () {
            renderQuestion(tree); // Restart the decision tree
        };
        decisionTreeContainer.appendChild(restartButton);
    }

    // Start the decision tree
    renderQuestion(tree);
});