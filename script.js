const input = document.getElementById("inputTarefa");
const btnAdd = document.getElementById("btnAdd");
const lista = document.getElementById("lista");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar(){
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

        if(tarefa.concluida){
            li.classList.add("concluida");
        }

        li.innerHTML = `
            <span>${tarefa.texto}</span>

            <div class="acoes">
                <button class="btnCheck" onclick="concluir(${index})">✓</button>
                <button class="btnDelete" onclick="remover(${index})">X</button>
            </div>
        `;

        lista.appendChild(li);
    });
}

function adicionar(){
    const texto = input.value.trim();

    if(texto === "") return;

    tarefas.push({
        texto:texto,
        concluida:false
    });

    input.value="";
    salvar();
    renderizar();
}

function concluir(index){
    tarefas[index].concluida = !tarefas[index].concluida;
    salvar();
    renderizar();
}

function remover(index){
    tarefas.splice(index,1);
    salvar();
    renderizar();
}

btnAdd.addEventListener("click", adicionar);

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        adicionar();
    }
});

renderizar();