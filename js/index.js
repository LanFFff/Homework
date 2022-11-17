const movies = [
  {
    title: "肖申克的救赎  / The Shawshank Redemption",
    desc: "1994 / 美国 / 犯罪 剧情",
    comment: "希望让人自由。",
  },
];

document.querySelector("#new-movie").innerHTML = template("tpl-movie", {
  movies: movies,
});
