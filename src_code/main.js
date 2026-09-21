    function readJSON(wordID)
    {
        const stored = localStorage.getItem("words");
        if (!stored) {
            console.warn("No flags stored yet.");
            return null;
        }
        const flags = JSON.parse(stored);
        return flags[wordID] || null;
    }

    function loadJSON()
    {
        // fetches the JSON file
        fetch('words.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parses the JSON automatically
            })
            .catch(error => console.error("Unable to fetch JSON:", error));

    }

    

    const totalLines = 370105

    // delay helper
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function generatePhrase()
    {
        for (let line = 0; line < totalLines; line++) {
            let word = readJSON(line);
            drawNewText(word)
            await sleep(3000);
        }
    }



    function drawNewText(text)
    {
        textI += 1;
        const htmlContainer = document.getElementById("container")
        const newP = document.createElement('p');
        newP.innerHTML = "cyber{" + text + "}" ;
        htmlContainer.appendChild(newP)
    }

    function attemptProblem(attempt) {
        const inputBox = document.getElementById("challenge-input");
        const submitBtn = document.getElementById("challenge-submit");

        inputBox.focus();
        inputBox.value = "cyber{" + attempt + "}";
        inputBox.dispatchEvent(new Event('input', { bubbles: true }));
        inputBox.dispatchEvent(new Event('change', { bubbles: true }));

        submitBtn.click();
        console.log("ATTEMPTED TO SOLVE");
    }



    function main()
    {
        jsonWords = loadJSON();

        localStorage.setItem("words", JSON.stringify(jsonWords));

        let textI = 0;
        generatePhrase()
    }






    const observer = new MutationObserver(() => {
        const inputBox = document.getElementById("challenge-input");
        if (inputBox && !inputBox.dataset.hooked) {
            inputBox.dataset.hooked = "1";
            console.log("Found input:", inputBox, "challenge id:",
            document.getElementById("challenge-id").value);

            //ensures code runs after the input box has loaded.

            main()
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });


    main()