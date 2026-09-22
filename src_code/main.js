//this is the only code being injected through tampermonkey.
//everything else is simply to aid this script


  
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
                return response.json();
            })
            .catch(error => console.error("Unable to fetch JSON:", error));

    }

    

    const totalLines = 370105

    // a simple delay helper
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    //reads a word from the word list
    async function generatePhrase()
    {
        for (let line = 0; line < totalLines; line++) {
            let word = readJSON(line);
            drawNewText(word)
            await sleep(3000);
        }
    } 



    //writes the new submission into index.html
    // (debugging purposes only!)
    function drawNewText(text)
    {
        textI += 1;
        const htmlContainer = document.getElementById("container")
        const newP = document.createElement('p');
        newP.innerHTML = "cyber{" + text + "}" ;
        htmlContainer.appendChild(newP)
    }



    //the actual code that sends an attempt though the input box
    function attemptProblem(attempt) {
        const inputBox = document.getElementById("challenge-input");
        const submitBtn = document.getElementById("challenge-submit");

        //mimics a user submission
        inputBox.focus();
        inputBox.value = "cyber{" + attempt + "}";
        inputBox.dispatchEvent(new Event('input', { bubbles: true }));
        inputBox.dispatchEvent(new Event('change', { bubbles: true }));

        submitBtn.click();
        //debugging
        console.log("ATTEMPTED TO SOLVE");
    }



    //maain
    function main()
    {
        jsonWords = loadJSON();

        localStorage.setItem("words", JSON.stringify(jsonWords));

        let textI = 0;
        generatePhrase()
    }





    //only calls main() only after the inputBox has loaded
    const observer = new MutationObserver(() => {
        const inputBox = document.getElementById("challenge-input");
        if (inputBox && !inputBox.dataset.hooked) {
            inputBox.dataset.hooked = "1";
            console.log("Found input:", inputBox, "challenge id:",
            document.getElementById("challenge-id").value);

            //runs the function
            main();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });


    //hardcalling main()
    //(debugging purposes only)
    main()