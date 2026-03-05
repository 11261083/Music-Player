import './MusicPlayer.css';
import musics from './assets/musics.json';
import React, {useState, createContext} from 'react';

import Player from './components/Player/Player.jsx';
import Body from './components/Body/MusicPlayerBody.jsx';

export const StateContext = createContext();

export default function MusicPlayerApp() {

    const [musicsList, setMusicsList] = useState(musics);
    const [playingMusicsList, setPlayingMusicsList] = useState([]);
    const [currentPlayingMusicIndex, setCurrentPlayingMusicIndex] = useState(null);

    return(
        <div className='music-player-app'>
            <StateContext.Provider value={ 
                {
                    musicsListProvider: musicsList, 
                    setMusicsListProvider: setMusicsList, 
                    playingMusicsListProvider: playingMusicsList, 
                    setPlayingMusicsListProvider: setPlayingMusicsList, 
                    currentPlayingMusicIndexProvider: currentPlayingMusicIndex, 
                    setCurrentPlayingMusicIndexProvider: setCurrentPlayingMusicIndex
                } 
            }>
                <Player />
                <Body />
            </StateContext.Provider>
        </div>
    );
}