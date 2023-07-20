import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import{ useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { loader } from '../assets';
import { useSearchArtistsQuery } from '../redux/services/shazamCore'



const SongCard = ({ song, apidata }) => {
  // const [img, setImgapi] = useState(null);


  const activeSong = 'test';
  const artistName = song["artists"][0]["name"];
  const limit = 1;
  const { data, isFetching, error } = useSearchArtistsQuery({ artistName, limit });
  // if (song && data){
  //   debugger
  // console.log(data);
  // console.log(song);
  // }

  // useEffect(() => {
  //   if(song){
  //     setImgapi()
  //   }
  // },img)


  return(
    <>
      <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer my-3">
        <div className="relative h-56 w-full group" >
          <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${ activeSong === song.title ? 'flex bg-opacity-70 bg-black' : 'hidden'}`}>
            <PlayPause />
          </div>
          <div key={song.id}>
            <p>song Name: {song.name}</p>
            <p>song Artist: {song.artists[0].name}</p>
          </div>
          {
            data ? (<img src={data["artists"]["items"][0]["data"]["visuals"]["avatarImage"]["sources"][1]["url"]} className="img-fluid" alt="img_here" />): ("Loading Image..")
          }
        </div>
      </div>
    </>

    )
};

export default SongCard;
