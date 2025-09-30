import "./style.css";
import odinImage from "./odin.png";
import { greeting } from "./greeting";

console.log(greeting);


const imageElm = document.createElement('img');
imageElm.src = odinImage;

document.body.appendChild(imageElm);
