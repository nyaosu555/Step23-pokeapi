import './style.css'
import axios from 'axios'

const form = document.getElementById('poke-form');
const input = document.getElementById('pokemon');
const result = document.getElementById('result');
const pokeName = document.getElementById('js-poke-name');
const pokeJaName = document.getElementById('js-poke-ja-name');
const pokeImg = document.getElementById('js-poke-img');
const pokeType = document.getElementById('js-poke-type');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputData = input.value;
  const str = inputData.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
  pokeName.textContent = '';
  pokeJaName.textContent = '';
  pokeType.textContent = '';

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${str}`);
    const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${res.data.id}`);
    console.log(res);
    const JaName = res2.data.names.find((name) => name.language.name === 'ja-hrkt').name;
    pokeName.textContent = `名前(英語)： ${res.data.name}`;
    pokeJaName.textContent = `名前(日本語)： ${JaName}`;
    pokeImg.style.display = 'block'; 
    pokeImg.src = `${res.data.sprites.front_default}`;
    console.log()
    const types = res.data.types.map((type) => type.type.name)
    pokeType.textContent = `タイプ: ${types}`;

  } catch(err) {
    console.error(err);
    pokeName.textContent = `名前： 該当するポケモンはいません`;
    pokeJaName.textContent = '';
    pokeImg.style.display = 'none';
    pokeType.textContent = '';
  }

})