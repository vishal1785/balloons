import React from 'react';

export const Balloons = ({ array, handleClick }) => {
    return (
        <div className={ handleClick ? "empty-div-crcl-container" : "colored-balloon-div"}>
            {array.map((i) => {
                return (
                    <div
                        className="balloons"
                        onClick={handleClick}
                        id={Object.values(i)}
                        key={Object.values(i)}
                        style={{ backgroundColor: `${Object.keys(i)}` }}
                    ></div>
                );
            })}
        </div>
    );
};
