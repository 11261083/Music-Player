import './EditMusicBox.css';

import React, {useState, useEffect} from 'react';

export default function EditMusicBox({ showEditBox, setShowEditBox, currentMusic, setMusicsList }) {

    const [musicTitle, setMusicTitle] = useState("");
    const [musicArtist, setMusicArtist] = useState("");
    const [musicAlbum, setMusicAlbum] = useState("");
    const [musicComposer, setMusicComposer] = useState("");
    const [musicRelease, setMusicRelease] = useState("");

    useEffect(() => {
        if(currentMusic !== null) {
            setMusicTitle(currentMusic.name);
            setMusicArtist(currentMusic.artist);
            setMusicAlbum(currentMusic.album);
            setMusicComposer(currentMusic.composer);
            setMusicRelease(currentMusic.released);
        }
    }, [showEditBox, currentMusic]);

    function handleTitleEdit(e) {
        setMusicTitle(e.target.value);
    }
    function handleArtistEdit(e) {
        setMusicArtist(e.target.value);
    }
    function handleAlbumEdit(e) {
        setMusicAlbum(e.target.value);
    }
    function handleComposerEdit(e) {
        setMusicComposer(e.target.value);
    }
    function handleReleaseEdit(e) {
        setMusicRelease(e.target.value);
    }

    function handleEditSave() {
        if(currentMusic === null) return;
        
        const newMusic = {
            id: currentMusic.id,
            name: musicTitle,
            artist: musicArtist,
            composer: musicComposer,
            album: musicAlbum,
            released: musicRelease,
            url: currentMusic.url,
            poster: currentMusic.poster
        }

        setMusicsList(prev => prev.map(item => item.id === currentMusic.id ? newMusic : item))
        setShowEditBox(false);
    }

    return(
        <div className={`edit-music-box ${showEditBox ? "" : "hidden"}`}>
            <p>Title</p>
            <input value={musicTitle} onChange={handleTitleEdit} ></input>
            <p>Artist</p>
            <input value={musicArtist} onChange={handleArtistEdit}></input>
            <p>Album</p>
            <input value={musicAlbum} onChange={handleAlbumEdit}></input>
            <p>Composer</p>
            <input value={musicComposer} onChange={handleComposerEdit}></input>
            <p>Release Date</p>
            <input value={musicRelease} onChange={handleReleaseEdit}></input>
            <div className='edit-btn-box'>
                <button className='cancel-btn' onClick={() => {setShowEditBox(false)}}>Cancel</button>
                <button className='save-btn' onClick={handleEditSave}>Save</button>
            </div>
        </div>
    );
}