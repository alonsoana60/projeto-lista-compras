// Consts
const prod = document.querySelector('#produto');
const qntd = document.querySelector('#qntd');
const medida = document.querySelector('#un_medida');
const btnAdd = document.querySelector('.btn_produto');
const prodList = document.querySelector('.produtos');
const prodTemplate = document.querySelector('.template-lista');
let prodSalvos = [];


// funcao backup conteudo
function saveProd(save){
    if(save){
        const toString = JSON.stringify(save);
        localStorage.setItem("produtos", toString);
    }
}

// funcao recuperar backup
function loadProd (){
    const prodRecuperado = localStorage.getItem("produtos");
    const save = JSON.parse(prodRecuperado);
    return save;
}

// funcao adicionar produto manual
function handleAddProd(){
const produto = prod.value + " " + qntd.value+ " " + medida.value;
    if (produto){
        const novoId = Math.random()*10000;
        const novoProd = {
            id: novoId,
            text: produto,
            checked: false,
        }
    prodSalvos.push(novoProd);
    saveProd(prodSalvos);
    addProd(novoProd);
    prod.value = "";
    qntd.value = "";
    medida.value = "";
}
}

// funcao salvar alteracao de check
function check (){
    const input = this.querySelector("input");
    const id = this.getAttribute("id");
    if (input.checked){
        prodSalvos.forEach(function (produto){
            if (produto.id == id){
                produto.checked = true;
            }
        })
     } else {prodSalvos.forEach(function (produto){
            if (produto.id == id){
                produto.checked = false;
            }
        })
    }
    saveProd(prodSalvos)
}

// funcao adicionar produto
function addProd(adicionarProduto) {
    const newProd = prodTemplate.content.cloneNode(true);
    newProd.querySelector('span').textContent = adicionarProduto.text;
    const input = newProd.querySelector("input");
    const li = newProd.querySelector("li");
    li.setAttribute("id", adicionarProduto.id);
    if(adicionarProduto.checked){
        input.setAttribute("checked", true);
    }
    li.addEventListener("click", check);
    newProd.querySelector('.btn_trash').addEventListener('click', remove);
    prodList.appendChild(newProd);
}

// carregar produtos backup
function setProds(){
    const prods = loadProd();
    if (prods){
        prodSalvos = prods;
        prods.forEach(function (produtos){
            addProd(produtos);
        })
    }
}
setProds();

// funcao remover produto
function remove(){
    const id = this.parentNode.getAttribute("id");
    prodSalvos = prodSalvos.filter(function (produtos){
        return produtos.id != id;
    })
    saveProd(prodSalvos)
    this.parentNode.remove();
}

// botao add produto
btnAdd.addEventListener('click', handleAddProd);
