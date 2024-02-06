import fetch from 'node-fetch'
import readline from 'readline'

let apiurl = 'https://vadapav.mov/api/s/'

async function search(query) {
  let response = await fetch(apiurl + query)
  let data = await response.json()
  
  let filteredData = data.data.filter(result => !result.dir)

  return filteredData[1].id
}

async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
    return await res.text();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter a movie name: ', async (query) => {
  let dlurl = 'https://vadapav.mov/f/' + await search(query)
  shortUrl(dlurl).then(url => console.log("Here is your download link: " + url));
  rl.close();
});
