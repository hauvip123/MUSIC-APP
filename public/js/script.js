const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let datasong = JSON.parse(aplayer.getAttribute("data-song") || "{}");
  let datasinger = JSON.parse(aplayer.getAttribute("data-singer") || "{}");
  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: datasong.title,
        artist: datasinger.fullName,
        url: datasong.audio,
        cover: datasong.avatar,
      },
    ],
    autoplay: true,
  });
}
// Button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", async () => {
    let idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");
    const typeLike = isActive ? "dislike" : "like";
    const link = `/songs/like/${typeLike}/${idSong}`;
    const option = { method: "PATCH" };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const likeSpan = buttonLike.querySelector("span");
        likeSpan.innerHTML = data.like;
        buttonLike.classList.toggle("active");
        console.log(data);
      });
  });
}
// Buttion favorite
const buttonFavorite = document.querySelector("[button-favorite]");
if (buttonFavorite) {
  buttonFavorite.addEventListener("click", async () => {
    let idSong = buttonFavorite.getAttribute("button-favorite");
    const isActive = buttonFavorite.classList.contains("active");
    const typeFavorite = isActive ? "unfavorite" : "favorite";
    const link = `/songs/favorite/${typeFavorite}/${idSong}`;
    const option = { method: "PATCH" };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        buttonFavorite.classList.toggle("active");
        console.log(data);
      });
  });
}
// search suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");
  input.addEventListener("keyup", () => {
    let keyword = input.value;
    const link = `/search/suggest?keyword=${keyword}`;
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        const songs = data.searchSong;
        if (songs.length > 0) {
          boxSuggest.classList.add("show");
          const htmls = songs.map((song) => {
            return `
              <a href="/songs/detail/${song.slug}" class="inner-item">
                <div class="inner-image">
                  <img src="${song.avatar}" alt="${song.title}" />
                </div>
                <div class="inner-info">
                  <div class="inner-title">${song.title}</div>
                  <div class="inner-singer">
                    <i class="fa-solid fa-microphone-lines"></i>
                    ${song.infoSinger.fullName}
                  </div>
                </div>
              </a>         
            `;
          });
          const boxlist = boxSuggest.querySelector(".inner-list");
          boxlist.innerHTML = htmls.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  });
}
