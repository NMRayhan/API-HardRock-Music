const searchSong = () => {
    const inputField = document.getElementById('input-field').value;
    const url = `https://api.lyrics.ovh/suggest/${inputField}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            getSongs(data.data)
        })
}

const getSongs = songs => {
    songs.forEach(song => {
        SongDisplay(song);
    })
}

const SongDisplay = (song) => {
    const songContainer = document.getElementById('searchResult')

    const songDiv = document.createElement('div');
    songDiv.className = 'single-result row align-items-center my-3 p-3'
    songDiv.innerHTML = `
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
            <source src="${song.preview}" type="audio/ogg">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${song.title}','${song.artist.name}')" class="btn btn-success">Get Lyrics</button>
        <a href="${song.link}" target="_blank"><button class="btn btn-dark mt-2">Full Song</button></a>
    </div>
    `
    songContainer.appendChild(songDiv);
}

const getLyrics = (title, artist) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const lyricDiv = document.getElementById('lyricsContainer');
            lyricDiv.style.display = 'block'
            lyricDiv.innerText = data.lyrics;
        })
}