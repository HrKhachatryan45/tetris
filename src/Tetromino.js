import React from 'react';

const Tetromino = ({ shape, color }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${shape[0].length}, 20px)` }}>
            {shape.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: cell ? color : 'transparent',
                            border: '1px solid #ccc',
                        }}
                    />
                ))
            ))}
        </div>
    );
};

export default Tetromino;
