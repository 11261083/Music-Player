import './PlaylistContainer.css';

export default function PlaylistContainer({ 
    currentCategory, 
    playlists,
    categoryItemsList,
    handlePlaylistCategoriesBtn,
    handleCustomPlaylistItemsBtn,
    handleCategoryPlaylistItemsBtn,
    handleNewCategoryBtn,
    handlePlaylistDelete,
}) {

    const categoryItemsRender = currentCategory === "playlist" 
    ? playlists.map((item, index) => {
        return (
            <div key={item.title} className='custom-playlist-items-box'>
                <button onClick={() => handleCustomPlaylistItemsBtn(index, item.title)} className='custom-playlist-item-btn'>{item.title}</button>
                <button onClick={() => handlePlaylistDelete(index)}><i className="fa-solid fa-trash-can"></i></button>
            </div>
        );
    }) 
    : categoryItemsList[currentCategory].sort((a, b) => {
        if(currentCategory === "released") return a - b;
        else return a.localeCompare(b);
    }).map((item) => {
        return (<button key={item} onClick={() => handleCategoryPlaylistItemsBtn(item)}>{item}</button>);
    });

    return(
        <div className='playlist-categories-container'>
            <div className='playlist-categories'>
                <button onClick={() => handlePlaylistCategoriesBtn('playlist')} className={`category ${currentCategory==="playlist" ? "selected" : ""}`}>Playlist</button>
                <button onClick={() => handlePlaylistCategoriesBtn('album')} className={`category ${currentCategory==="album" ? "selected" : ""}`}>Album</button>
                <button onClick={() => handlePlaylistCategoriesBtn('artist')} className={`category ${currentCategory==="artist" ? "selected" : ""}`}>Artist</button>
                <button onClick={() => handlePlaylistCategoriesBtn('released')} className={`category ${currentCategory==="released" ? "selected" : ""}`}>Release</button>
            </div>
            <div className='category-items'>
                {categoryItemsRender}
                {currentCategory === "playlist" ? <button onClick={handleNewCategoryBtn}>+</button> : null}
            </div>
        </div>
    );
}