import React, { useState, useRef } from 'react'
import { toPng } from 'html-to-image';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';




const ComicGenerator = () => {
    const [comicText, setComicText] = useState('');
    const [comicImages, setComicImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const elementRef = useRef(null);
    const [showSocialMediaDropdown, setShowSocialMediaDropdown] = useState(false);
    // const [storedComics, setStoredComics] = useState([])
    const navigate = useNavigate()

    const query = async (data) => {
        setLoading(true);

        try {
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: {
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            setComicImages((prevImages) => [...prevImages, URL.createObjectURL(result)])
        } catch (error) {
            console.error("Error generating comic:", error);
            alert("Error generating comic. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const generateComic = async () => {
        if (!comicText) {
            alert("Please enter text for the comic.");
            return;
        }

        const data = { "inputs": comicText };
        // query(data)
        for (let i = 0; i < 10; i++) {
            query(data)
        }
    };

    const htmlToImageConvert = () => {
        toPng(elementRef.current, { cacheBust: false })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "my-image-name.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const shareComic = () => {

        const comicData = {
            thumbnail: comicImages[0], // Use the first image as a thumbnail
            images: comicImages,
        };

        const comicKey = `comic-${new Date().getTime()}`;

        localStorage.setItem(comicKey, JSON.stringify(comicData));

        // Redirect to the home page or show a success message
        navigate('/')
    };

    const shareOnSocialMedia = () => {
        setShowSocialMediaDropdown(!showSocialMediaDropdown);
    };

    const handleShareClick = (platform) => {
        // Handle the logic for sharing on the selected platform
        console.log(`Sharing on ${platform}`);
        // You can add platform-specific sharing logic here
        if (comicImages.length > 0) {
            const imageUrl = comicImages[0]; // Assuming you want to share the first image

            // Share on WhatsApp
            if(platform === 'whatsapp'){

                window.open(`https://api.whatsapp.com/send?text=${imageUrl}`, '_blank');
            }

            // Share on Facebook
            if(platform === 'facebook'){

                window.open(`https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`, '_blank');
            }

            // Share on Instagram (Note: Direct sharing to Instagram has limitations)
            if(platform === 'instagram'){

                window.open(`https://www.instagram.com/?url=${imageUrl}`, '_blank');
            }
        } else {
            alert("No comic images to share. Generate a comic first.");
        }
    };

    return (
        <div>
            <header className="App-header bg-blue-500 text-white p-4">
                <h1 className="text-2xl font-bold">Comic Strip Generator</h1>
            </header>
            <div className="comic-generator p-6  flex">
                {/* Left side */}
                <div className="flex-1 pr-4 max-w-2xl">
                    <label htmlFor="comic-text" className="block text-sm font-medium text-gray-600">Enter text for the comic:</label>
                    <textarea
                        id="comic-text"
                        rows="4"
                        cols="50"
                        value={comicText}
                        onChange={(e) => setComicText(e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                    ></textarea>
                    <button
                        onClick={generateComic}
                        className="mt-3 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Generate Comic
                    </button>
                    {comicImages.length === 10 && (
                        <>

                            <button
                                onClick={htmlToImageConvert}
                                className="mt-3 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                            >
                                Download
                            </button>
                            <button
                                onClick={shareComic}
                                className="mt-3 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Share
                            </button>
                            {/* share on social media code starts */}
                            <div className="relative mt-2">
                                <button
                                    onClick={shareOnSocialMedia}
                                    className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                                >
                                    Share on Social Media
                                </button>
                                {showSocialMediaDropdown && (
                                    <div className="absolute top-full left-0 mt-1 w-full bg-slate-300 border rounded-md shadow-lg flex">
                                        <button
                                            onClick={() => handleShareClick('whatsapp')}
                                            className="flex-1 p-2 text-center ml-2 mr-2 bg-slate-400 hover:bg-gray-200"
                                        >
                                            
                                            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                                        </button>
                                        <button
                                            onClick={() => handleShareClick('facebook')}
                                            className="flex-1 p-2 text-center ml-2 mr-2 bg-slate-400 hover:bg-gray-200"
                                        >
                                            
                                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                                        </button>
                                        <button
                                            onClick={() => handleShareClick('instagram')}
                                            className="flex-1 p-2 text-center ml-2 mr-2 bg-slate-400 hover:bg-gray-200"
                                        >
                                            
                                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* share on social media ends */}
                        </>
                    )}
                </div>
                {/* Right side */}
                <div className="flex-1 ml-4 overflow-y-auto">
                    {loading && <p className="text-gray-600">Loading...</p>}
                    {comicImages.length === 10 && !loading && (
                        <div ref={elementRef} className="comic-output mt-4 p-4 grid grid-cols-4 grid-flow-row-dense gap-4 bg-[#000000]">
                            
                            <img src={comicImages[0]} alt="Generated Comic 1" className="w-full h-full mb-2 col-span-2" />
                            <img src={comicImages[1]} alt="Generated Comic 2" className="w-full h-full mb-2 col-span-2" />
                            <img src={comicImages[2]} alt="Generated Comic 3" className="w-full h-full mb-2 col-span-3" />
                            <img src={comicImages[3]} alt="Generated Comic 4" className="w-full h-full mb-2" />
                            <img src={comicImages[4]} alt="Generated Comic 5" className="w-full h-full mb-2 col-span-1" />
                            <img src={comicImages[5]} alt="Generated Comic 6" className="w-full h-full mb-2 col-span-3" />
                            <img src={comicImages[6]} alt="Generated Comic 7" className="w-full h-full mb-2" />
                            <img src={comicImages[7]} alt="Generated Comic 8" className="w-full h-full mb-2 col-span-2" />
                            <img src={comicImages[8]} alt="Generated Comic 9" className="w-full h-full mb-2" />
                            <img src={comicImages[9]} alt="Generated Comic 10" className="w-full h-full mb-2 col-span-4" />
                        </div>
                        
                    )}
                </div>
            </div>
        </div>
    )
}

export default ComicGenerator