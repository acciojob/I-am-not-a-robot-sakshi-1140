//your code here
const imageContainer = document.querySelector(".imageContainer")
const buttonContainer = document.querySelector(".buttonContainer")

let imagClassName = ["img1", "img2", "img3", "img4", "img5"]

// randomly select a 6th img out of these 5 
// the order of elements in the array should be random

let randomImage = imagClassName[parseInt(Math.random() * imagClassName.length)]

imagClassName.push(randomImage) 

// shuffle the array:
// [img1, img2, img3, img4, -1, img3]

let suffledImgArray = []

while(suffledImgArray.length <6){
  let randomIndex = parseInt(Math.random() * imagClassName.length) // 4
  
  if(imagClassName[randomIndex] == -1){
    continue
  }
  suffledImgArray.push(imagClassName[randomIndex]) // img5
  imagClassName[randomIndex] = -1 

//   console.log(suffledImgArray)

}

let count = 1
for(let t of suffledImgArray){
    let imgTag = document.createElement("img")
    imgTag.className = t
    imgTag.id = `pic${count++}`
    imageContainer.append(imgTag)
    imgTag.addEventListener("click", checkHuman)
}

let h3 = document.createElement("h3")
h3.innerText = "Please click on the identical tiles to verify that you are not a robot."
h3.id = "h3"
imageContainer.append(h3)



let clicks = 0
let previousSelectedImageId = null
function checkHuman(eventDetails){   
    let selectedImage = eventDetails.target
    selectedImage.classList.add("selected")
    // generate a reset button:
     
    
    if(previousSelectedImageId != selectedImage.id){
        clicks++
        previousSelectedImageId = selectedImage.id
    }
    
    if(clicks == 1 && document.getElementById("reset") == null){
        let resetButton = document.createElement("button")
        resetButton.id = "reset"
        resetButton.innerText = "Reset"
        buttonContainer.append(resetButton)

        resetButton.addEventListener("click", reset)
    }

    // verfiy button: 

    if(clicks == 2){
        let verifyButton = document.createElement("button")
        verifyButton.id = "verify"
        verifyButton.innerText = "Verify"
        buttonContainer.append(verifyButton)

        verifyButton.addEventListener("click", verify)
    }
    if(clicks > 2){
         let verifyButton = document.getElementById("verify")
         verifyButton.remove()
    }

}



function reset(){
    let selectedImages = document.querySelectorAll(".selected")
    for(let img of selectedImages){
        img.classList.remove("selected")
    }
    // delete the reset button
    let resetButton = document.getElementById("reset")
    resetButton.remove()
    // delete verify button
    let verifyButton = document.getElementById("verify")
    if(verifyButton != null){
       verifyButton.remove()
    }

    // reset the clicks
    clicks = 0
   
}


function verify(){
     let para = document.createElement("p")
     para.id = "para"
     let selectedImage = document.querySelectorAll(".selected") 
     let slectedImage1 = selectedImage[0].className.replace("selected", "").trim()
     let slectedImage2 = selectedImage[1].className.replace("selected", "").trim()
     if(slectedImage1 == slectedImage2){
            para.innerText = "You are a human. Congratulations!"
     }
     else{
         para.innerText = "We can't verify you as a human. You selected the non-identical tiles."
     }
     buttonContainer.append(para)

     // delete the verify button
        let verifyButton = document.getElementById("verify")
        verifyButton.remove()
     
}


// btn.addEventListener("click", function(){
//     window.location.reload()
// })