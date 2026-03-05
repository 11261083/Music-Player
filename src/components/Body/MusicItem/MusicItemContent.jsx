import './MusicItemContent.css';

export default function MusicItemContent({
    customPlaylistSelectedItems,
    sortType,
    sortDesc,
    customPlaylistTitle,
    editingPlaylist,
    filteredAndSortedList,
    sortedMusicsList,
    handleSortTypeChange,
    handleSortOrderBtn,
    handleMusicItemClick,
    handlePlaylistTitleChange,
    handleCustomPlaylistItemSelectionBtn,
    handlePlaylistEditSave,
    handlePlaylistEditCancel
}) {

    const musicItemsRender = filteredAndSortedList.map((music, index) => {
        return (
            <button key={music.id} onClick={() => handleMusicItemClick(index)}>
                {music.name} • {music.artist} • {music.released}
            </button>
        );
    });

    const playlistEditorRender = (
        <div className='custom-playlist-editer-box'>
            <p>Playlist Title:</p>
            <input value={customPlaylistTitle} onChange={handlePlaylistTitleChange} className='custom-playlist-editer-name'></input>
            {sortedMusicsList.map((item) => {
                return(
                    <div key={item.name} className='custom-playlist-editer-items'>
                        {customPlaylistSelectedItems.includes(item.id) ? <i class="fa-solid fa-circle-check"></i> : <i class="fa-regular fa-circle"></i>}
                        <button onClick={() => handleCustomPlaylistItemSelectionBtn(item.id)}>{item.name} • {item.artist} • {item.released}</button>
                    </div>
                );
            })}
            <div className='custom-playlist-editer-btn-box'>
                <button onClick={handlePlaylistEditCancel}>Cancel</button>
                <button onClick={handlePlaylistEditSave}>Save</button>
            </div>
        </div>
    );


    return(
        <div className='music-items-container'>
            <div className='sort-config-box'>
                <select onChange={handleSortTypeChange} value={sortType} className='sort-type'>
                    <option value="name">Name</option>
                    <option value="artist">Artist</option>
                    <option value="release">Release</option>
                </select>
                <button onClick={handleSortOrderBtn} className='sort-order'>{!sortDesc ? <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>}</button>
            </div>
            <div className='music-items-box'>
                {editingPlaylist ? playlistEditorRender : musicItemsRender}
            </div>
        </div>
    );
}