import React from 'react';

export const Balloons = ({ array, handleClick }) => {
    return (
        <div className={ handleClick ? "empty-div-crcl-container" : "colored-balloon-div"}>
            {array.map((item) => {
                return (
                    <div
                        className="balloons"
                        onClick={handleClick}
                        id={item.id}
                        key={item.value}
                        style={{ backgroundColor: `${item.value}` }}
                    ></div>
                );
            })}
        </div>
    );
};
