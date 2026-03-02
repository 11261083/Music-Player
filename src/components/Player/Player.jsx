import './Player.css';

import React, {useState, useEffect, useContext} from 'react';
import {StateContext} from '../../MusicPlayerApp.jsx';
import EditMusicBox from './EditMusicBox.jsx';

export default function Player() {

    const playingMusics = useContext(StateContext).playingMusicsProvider;
    const currentIndex = useContext(StateContext).currentIndexProvider;
    const setCurrentIndex = useContext(StateContext).setCurrentIndexProvider;
    const musicsList = useContext(StateContext).musicsListProvider;
    const setMusicsList = useContext(StateContext).setMusicsListProvider;

    const [showEditBox, setShowEditBox] = useState(false);

    const [imgSrc, setImgSrc] = useState(null);
    const audio = document.querySelector("audio");
    const fallbackSrc = "/poster/empty-poster.png";

    const queueMusics = playingMusics.map(id => musicsList.find(music => music.id === id));

    useEffect(() => {
        if(currentIndex !== null) setImgSrc(queueMusics[currentIndex].poster);
    }, [playingMusics, currentIndex]);
    
    useEffect(() => {
        if(audio) {
            audio.play();
        }
    }, [currentIndex, audio]);

    function handleFallbackImg() {
        setImgSrc(fallbackSrc);
    }

    function handlePlayPreviousBtn() {
        if(currentIndex === 0) setCurrentIndex(queueMusics.length - 1);
        else setCurrentIndex(currentIndex - 1);
    }

    function handlePlayNextBtn() {
        if(currentIndex === queueMusics.length-1) setCurrentIndex(0);
        else setCurrentIndex(currentIndex + 1);
    }

    function handleEditOpenBtn() {
        setShowEditBox(!showEditBox);

    }

    const currentMusic = currentIndex === null ? null : queueMusics[currentIndex];    // shallow copy issue

    const musicInfoRender = currentIndex !== null ? (
        <>
            <div className='music-info'>
                <div className='music-name'>{currentMusic.name}</div>
                <div className='music-artist'>{currentMusic.artist}</div>

                <div className='music-album'>{`Album • ${currentMusic.album}`}</div>
                <div className='music-composer'>{`Composer • ${currentMusic.composer}`}</div>
                <div className='music-released'>{`Released • ${currentMusic.released}`}</div>
            </div>
            <div className='music-player'>
                <audio
                    src={queueMusics[currentIndex].url}
                    controls={true}
                    onEnded={() => handlePlayNextBtn()}
                ></audio>
                <button onClick={handlePlayPreviousBtn}><i className="fa-solid fa-backward"></i></button>
                <button onClick={handlePlayNextBtn}><i className="fa-solid fa-forward"></i></button>
            </div>
        </>
    ) : null;

    return(
        <div className='player-container'>
            <div className='player-box'>
                <img src={imgSrc ? imgSrc : fallbackSrc} onError={handleFallbackImg} className='music-poster'></img>
                <div className='music-body'>
                    {musicInfoRender}
                </div>
                <div className='edit-enable-box'>
                    <button className='edit-enable' onClick={handleEditOpenBtn}><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            </div>
            <EditMusicBox showEditBox={showEditBox} setShowEditBox={setShowEditBox} currentMusic={currentMusic} setMusicsList={setMusicsList} />
        </div>
    );
}