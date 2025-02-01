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
                                                    result: "TabDDPM, CTAB-GAN, AutoDiff, TabSyn",
                                                },
                                                {
                                                    text: "Yes",
                                                    result: "CTAB-GAN+",
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
                                                    result: "C3TGAN",
                                                },
                                                {
                                                    text: "Yes",
                                                    result: "Kamino",
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
                                        result: "REaLTabFormer (two tables) or PrivLava (more than two tables)",
                                    },
                                    {
                                        text: "Yes",
                                        result: "GAP",
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
                                        result: "TimeVAE, TimeGAN, TSGM",
                                    },
                                    {
                                        text: "Yes",
                                        result: "DoppelGANger",
                                    },
                                ],
                            },
                        },
                        {
                            text: "Yes",
                            result: "GAP",
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
                                        result: "GReaT, Tabula",
                                    },
                                    {
                                        text: "Yes",
                                        result: "REaLTabFormer (two tables) or GAP (more than two tables)",
                                    },
                                ],
                            },
                        },
                        {
                            text: "Yes",
                            result: "GAP",
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

    function renderResult(resultText) {
        decisionTreeContainer.innerHTML = ""; // Clear previous content
        const resultElement = document.createElement("h2");
        resultElement.textContent = "Result: " + resultText;
        decisionTreeContainer.appendChild(resultElement);
    }

    // Start the decision tree
    renderQuestion(tree);
});