function removeActiveClass(){
    const activeButton = document.getElementsByClassName("active");
    for(let btn of activeButton){
        btn.classList.remove("active");
    }
}

function loadCategories(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
}

function loadVideos () {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(response => response.json())
    .then(data => {
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)
    })
}

const loadCategoriesVideos = (id) =>{
    const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActiveClass()
        displayVideos(data.category);
        const clickButton = document.getElementById(`btn-${id}`)
        clickButton.classList.add("active");
    })
}

function displayCategories(categories){

    const categoriesContainer = document.getElementById("category-container");

    for(let cat of categories){

        const div  = document.createElement("div");
        div.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm bg-[#25252515] text-[16px] hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;

        categoriesContainer.appendChild(div);
    }
}

const displayVideos = (videos) => {
    
    const videosContainer = document.getElementById("videos-container");
    
    videosContainer.innerHTML = "";

    if(videos.length === 0){
        videosContainer.innerHTML = `
        <div class="col-span-full text-center flex flex-col justify-center items-center py-30">
            <img src="./assets/Icon.png" alt="">
            <h2 class="text-3xl font-bold mt-5">Oops!! Sorry, There is no <br>content here</h2>
        </div>
        `
        return;
    }

    videos.forEach((video) => {

        const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100">

            <figure class="relative">
              <img class="w-full h-[250px] object-cover rounded-lg"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-sm text-white bg-black rounded px-2 py-1">3hrs 56 min ago</span>
            </figure>

            <div class="py-5 flex gap-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-14 rounded-full  ring-offset-2">
                      <img src="${video.authors[0].profile_picture}"/>
                    </div>
                  </div>
              </div>
              <div class="">
                <h2 class="font-bold text-xl">Smells Like Teen Spirit</h2>
                <p class="flex text-[#17171770] items-center gap-3 my-2">${video.authors[0].profile_name}<img class="w-6 h-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                <p class="text-[#17171770]">${video.others.views} Views</p>
              </div>
            </div>
          </div>
    `;
    videosContainer.append(videoCard);
    })
    
}

loadCategories();
