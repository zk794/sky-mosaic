
let apiToken = "563492ad6f91700001000001b8220346b4294348a2e4b831be1085bc"
let imgArr = []
let nextPage = "https://api.pexels.com/v1/search?query=sky"

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

function fillImgArr(numPics) {
  const iter = Math.ceil(numPics / 15)

  // for (let i = 0; i < iter; i++) {
  //   fetch(nextPage,{
  //     headers: {
  //       Authorization: apiToken
  //     }
  //    })
  //    .then(res => res.json())
  //    .then(data => {
  //      imgArr = imgArr.concat(data.photos)
  //      console.log(data.photos)
  //      nextPage = data.next_page
  //      console.log(data.next_page)
  //    })
  // }
}

function getSkyImg() {
  const sky = document.querySelector('#sky')
  fetch("https://api.pexels.com/v1/search?query=sky",{
    headers: {
      Authorization: apiToken
    }
   })
     .then(res => res.json())
     .then(data => {
       sky.src = data.photos[0].src.medium
       // console.log(data.photos.length)
     })
}



getImages(nextPage, 2)
console.log(imgArr.length)
getSkyImg()
