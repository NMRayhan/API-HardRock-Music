const getSong = () => {
    const showText = document.getElementById('song-input').value;
    const url = `https://api.lyrics.ovh/suggest/${showText}`
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            songTitleShow(data)
        })
}

const songTitleShow = (data) => {
    data.data.forEach(song => {
        const showNameDiv = document.getElementById('showNamediv');
        const songName = document.createElement('h2');
        songName.innerText = song.title
        showNameDiv.appendChild(songName);
    })
}
function alertPlay() {
    alert("The video has started to play.");
}