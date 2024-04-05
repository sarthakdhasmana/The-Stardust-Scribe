import { useState, useEffect, useRef } from "react";
import PreferredFantasyLogo from '..//Assets/Main_Component.svg';
import FavouritePreferanceLogo from '..//Assets/Heart_01.svg';
import Selector from '..//Assets/Chevron_Down.svg';
import storyGenreImage from '..//Assets/simon-berger-rydQVdwcgUQ-unsplash.jpg';




function StorySection() {

    //useRef Hooks
    const queryInputRef1 = useRef("");
    const queryInputRef2 = useRef("");
    const resultPara = useRef('');
    const spanRef = useRef(null);
    const storyContainer = useRef();
    const RelatedImage = useRef();

    //useState Hooks
    const [feedback, updateFeedback] = useState('');
    const [query, updateQuery] = useState(" ");

    const options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': 'Bearer iKR4eS2qOQV0u5bFFHIEE74soluzVTTT'
        },
        body: JSON.stringify({
            maxTokens: 300,
            minTokens: 20,
            prompt: query

        })
    };

    function fetchURL() {
        fetch('https://api.ai21.com/studio/v1/j2-mid/complete', options)
            .then(response => response.json())
            .then(response => ApiResponded(response)) //
            .catch(err => console.error(err))
    }

    function requestQuery(e) {
        e.preventDefault();
        resultPara.current.style.display = 'block';
        spanRef.current.style.display = 'none';
        updateQuery('');
        const PreferredFantasy = queryInputRef1.current.value;
        const PreferredElement = queryInputRef2.current.value;
        const queryText = 'Write a story which features ' + PreferredFantasy + ' and also includes ' + PreferredElement + ', with a no more than 200 words.';
        if (updateQuery !== '') {
            updateQuery(queryText);
        }
    }

    function ApiResponded(response) {
        const val = response.completions[0].data.text;
        console.log(val);
        updateFeedback(val);
    }

    useEffect(() => {
        fetchURL();
    }, [query]);

    return (
        <>
            <div className="storySectionWrapper">
                <div className="formWrapper">
                    <div className="formContent">
                        <p className="greetingUser">Hello Sarthak Dhasmana</p>
                        <p className="riddle riddleMargin">Unleash your imagination! Describe your ideal fantasy setting and the magical wonder that lives within it. <span>Step into the realm of boundless imagination, where the whispers of ancient forests intertwine with the echoes of forgotten legends</span></p>
                        <p className="riddle riddleBottom">Imagine a land unlike any other... What fantastical creatures or elements would inhabit it?</p>
                    </div>
                    <div className="formElement">
                        <form onClick={(e) => e.preventDefault()}>
                            <div className="InputSecion">
                                <div className="inputs">
                                    <p className="inputTitle">Preferred Fantasy :</p>
                                    <div className="InputAbs">
                                        <img src={PreferredFantasyLogo} alt="Fantasy" />
                                        <input type="text" placeholder="e.g.,mythological, futuristic" ref={queryInputRef1} />
                                    </div>
                                </div>
                                <div className="inputs InputMargin">
                                    <p className="inputTitle">Favorite creature/element :</p>
                                    <div className="InputAbs">
                                        <img src={FavouritePreferanceLogo} alt="Favourite Preferance" />
                                        <input type="text" placeholder="e.g., dragons, spells" ref={queryInputRef2} />
                                    </div>
                                </div>
                                <div className="buttonWrapper">
                                    <div className="selectInput">
                                        <img src={Selector} alt="Selector Arrow" />
                                        <select title="Choose Genre">
                                            <option value="" disabled hidden className="lightInput">Choose Genre</option>
                                            <option value="" >Horror</option> {/* Tags: Scary, Creepy, Haunting */}
                                            <option value="" >Fantasy</option>{/* Tags: Enchanting, Magical, Mystical */}
                                            <option value="" >Sci-Fi</option>{/* Tags: Futuristic, Extraterrestrial, Technological */}
                                            <option value="" >Mystery</option>{/* Tags: Intriguing, Suspenseful, Enigmatic */}
                                            <option value="" >Romance</option>{/* Tags: Passionate, Romantic, Intimate */}
                                            <option value="" >Thriller</option>{/* Tags: Suspenseful, Action-packed, Intense */}
                                            <option value="" >Historical</option>{/* Tags: Periodic, Authentic, Nostalgic */}
                                            <option value="" >Adventure</option>{/* Tags: Exciting, Thrilling, Adventurous */}
                                            <option value="" >Comedy</option>{/* Tags: Humorous, Hilarious, Witty */}
                                            <option value="" >Drama</option>{/* Tags: Emotional, Intense, Gripping */}
                                        </select>
                                    </div>
                                    <button type="submit" onClick={e => requestQuery(e)}>Begin weaving the story !</button>{/* onClick={e => requestQuery(e)} */}
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="StoryGenre">
                    <img src={storyGenreImage} alt="Related displayed" ref={RelatedImage} />
                    <div className="bluredImage"></div>
                    <div className="storyContainer" ref={storyContainer}>
                        <span ref={spanRef}>"Pick your ingredients wisely, for they hold the power to craft a tale that will enchant and captivate all who dare to listen!" 🌟📜</span>
                        <p ref={resultPara}>{feedback}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StorySection;