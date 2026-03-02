import './MusicPlayer.css';
import musics from './assets/musics.json';
import React, {useState, useEffect, createContext} from 'react';

import Player from './components/Player/Player.jsx';
import Body from './components/Body/MusicPlayerBody.jsx';

export const StateContext = createContext();

export default function MusicPlayerApp() {

    const [musicsList, setMusicsList] = useState([]);
    const [playingMusics, setPlayingMusics] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    
    useEffect(() => {
        
        setMusicsList(musics);
    }, []);

    return(
        <div className='music-player-app'>
            <StateContext.Provider value={ 
                {
                    musicsListProvider: musicsList, 
                    setMusicsListProvider: setMusicsList, 
                    playingMusicsProvider: playingMusics, 
                    setPlayingMusicsProvider: setPlayingMusics, 
                    currentIndexProvider: currentIndex, 
                    setCurrentIndexProvider: setCurrentIndex
                } 
            }>
                <Player />
                <Body />
            </StateContext.Provider>
        </div>
    );
}