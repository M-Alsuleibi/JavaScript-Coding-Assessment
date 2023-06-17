const quoteList = document.getElementById('quoteList');
const filterInput = document.getElementById('filterInput');
const apiUrl = 'https://dummyjson.com/quotes';

// Function to fetch quote data from the API
async function fetchQuotes() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Unable to fetch quotes');
        }
    } catch (error) {
        throw new Error('Unable to fetch quotes');
    }
}

// Function to filter quotes based on user input
function filterQuotes(quotes, filterText) {
    return quotes.filter(quote => quote.text.toLowerCase().includes(filterText.toLowerCase()));
}

// Function to display quotes on the page
function displayQuotes(quotes) {
    quoteList.innerHTML = '';
    quotes.forEach(quote => {
        const li = document.createElement('li');
        li.textContent = quote.text;
        quoteList.appendChild(li);
    });
}

// Event listener for filter input changes
filterInput.addEventListener('input', async () => {
    try {
        const filterText = filterInput.value;
        const quotes = await fetchQuotes();
        const filteredQuotes = filterQuotes(quotes, filterText);
        displayQuotes(filteredQuotes);
    } catch (error) {
        quoteList.innerHTML = '<li>Error: Unable to fetch quotes</li>';
    }
});

// Initial fetching and displaying of quotes
fetchQuotes()
    .then(quotes => displayQuotes(quotes))
    .catch(() => {
        quoteList.innerHTML = '<li>Error: Unable to fetch quotes</li>';
    });
