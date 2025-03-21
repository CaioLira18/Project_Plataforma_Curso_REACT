import React from "react";
import Main from "../components/main";
// Importe outros componentes necessários

const Home = ({ searchTerm }) => {
    return (
        <div className="home">
            <Main type="items" searchTerm={searchTerm} />
            {/* Outros componentes da página Home */}
        </div>
    );
};

export default Home;