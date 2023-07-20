import React, { useState, useEffect } from 'react';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetAlbumsQuery } from '../redux/services/shazamCore'

const Discover = () => {
  const [apiData, setApiData] = useState(null);

  const { data, isFetching, error } = useGetAlbumsQuery('3IBcauSj5M2A6lTeffJzdv');
  const genratitle = 'Pop';
  // debugger
  // const album = data.albums[0]["tracks"]["itmes"];
  // console.log(album);
  // data.albums[0]["tracks"]["items"][0]["artists"][0]["name"]

  useEffect(() => {
    if(data) {
      setApiData(data);
    }
  },[data])

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  if (!data || !data.albums) {
    return <div>No albums found.</div>;
  }

  const handlePlaySong = (previewUrl) => {
    const audio = new Audio(previewUrl);
    audio.play();
  };

  return(
    <>
      <div>
        {data.albums && data.albums.length > 0 ? (
          data.albums.map((album) => (
            <div key={album.id}>
              <h2>{album.name}</h2>
              <p>Artist: {album.artists[0].name}</p>
              <p>Release Date: {album.release_date}</p>

              <h3>Tracks:</h3>
              <ul>
                {album.tracks.items.map((track) => (
                  <li key={track.id}>
                    <p>Track Name: {track.name}</p>
                    <p>Track Artist: {track.artists[0].name}</p>
                    {/* Add more track information as needed */}
                    <button onClick={() => handlePlaySong(track.preview_url)}>
                      Play
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div>No albums found.</div>
        )}
      </div>


      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
          <h2 className="font-bold text-3xl text-white text-left">
            Discover {genratitle}
          </h2>
          <select name="" id="" onChange={() => {} } value="" 
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5" >
            { genres.map((genra) => <option key={genra.value} value={genra.value}> {genra.title} </option>) }
          </select>
        </div>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8" >
        {data.albums && data.albums.length > 0 ? (
          data.albums.map((album) => (
            <div key={album.id}>
                {album.tracks.items.map((track) => (
                  <div key={track.id}>
                    <SongCard
                      key={track.key}
                      apidata={apiData}
                      song={track}
                     />
                  </div>
                ))}
            </div>
          ))
        ) : (
          <div>No albums found.</div>
        )}
        </div>

      </div>
  </>
    )
}

export default Discover;
