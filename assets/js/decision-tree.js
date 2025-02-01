document.addEventListener("DOMContentLoaded", function () {
    const decisionTreeContainer = document.getElementById("decision-tree");

    // Define the decision tree structure
    const tree = {
        question: "Do you need structured or unstructured data?",
        options: [
            {
                text: "Structured",
                next: {
                    question: "Do you want synthetic or real data?",
                    options: [
                        { text: "Synthetic", result: "Use a tabular data synthesis tool." },
                        { text: "Real", result: "Consider data anonymization methods." }
                    ]
                }
            },
            {
                text: "Unstructured",
                next: {
                    question: "Are you working with images or text?",
                    options: [
                        { text: "Images", result: "Try a generative model like GANs." },
                        { text: "Text", result: "Consider NLP-based text generation models." }
                    ]
                }
            }
        ]
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