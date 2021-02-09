const searchSong = async () => {
    const inputField = document.getElementById('input-field').value;
    const url = `https://api.lyrics.ovh/suggest/${inputField}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        songDisplay(data.data);
    } catch (error) {
        console.log(error);
    }
}

const songDisplay = songs => {
    const songContainer = document.getElementById('searchResult')
    songContainer.innerHTML = ''
    const lyricDiv = document.getElementById('lyricsContainer').style.display = 'none'
    songs.forEach(song => {
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
    })
}


const getLyrics = async (title, artist) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const res = await fetch(url);
    const data = await res.json();
    displayLyric(data);
}

const displayLyric = (data) => {
    const lyricDiv = document.getElementById('lyricsContainer');
    lyricDiv.style.display = 'block'
    lyricDiv.innerText = data.lyrics;
}