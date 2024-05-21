import React from "react";
import { useState, useEffect } from "react";

// api = "https://api.imgflip.com/get_memes"

// use useEffect()

export default function Meme() {
  const [allMemes, setAllMemes] = useState([]);

  const [meme, setMeme] = useState({
    topText: "Shut up",
    bottomText: "And take my money",
    randomImg: '../assets/images/memeimg.png',
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  console.log("run");

  const getNewMemeImg = () => {
    const randomNum = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNum].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImg: url,
    }));
  };

  const updateText = (e) => {
    const { value, name } = e.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  return (
    <div className="meme">
      <div className="meme-forms">
        <div className="meme-form">
          <label htmlFor="topText">Top Text</label>
          <input
            type="text"
            id="topText"
            placeholder="e.g - Shut up"
            name="topText"
            onChange={updateText}
          />
        </div>
        <div className="meme-form">
          <label htmlFor="bottomText">Botom Text</label>
          <input
            type="text"
            id="bottomText"
            placeholder="e.g - And take my money"
            name="bottomText"
            onChange={updateText}
          />
        </div>
      </div>

      <button className="form-btn" onClick={getNewMemeImg}>
        Get a new meme image 🖼
      </button>
      <div className="formImg">
        <img src={meme.randomImg} alt="" />
        <h3 className="textTop">{meme.topText}</h3>
        <h3 className="textBottom">{meme.bottomText}</h3>
      </div>
    </div>
  );
}
