import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';


const Home = () => {

    const storedComics = Object.keys(localStorage)
        .filter((key) => key.startsWith('comic-'))
        .map((key) => JSON.parse(localStorage.getItem(key)));
    // console.log(sharedComic)

    useEffect(() => {
        const handleBeforeUnload = () => {
            // Clear storage when the user is navigating away from the Home page
            localStorage.clear();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        // CODE3

        <div>
            <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
                <h1 className="text-2xl font-bold">Dashtoon Comic Creator</h1>
                <Link to="/comic-generator">
                    <button className="bg-white text-blue-500 px-4 py-2 rounded-lg">
                        Create Your Comic
                    </button>
                </Link>
            </div>

            <div className="text-center mt-4">
                <h3 className="text-2xl font-bold">Explore the Comics</h3>
            </div>

            {/* {sharedComic && ( */}
            {storedComics.length > 0 && (
                <div className="m-4 p-4 bg-gray-200">
                    <h4 className="text-xl font-bold mb-2">Shared Comic</h4>
                    <div className="grid grid-cols-4 gap-4">
                        {/* {sharedComic.map((comic, index) => (
                            <img key={index} src={comic.thumbnail} alt={`Comic ${index + 1} Thumbnail`} className="w-full mb-2" />
                        ))} */}
                        {/* <img src={sharedComic.thumbnail} alt="Shared Comic Thumbnail" className="w-full mb-2" /> */}

                        {storedComics.map((comic, index) => (
                            <img key={index} src={comic.thumbnail} alt={`Comic ${index + 1} Thumbnail`} className="w-full mb-2" />
                        ))}

                    </div>
                </div>
            )}
        </div>
    )
}

export default Home