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
