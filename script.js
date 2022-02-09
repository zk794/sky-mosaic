
let apiToken = "563492ad6f91700001000001b8220346b4294348a2e4b831be1085bc"
let imgArr = []
let nextPage = "https://api.pexels.com/v1/search?query=sky"

const artWidth = Math.floor(document.body.clientWidth * (2/3))
let gridSize = 5
let canvWidth = Math.floor(artWidth / gridSize)

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
  let rows = document.querySelectorAll("div.row")
  console.log(`rows.length = ${rows.length}`)
  while (rows.length < gridSize) { // add row
    let newRow = document.createElement("div")
    newRow.setAttribute("class", "row")
    div.appendChild(newRow)
    rows = document.querySelectorAll("div.row")
  }
  while (rows.length > gridSize) { // remove row
    div.removeChild(document.querySelector("div.row"))
    rows = document.querySelectorAll("div.row")
  }
  console.log(`rows.length = ${rows.length}`)
  rows.forEach(row => {
    while (row.children.length < gridSize) { // add canvases
      let pic = document.createElement("canvas")
      pic.setAttribute("class", "im")
      pic.setAttribute("width", canvWidth.toString())
      pic.setAttribute("height", canvWidth.toString())

      pic.addEventListener('click', function (e) {
        console.log("click")
        console.log(this)
        let ctx = this.getContext('2d')
        const image = new Image()
        r = Math.floor(Math.random() * imgArr.length)
        image.setAttribute("src", imgArr[r].src.large)
        image.onload = function(){
          ctx.drawImage(image, 0, 0);
        }
      })

      row.appendChild(pic)
    }
    while (row.children.length > gridSize) { // remove canvases
      // remove child
    }
  })
}

function loadInitImages () {
  canvs = document.querySelectorAll("canvas")
  canvs.forEach((c, idx) => {
    let ctx = c.getContext('2d')
    const image = new Image()
    getSkyImg(image, idx)
    image.onload = function(){
      ctx.drawImage(image, 0, 0);
    }
  });
}

function getSkyImg(imgEl, idx) {
  imgEl.setAttribute("src", imgArr[idx].src.large)
}


getImages(nextPage, 1).then(res => {
  imgArr = shuffleArr(imgArr)
  makeImgGrid(gridSize)
  loadInitImages()
  // imgs = document.querySelectorAll("img")
  // imgs.forEach((im, idx) => getSkyImg(im, idx))
})

// makeImgGrid(gridSize)
// modCanvs()
