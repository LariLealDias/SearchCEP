//Buttons
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', searchCEP);

const cleanBtn = document.getElementById('cleanBtn');
cleanBtn.addEventListener('click', cleanForm);


//Elements HTML to use in function insertDataInInput(data) and function cleanForm()
const inputCEP = document.getElementById('CEP');
const street = document.getElementById('street');
const neighbourhood = document.getElementById('neighbourhood');
const city = document.getElementById('city');
const state = document.getElementById('state');
const errorSpan = document.getElementById('errorSpan');


//Insert only number in element input id="CEP"
function sanitizerInput(keypress){

    keypress = (keypress) ? keypress : window.event;

    let charCode = (keypress.which) ? keypress.which : keypress.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    }
    return true;
}

//Function make button search the CEP
function searchCEP(){
    const valueCEP = inputCEP.value;
    
    if(valueCEP){
        const urlApi = `https://viacep.com.br/ws/${valueCEP}/json/`;

        try{
            fetch(urlApi)
            .then(res => res.json())
            .then(data => insertDataInInput(data))
            .catch(error => {
                errorSpan.innerHTML = 'cep não encontrado';
            })
        }catch(e){
            console.error('ops,algo está errado...');
        }
    } else{
        alert('Insira um CEP válido');
    }
}

//Insert api response in elements HTML
function insertDataInInput(data){
    street.value = data.logradouro;
    neighbourhood.value = data.bairro;
    city.value = data.localidade;
    state.value = data.uf;
}

//Clean all elements inputs in forms when click button "limpar" 
function cleanForm(){
    inputCEP.value = '';
    street.value = '';
    neighbourhood.value = '';
    city.value = '';
    state.value = '';
}


