let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

///Show New Quote
function newQuote(){
    // ambil angka random untuk ambil quote random
    const quote =  apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote);

    //kalo authornya gada
    if(quote.author === ''){
        authorText.innerText = 'Anon';
    } else{
        authorText.innerText = quote.author;
    }

    //kalo quotenya kepanjangan
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quote.text;
}

/// GET from API
async function getQuote(){
    //cors error solution 1
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';

    //API Url
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const apiUrl2 = 'https://type.fit/api/quotes';

 try {
     //variabel ini gk bakal di isi sampai dia selesai fetch atau dapetin data.
     //const response = await fetch(proxyURL + apiUrl);
     const response = await fetch(apiUrl2)
     
     //gabakal di set valuenya sampai response ada valuenya
     //const data = await response.json(); 
     apiQuotes = await response.json(response);
    
     //cek data
     //console.log(data);
     //console.log(apiQuotes);

     //ambil 1 quote
     newQuote();
 } catch (error) {
     //kalo error bakal ngejalanin ini
     getQuote();
     console.log('whoops, no quote', error);
 }
}

///tweet quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

///Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load (pas page keload)
getQuote();