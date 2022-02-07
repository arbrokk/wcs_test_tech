import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className=" text-center py-12 bg-red-400  bg-opacity-25  fixed inset-x-0 bottom-0">
                <p>Réalisé par <span className="font-signature text-4xl">Jason</span>, en Anthestérion de l'an 515 avant JC</p>
            </footer>
        );
    }
}