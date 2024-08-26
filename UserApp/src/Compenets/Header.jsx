import React from 'react';

const Header = () => {
    return (
        <header className=" bg-black shadow p-4 flex justify-between items-center">
            <div className="text-lg font-bold">Dashboard</div>
            <div>
                <input type="text" placeholder="Search..." className="border p-2 rounded" />
            </div>
        </header>
    );
};

export default Header;