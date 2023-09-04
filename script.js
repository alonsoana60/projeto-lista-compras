// Consts
const prod = document.querySelector('#produto');
const qntd = document.querySelector('#qntd');
const medida = document.querySelector('#un_medida');
const btnAdd = document.querySelector('.btn_produto');
const prodList = document.querySelector('.produtos');
const prodTemplate = document.querySelector('.template-lista');


// funcao adicionar produto
function addProd() {
const produto = prod.value + " " + qntd.value+ " " + medida.value;
console.log(produto);

if (produto) {
    const newProd = prodTemplate.content.cloneNode(true);
    newProd.querySelector('span').textContent = produto;
    newProd.querySelector('.btn_trash').addEventListener('click', remove);
    prodList.appendChild(newProd);
    prod.value = "";
    qntd.value = "";
    medida.value = "";
}
}

// funcao remover produto
function remove(){
    this.parentNode.remove();
}

// botao add produto
btnAdd.addEventListener('click', addProd);

