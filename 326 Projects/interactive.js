import { decoder } from "./decoderRingClass.js";

const key = document.getElementById("key");
const encode = document.getElementById("encode");
const encoded = document.getElementById("encoded");
const decode = document.getElementById("decode");
const decoded = document.getElementById("decoded");

key.addEventListener("keyup", validateKeyTextInput);
encode.addEventListener("keyup", colorEncodedTextBox);
encode.addEventListener("keyup", encodeText);
decode.addEventListener("keyup", colorDecodedTextBox);
decode.addEventListener("keyup", decodeText);

function validateKeyTextInput()
{
    let text = key.value
    if(text.length < 26)
    {
        key.style.backgroundColor = "yellow";
    }
    else if(text.split('').every(letter => {
        return (letter === letter.toLowerCase());
    }))
    {
        key.style.backgroundColor = "white";
    }
    else
    {
        key.style.backgroundColor = "yellow";
    }
}

function colorEncodedTextBox()
{
    let text = encode.value;
    if(text.length === 0)
    {
        encoded.style.color = "black";
        encoded.style.backgroundColor = "white";
    }
    else
    {
        encoded.style.color = "white";
        encoded.style.backgroundColor = "red";
    }
}

function colorDecodedTextBox()
{
    let text = decode.value;
    if(text.length === 0)
    {
        decoded.style.color = "black";
        decoded.style.backgroundColor = "white";
    }
    else
    {
        decoded.style.color = "white";
        decoded.style.backgroundColor = "green";
    }
}

function encodeText()
{
    let cipher = new decoder(key.value);
    encoded.value = cipher.encode(encode.value)
}

function decodeText()
{
    let cipher = new decoder(key.value);
    decoded.value = cipher.decode(decode.value)
}