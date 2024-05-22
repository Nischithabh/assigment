import React, { useState, useEffect } from 'react';
import './Password.css'

const PasswordGenerator = () => {
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeAlphabets, setIncludeAlphabets] = useState(false);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [passwordHistory, setPasswordHistory] = useState([]);

    useEffect(() => {
        localStorage.removeItem('passwordHistory');
        setPasswordHistory([]);
    }, []);

    useEffect(() => {
        localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    }, [passwordHistory]);

    const generatePassword = () => {
        const numbers = '0123456789';
        const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let characterPool = '';
        if (includeNumbers) characterPool += numbers;
        if (includeAlphabets) characterPool += alphabets;
        if (includeSpecialChars) characterPool += specialChars;

        if (characterPool === '') {
            alert('Please select at least one option!');
            return;
        }

        let password = '';
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * characterPool.length);
            password += characterPool[randomIndex];
        }

        setGeneratedPassword(password);
        setPasswordHistory([password, ...passwordHistory.slice(0, 4)]);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPassword)
            .then(() => alert('Password copied to clipboard!'))
            .catch(err => console.error('Failed to copy!', err));
    };

    return ( <
        div className = "container" >
        <
        h1 > Password Generator < /h1> <
        div className = "options" >
        <
        label >
        <
        input type = "checkbox"
        checked = { includeNumbers }
        onChange = {
            () => setIncludeNumbers(!includeNumbers) }
        />
        Include Numbers <
        /label> <
        label >
        <
        input type = "checkbox"
        checked = { includeAlphabets }
        onChange = {
            () => setIncludeAlphabets(!includeAlphabets) }
        />
        Include Alphabets <
        /label> <
        label >
        <
        input type = "checkbox"
        checked = { includeSpecialChars }
        onChange = {
            () => setIncludeSpecialChars(!includeSpecialChars) }
        />
        Include Special Characters <
        /label> <
        /div> <
        button onClick = { generatePassword } > Generate Password < /button> <
        div className = "password-display" >
        <
        input type = "text"
        value = { generatedPassword }
        readOnly / >
        <
        button onClick = { copyToClipboard } > Copy < /button> <
        /div> <
        h2 > Last 5 Generated Passwords < /h2> <
        ul > {
            passwordHistory.map((password, index) => ( <
                li key = { index } > { password } < /li>
            ))
        } <
        /ul> <
        /div>
    );
};

export default PasswordGenerator;