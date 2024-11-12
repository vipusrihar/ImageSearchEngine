const clientid ="skzRa62GyA5n0poNVzw4QXg6fyILBtaUyuNlVyURxa8";


var searchForm = document.getElementById("searchform");
var searchBox = document.getElementById("searchbox");
var imageResult = document.getElementById("image-result");
var showMore = document.getElementById("showbtn");

var keyword = "";
var page = 1;

async function SearchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${clientid}&per_page=18`;
    const respone = await fetch(url);
    const data = await respone.json(); 

    const images = data.results;
    if(page ===1){
        imageResult.innerHTML = "";
    }
    
    images.map((image) => {
        const imagetag = document.createElement("img");
        imagetag.src = image.urls.small;
        const imagelink = document.createElement("a");
        imagelink.href = image.links.html;
        imagelink.target = "_blank";
        imagelink.appendChild(imagetag);    
        imageResult.appendChild(imagelink);


    });

    showMore.style.display = "block";
    if(images.length == 0){
        const newline = document.createElement("p");
        newline.innerHTML = `Sorry!! No Output Found For The Word You Search <strong>${keyword}</strong>`;
        imageResult.after(newline);
        showMore.style.display = "none";
    }
}

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    SearchImage();
})

showMore.addEventListener("click", (e) => {
    e.preventDefault();
    page++;
    SearchImage();
})