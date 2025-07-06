import { useState } from "react"

export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setplayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleButtonSelection() {
        setIsEditing((editing) => !editing);
    }

    function handleChange(event) {
        console.log(event);
        setplayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = 'Save';

    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
        // btnCaption = 'Edit';
    }

    return (
        <li className="{isActive ? 'active': 'undefined'}" >
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleButtonSelection}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}