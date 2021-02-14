const searchSong = async () => {
    const inputField = document.getElementById('input-field').value;
    if (inputField == '') {
        document.getElementById('errorMsg').style.display = 'Block'
        document.getElementById('error').innerText = 'Try to Search Somthing  by Valid Value'
    }
    else {
        try {
            const url = `https://api.lyrics.ovh/suggest/${inputField}`
            const songContainer = document.getElementById('searchResult')
            songContainer.innerHTML = ''
            toggleLoading(true)
            const res = await fetch(url);
            const data = await res.json();
            document.getElementById('errorMsg').style.display = 'none'
            songDisplay(data.data);
        } catch (error) {
            errorShow(error)
        }
    }
}

const errorShow = (error) => {
    document.getElementById('errorMsg').style.display = 'block'
    document.getElementById('error').innerText = error;
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
            <audio controls muted>
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
    toggleLoading(false);
}


const getLyrics = async (title, artist) => {
    try {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data);

    } catch (error) {
        errorShow(error);
    }
}

const displayLyric = (data) => {
    const lyricDiv = document.getElementById('lyricsContainer');
    lyricDiv.style.display = 'block'
    lyricDiv.innerText = data.lyrics;
}

const toggleLoading = (show) => {
    const spinner = document.getElementById('loading-spinner')
    if (show === true) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}