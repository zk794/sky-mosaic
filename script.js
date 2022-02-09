
let apiToken = "563492ad6f91700001000001b8220346b4294348a2e4b831be1085bc"
let imgArr = []
let nextPage = "https://api.pexels.com/v1/search?query=clouds"//&color=red"

const artWidth = Math.floor(document.body.clientWidth * (2/3))
let gridSize = 5
let canvWidth = Math.floor(artWidth / gridSize)
const imWidth = 940
const imHeight = 650

async function getImages(url, reps, callback) {
  const res = await fetch(url,{
    headers: {
      Authorization: apiToken
    }
   })
   const data = await res.json()
   imgArr = imgArr.concat(data.photos)
   nextPage = data.next_page
   if (reps > 0) getImages(nextPage, reps-1, callback)
   else callback()
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
    newRow.style.height = `${canvWidth}px`
    div.appendChild(newRow)
    rows = document.querySelectorAll("div.row")
  }
  while (rows.length > gridSize) { // remove row
    div.removeChild(document.querySelector("div.row"))
    rows = document.querySelectorAll("div.row")
  }
  console.log(`rows.length = ${rows.length}`)
  rows.forEach((row, rIdx) => {
    let numCanvs = row.children.length
    while (row.children.length < gridSize) { // add canvases
      let pic = document.createElement("canvas")
      pic.setAttribute("class", "im")
      pic.setAttribute("data-row", `${rIdx}`)
      pic.setAttribute("data-col", `${numCanvs}`)
      numCanvs++
      pic.width = canvWidth
      pic.height = canvWidth

      pic.addEventListener('click', function (e) {
        const canv = this
        let ctx = canv.getContext('2d')
        const image = new Image()
        r = Math.floor(Math.random() * imgArr.length)
        image.setAttribute("src", imgArr[r].src.large)
        image.onload = function(){
          console.log(`canv ${canv}`)
          ctx.drawImage(image, cropX(canv), cropY(canv),
            canvWidth, canvWidth, 0, 0, canvWidth, canvWidth,);
        }
      })

      row.appendChild(pic)
    }
    while (row.children.length > gridSize) { // remove canvases
      // remove child
    }
  })
}

function cropX(canvas) {
  const imWidth = 940
  const quotient = Math.floor(imWidth / canvWidth) - 1 // number of times canvas fits across width of image
  // map x from range [0, gridSize-1] to range [0,quotient]
  const x = canvas.getAttribute("data-col")
  const t = Math.floor((x * quotient) / (gridSize - 1))
  return canvWidth * t
}

function cropY(canvas) {
  const imHeight = 650
  const quotient = Math.floor(imHeight / canvWidth) - 2 // number of times canvas fits across width of image
  // map x from range [0, gridSize-1] to range [0,quotient]
  const y = canvas.getAttribute("data-row")
  const t = Math.floor((y * quotient) / (gridSize - 1))
  return canvWidth * t
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


// getImages(nextPage, 1)
// imgArr = shuffleArr(imgArr)
// makeImgGrid(gridSize)
// loadInitImages()

getImages(nextPage, 1, () => {
  imgArr = shuffleArr(imgArr)
  makeImgGrid(gridSize)
  loadInitImages()
})
// console.log(x)
// x.then(res => {
//
// })
