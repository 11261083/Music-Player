import './MusicPlayerBody.css';
import React, {useState, useContext, useMemo} from 'react';
import {StateContext} from '../../MusicPlayerApp.jsx';
import PlaylistContainer from './Playlist/PlaylistContainer.jsx';
import MusicItemContent from './MusicItem/MusicItemContent.jsx';


export default function MusicPlayerBody() {

    const musicsList = useContext(StateContext).musicsListProvider;
    const setPlayingMusicsList = useContext(StateContext).setPlayingMusicsListProvider;
    const setCurrentPlayingMusicIndex = useContext(StateContext).setCurrentPlayingMusicIndexProvider;

    const [playlists, setPlaylists] = useState([{title: "test", list: [1]}]);
    const [currentCategory, setCurrentCategory] = useState("artist");
    const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);
    const [sortType, setSortType] = useState("name");
    const [sortDesc, setSortDesc] = useState(true);

    const [editingPlaylist, setEditingPlaylist] = useState(false);
    const [customPlaylistTitle, setCustomPlaylistTitle] = useState("");
    const [customPlaylistSelectedItems, setCustomPlaylistSelectedItems] = useState([]);

    const categoryItemsList = useMemo(() => {
        const categoryItemsListMemo = {
            album: [],
            artist: [],
            released: [],
        };

        musicsList.forEach((music) => {
            if(categoryItemsListMemo.album.indexOf(music.album.trim()) === -1) {
                categoryItemsListMemo.album.push(music.album.trim());
            }
            if(categoryItemsListMemo.artist.indexOf(music.artist.trim()) === -1) {
                categoryItemsListMemo.artist.push(music.artist.trim());
            }
            if(categoryItemsListMemo.released.indexOf(music.released) === -1) {
                categoryItemsListMemo.released.push(music.released);
            }
        });

        return categoryItemsListMemo;
    }, [musicsList]);

    const filteredAndSortedList = useMemo(() => {
        const filteredList = currentCategory === "playlist" 
            ? musicsList.filter((music) => {
                return playlists[selectedCategoryItem] ? playlists[selectedCategoryItem].list.includes(music.id) : false;
            }) 
            : musicsList.filter((music) => {
                return music[currentCategory] === selectedCategoryItem;
            });

        return [...filteredList].sort((a, b) => sortListByTypeAndOrder(a, b));
    }, [currentCategory, musicsList, playlists, selectedCategoryItem, sortType, sortDesc]);

    const sortedMusicsList = useMemo(() => {
        return [...musicsList].sort((a, b) => sortListByTypeAndOrder(a, b));
    }, [musicsList, sortType, sortDesc]);

    function sortListByTypeAndOrder(a, b) {
        switch(sortType) {
            case "name": 
                return sortDesc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            case "artist":
                return sortDesc ? a.artist.localeCompare(b.artist) : b.artist.localeCompare(a.artist);
            case "release":
                return sortDesc ? a.released - b.released : b.released - a.released;
            default:
                return a.id - b.id;
        }
    }


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

    function handleNewPlaylistBtn() {
        setEditingPlaylist(true); 
        setCustomPlaylistTitle(''); 
        setCustomPlaylistSelectedItems([]);
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
        setPlayingMusicsList(filteredAndSortedList); 
        setCurrentPlayingMusicIndex(index)
    }

    function handlePlaylistTitleChange(e) {
        setCustomPlaylistTitle(e.target.value);
    }

    function handleCustomPlaylistItemSelectionBtn(id) {

        if(customPlaylistSelectedItems.includes(id)) {
            setCustomPlaylistSelectedItems(prev => prev.filter((value) => value !== id));
        }
        else {
            setCustomPlaylistSelectedItems(prev => [...prev, id])
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

        if(customPlaylistSelectedItems.length === 0) {
            alert("Please add at least 1 items to the Playlist");
            return;
        }

        setPlaylists(prev => [...prev, {title: customPlaylistTitle, list: customPlaylistSelectedItems}])
        setCustomPlaylistTitle('');
        setEditingPlaylist(false);
    }

    function handlePlaylistEditCancel() {
        setCustomPlaylistTitle(""); 
        setEditingPlaylist(false); 
        setCustomPlaylistSelectedItems([]);
    }

    return(
        <div className='music-player-body-container'>
            <PlaylistContainer 
                currentCategory={currentCategory}
                playlists={playlists}
                categoryItemsList={categoryItemsList}
                handlePlaylistCategoriesBtn={handlePlaylistCategoriesBtn}
                handleCustomPlaylistItemsBtn={handleCustomPlaylistItemsBtn}
                handleCategoryPlaylistItemsBtn={handleCategoryPlaylistItemsBtn}
                handleNewPlaylistBtn={handleNewPlaylistBtn}
                handlePlaylistDelete={handlePlaylistDelete}
            />
            <MusicItemContent 
                customPlaylistSelectedItems={customPlaylistSelectedItems}
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
                handleCustomPlaylistItemSelectionBtn={handleCustomPlaylistItemSelectionBtn}
                handlePlaylistEditSave={handlePlaylistEditSave}
                handlePlaylistEditCancel={handlePlaylistEditCancel}
            />
        </div>
    );
}