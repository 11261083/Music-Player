import './Player.css';

import React, {useState, useEffect, useRef, useContext} from 'react';
import {StateContext} from '../../MusicPlayerApp.jsx';
import EditMusicBox from './EditMusicBox.jsx';

export default function Player() {

    const playingMusicsList = useContext(StateContext).playingMusicsListProvider;
    const currentPlayingMusicIndex = useContext(StateContext).currentPlayingMusicIndexProvider;
    const setCurrentPlayingMusicIndex = useContext(StateContext).setCurrentPlayingMusicIndexProvider;
    const setMusicsList = useContext(StateContext).setMusicsListProvider;

    const [showEditBox, setShowEditBox] = useState(false);

    const musicPosterRef = useRef(null);
    const audioPlayerRef = useRef(null);
    const fallbackPosterImgSrc = "/poster/empty-poster.png";
    
    useEffect(() => {
        if(audioPlayerRef.current) {
            audioPlayerRef.current.play();
        }

        musicPosterRef.current.src = playingMusicsList[currentPlayingMusicIndex] ? playingMusicsList[currentPlayingMusicIndex].poster : null;
    }, [playingMusicsList, currentPlayingMusicIndex]);

    function handleFallbackImg() {
        musicPosterRef.current.src = fallbackPosterImgSrc;
    }

    function handlePlayPreviousBtn() {
        if(currentPlayingMusicIndex === 0) setCurrentPlayingMusicIndex(playingMusicsList.length - 1);
        else setCurrentPlayingMusicIndex(currentPlayingMusicIndex - 1);
    }

    function handlePlayNextBtn() {
        if(currentPlayingMusicIndex === playingMusicsList.length-1) setCurrentPlayingMusicIndex(0);
        else setCurrentPlayingMusicIndex(currentPlayingMusicIndex + 1);
    }

    function handleEditOpenBtn() {
        setShowEditBox(!showEditBox);

    }

    const musicInfoRender = currentPlayingMusicIndex !== null ? (
        <>
            <div className='music-info'>
                <div className='music-name'>{playingMusicsList[currentPlayingMusicIndex].name}</div>
                <div className='music-artist'>{playingMusicsList[currentPlayingMusicIndex].artist}</div>

                <div className='music-album'>{`Album • ${playingMusicsList[currentPlayingMusicIndex].album}`}</div>
                <div className='music-composer'>{`Composer • ${playingMusicsList[currentPlayingMusicIndex].composer}`}</div>
                <div className='music-released'>{`Released • ${playingMusicsList[currentPlayingMusicIndex].released}`}</div>
            </div>
            <div className='music-player'>
                <audio
                    src={playingMusicsList[currentPlayingMusicIndex].url}
                    ref={audioPlayerRef}
                    controls={true}
                    onEnded={() => handlePlayNextBtn()}
                />
                <button onClick={handlePlayPreviousBtn}><i className="fa-solid fa-backward"></i></button>
                <button onClick={handlePlayNextBtn}><i className="fa-solid fa-forward"></i></button>
            </div>
        </>
    ) : null;

    return(
        <div className='player-container'>
            <div className='player-box'>
                <img 
                    src={fallbackPosterImgSrc} 
                    onError={handleFallbackImg} 
                    ref={musicPosterRef} 
                    className='music-poster'
                />
                <div className='music-body'>
                    {musicInfoRender}
                </div>
                <div className='edit-enable-box'>
                    <button className='edit-enable' onClick={handleEditOpenBtn}><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            </div>
            <EditMusicBox 
                showEditBox={showEditBox} 
                setShowEditBox={setShowEditBox} 
                currentMusic={playingMusicsList[currentPlayingMusicIndex] || null} 
                setMusicsList={setMusicsList} 
            />
        </div>
    );
}