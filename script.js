
let apiToken = "563492ad6f91700001000001b8220346b4294348a2e4b831be1085bc"
let imgArr = []
let nextPage = "https://api.pexels.com/v1/search?query=sky"

let gridSize = 5

async function getImages(url, reps) {
  const res = await fetch(url,{
    headers: {
      Authorization: apiToken
    }
   })
   const data = await res.json()
   imgArr = imgArr.concat(data.photos)
   console.log(data.photos)
   nextPage = data.next_page
   console.log(data.next_page)
   console.log(imgArr.length)
   if (reps > 0) getImages(nextPage, reps-1)
}

function shuffleArr(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function makeImgGrid(gridSize) {
  const div = document.getElementById("artwork")
  let cols = document.querySelectorAll("div.column")
  console.log(`cols.length = ${cols.length}`)
  while (cols.length < gridSize) {
    let newCol = document.createElement("div")
    newCol.setAttribute("class", "column")
    div.appendChild(newCol)
    cols = document.querySelectorAll("div.column")
  }
  while (cols.length > gridSize) {
    div.removeChild(document.querySelector("div.column"))
    cols = document.querySelectorAll("div.column")
  }
  console.log(`cols.length = ${cols.length}`)
  cols.forEach(col => {
    while (col.children.length < gridSize) {
      let pic = document.createElement("img")
      pic.setAttribute("src", "")
      col.appendChild(pic)
    }
    while (col.children.length > gridSize) {
      // remove child
    }
  })
}

function getSkyImg(imgEl, idx) {
  imgEl.setAttribute("src", imgArr[idx].src.small)
}


getImages(nextPage, 1).then(res => {
  imgArr = shuffleArr(imgArr)
  makeImgGrid(gridSize)
  console.log(imgArr[0])
  imgs = document.querySelectorAll("img")
  imgs.forEach((im, idx) => getSkyImg(im, idx))
})

console.log(document.body.clientWidth)
console.log(document.body.clientHeight)
