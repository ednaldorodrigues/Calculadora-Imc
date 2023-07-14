const form = document.querySelector('#form');
const pesoInput = document.querySelector('#peso');
const alturaInput = document.querySelector('#altura');
const seuImc = document.querySelector('.seu-imc');
const btnLimpar = document.querySelector('.btnLimpar');
const infos = document.querySelector('.infos');
const imcNumber = document.querySelector('.imcNumber');


function formatarAltura(altura) {
  const alturaFormatada = altura.replace(',', '.');

  if (alturaFormatada.length === 3) {
    return `${alturaFormatada.substr(0, 1)}.${alturaFormatada.substr(1)}`;
  } else if (alturaFormatada.length === 2) {
    return `0.${alturaFormatada}`;
  } else {
    return alturaFormatada;
  }
}

function validarDigitos(text) {
  return text.replace(/[^0-9,]/g, '');
}

[pesoInput, alturaInput].forEach((input) => {
  input.addEventListener('input', (e) => {
    const valorAtual = validarDigitos(e.target.value);

    e.target.value = valorAtual;
  });

  
});


function limparInput(event) {
  event.preventDefault();
  pesoInput.value = "";
  alturaInput.value = "";
  infos.classList.add('disable');
};

function handleClick(event) {
  event.preventDefault();

  const peso = pesoInput.value.replace(',', '.');
  const altura = parseFloat(formatarAltura(alturaInput.value));

  if (altura < 1) {
    alert('Número minimo para altura é 1');
    return;
  } else if (altura > 2.25) {
    alert('Número máximo para altura é 225');
    return;
  }
   
  if (peso > 300) {
    alert('O peso máximo deve ser de 300 kg');
    return;
  }


  const imc = (peso / (altura * altura)).toFixed(1);

  const valueImc = document.querySelector('.imcNumber');
  const estadoImc = document.querySelector('.estado');
  infos.classList.remove('disable');
  imcNumber.classList.remove('normal');
  imcNumber.classList.add('cuidado');
  
  
  if (imc < 18.5) {
    valueImc.innerText = imc;
    seuImc.innerText = 'Seu IMC';
    estadoImc.innerText = 'Você está com magreza!';
  } else if (imc >= 18.5 && imc < 25) {
    valueImc.innerText = imc;
    seuImc.innerText = 'Seu IMC';
    estadoImc.innerText = 'Seu peso está normal!';
    imcNumber.classList.remove('cuidado')
    imcNumber.classList.add('normal');
  } else if (imc >= 25 && imc < 30) {
    valueImc.innerText = imc;
    seuImc.innerText = 'Seu IMC';
    estadoImc.innerText = 'Você está com sobrepeso!';
  } else if (imc > 30 && imc < 35) {
    valueImc.innerText = imc;
    seuImc.innerText = 'Seu IMC';
    estadoImc.innerText = 'Você está com obesidade severa!';
  } else if (imc > 35 && imc <= 60){
    valueImc.innerText = imc;
    seuImc.innerText = 'Seu IMC';
    estadoImc.innerText = 'Você está com obesidade mórbida!';
  }

}

form.addEventListener('submit', handleClick);
btnLimpar.addEventListener('click', (e) => {
  e.preventDefault();
  limparInput(e);
});