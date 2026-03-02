import './MusicPlayerBody.css';
import React, {useState, useRef, useContext} from 'react';
import {StateContext} from '../../MusicPlayerApp.jsx';
import PlaylistContainer from './Playlist/PlaylistContainer.jsx';
import MusicItemContent from './MusicItem/MusicItemContent.jsx';


export default function MusicPlayerBody() {

    const musicsList = useContext(StateContext).musicsListProvider;
    const setPlayingMusics = useContext(StateContext).setPlayingMusicsProvider;
    const setCurrentIndex = useContext(StateContext).setCurrentIndexProvider;

    const [playlists, setPlaylists] = useState([{title: "test", list: [1]}]);
    const [currentCategory, setCurrentCategory] = useState("artist");
    const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);
    const [sortType, setSortType] = useState("name");
    const [sortDesc, setSortDesc] = useState(true);

    const [editingPlaylist, setEditingPlaylist] = useState(false);
    const [customPlaylistTitle, setCustomPlaylistTitle] = useState("");
    const checkedIds = useRef([]);

    const categoryItemsList = {
        album: [],
        artist: [],
        released: [],
    };

    musicsList.forEach((music) => {
        if(categoryItemsList.album.indexOf(music.album.trim()) === -1) {
            categoryItemsList.album.push(music.album.trim());
        }
        if(categoryItemsList.artist.indexOf(music.artist.trim()) === -1) {
            categoryItemsList.artist.push(music.artist.trim());
        }
        if(categoryItemsList.released.indexOf(music.released) === -1) {
            categoryItemsList.released.push(music.released);
        }
    });

    function handlePlaylistCategoriesBtn(category) {
        setCurrentCategory(category); 
        setSelectedCategoryItem(null); 
        setEditingPlaylist(false);
    }

    function handleCustomPlaylistItemsBtn(index, title) {
        setEditingPlaylist(false); 
        setSelectedCategoryItem(index); 
        setCustomPlaylistTitle(title);
    }

    function handleCategoryPlaylistItemsBtn(item) {
        setEditingPlaylist(false); 
        setSelectedCategoryItem(item); 
    }

    function handleNewCategoryBtn() {
        setEditingPlaylist(true); 
        setCustomPlaylistTitle(''); 
        checkedIds.current = [];
    }

    function handlePlaylistDelete(index) {
        setPlaylists(prev => prev.filter((_, i) => index !== i));
    }


    function handleSortTypeChange(e) {
        setSortType(e.target.value);
    }

    function handleSortOrderBtn() {
        setSortDesc(!sortDesc);
    }

    function handleMusicItemClick(index) {
        setPlayingMusics(filteredAndSortedList.map(music => music.id)); 
        setCurrentIndex(index)
    }


    function handlePlaylistTitleChange(e) {
        setCustomPlaylistTitle(e.target.value);
    }

    function handleCheckboxChange(e) {
        if(e.target.checked) {
            checkedIds.current.push(Number(e.target.id));
        }
        else {
            checkedIds.current = checkedIds.current.filter((id) => Number(e.target.id) !== id);
        }
    }

    function handlePlaylistEditSave() {
        for(let item of playlists) {
            if(item.title === customPlaylistTitle) {
                alert("Playlist Title already in use!");
                return;
            }
        }

        if(customPlaylistTitle === "") {
            alert("Enter a valid Title!");
            return;
        }

        if(checkedIds.current.length === 0) {
            alert("Please add at least 1 items to the Playlist");
            return;
        }

        setPlaylists(prev => [...prev, {title: customPlaylistTitle, list: checkedIds.current}])
        setCustomPlaylistTitle('');
        setEditingPlaylist(false);
    }

    function handlePlaylistEditCancel() {
        setCustomPlaylistTitle(""); 
        setEditingPlaylist(false); 
        checkedIds.current = [];
    }


    const filteredList = currentCategory === "playlist" 
    ? musicsList.filter((music) => {
        return playlists[selectedCategoryItem] ? playlists[selectedCategoryItem].list.includes(music.id) : false;
    }) 
    : musicsList.filter((music) => {
        return music[currentCategory] === selectedCategoryItem;
    });

    const filteredAndSortedList = filteredList.sort((a, b) => {
        switch(sortType) {
            case "name": 
                return sortDesc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                break;
            case "artist":
                return sortDesc ? a.artist.localeCompare(b.artist) : b.artist.localeCompare(a.artist);
                break; 
            case "release":
                return sortDesc ? a.released - b.released : b.released - a.released;
                break
            default:
                return a.id - b.id;
                break;
        }
    });

    const sortedMusicsList = musicsList.sort((a, b) => {
        switch(sortType) {
            case "name":
                return sortDesc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                break;
            case "artist":
                return sortDesc ? a.artist.localeCompare(b.artist) : b.artist.localeCompare(a.artist);
                break;
            case "release":
                return sortDesc ? a.released - b.released : b.released - a.released;
                break;
            default:
                return a.id - b.id;
                break;
        }
    });


    return(
        <div className='music-player-body-container'>
            <PlaylistContainer 
                currentCategory={currentCategory}
                playlists={playlists}
                categoryItemsList={categoryItemsList}
                handlePlaylistCategoriesBtn={handlePlaylistCategoriesBtn}
                handleCustomPlaylistItemsBtn={handleCustomPlaylistItemsBtn}
                handleCategoryPlaylistItemsBtn={handleCategoryPlaylistItemsBtn}
                handleNewCategoryBtn={handleNewCategoryBtn}
                handlePlaylistDelete={handlePlaylistDelete}
            />
            <MusicItemContent 
                sortType={sortType}
                sortDesc={sortDesc}
                customPlaylistTitle={customPlaylistTitle}
                editingPlaylist={editingPlaylist}
                filteredAndSortedList={filteredAndSortedList}
                sortedMusicsList={sortedMusicsList}
                handleSortTypeChange={handleSortTypeChange}
                handleSortOrderBtn={handleSortOrderBtn}
                handleMusicItemClick={handleMusicItemClick}
                handlePlaylistTitleChange={handlePlaylistTitleChange}
                handleCheckboxChange={handleCheckboxChange}
                handlePlaylistEditSave={handlePlaylistEditSave}
                handlePlaylistEditCancel={handlePlaylistEditCancel}
            />
        </div>
    );
}