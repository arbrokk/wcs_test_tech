import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header className="bg-red-400 bg-opacity-25 flex flex-col items-center justify-center py-6 ">
                <img className="w-32 py-4" src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />

                <h1 className="font-title text-bold text-4xl ml-2">Les Argonautes</h1>
            </header>
        );
    }
}