const API_URL = 'http://localhost:8000'


function buscar_peditar(id){
    fetch(`${API_URL}/compras/${id}`)
        .then(resposta => resposta.json())
        .then(dados => {
            editar_id.value = dados.id;
            editar_item.value = dados.item;
            editar_quantidade.value = dados.quantidade; 
        });
}

function editar(){
    event.preventDefault();
    let dados = {
        item: editar_item.value,
        quantidade: editar_quantidade.value,
    };

    fetch(`${API_URL}/compras/${editar_id.value}`, {
        method:'PATCH',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resposta => resposta.json())
        .then(() => atualizar_lista())

    let x = document.querySelector('[data-bs-dismiss="offcanvas"]');
    x.dispatchEvent(new Event('click'));
}

function inserir(){
    event.preventDefault();

    let dados = {
        item: item.value,
        quantidade: parseInt(quantidade.value),
    };

    fetch(`${API_URL}/compras/`, {
        method:'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resposta => resposta.json())
        .then(resposta => atualizar_lista());

    form_add.reset();
}

async function excluir(id){
    let resposta = confirm('Você tem certeza?');
    if(resposta !== true){
        return;
    }

    await fetch(`${API_URL}/compras/${id}`,{
        method:'DELETE'
    });
    atualizar_lista();
}

function atualizar_lista(){
    tabela_compras.innerHTML = '';
    fetch(`${API_URL}/compras`)
        .then(function(resposta){
            return resposta.json();
        })
        .then(function(lista){
            lista.map(function(cada_item){
                
                tabela_compras.innerHTML += 
                `
                <tr>
                    <td>${cada_item.id}</td>
                    <td>${cada_item.item}</td>
                    <td>${cada_item.quantidade}</td>
                    <td>
                        <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="btn btn-warning btn-control btn-sm" onclick="buscar_peditar(${cada_item.id})">Editar</button>
                        <button class="btn btn-danger btn-control btn-sm" onclick="excluir(${cada_item.id})">Excluir</button>
                    </td>
                </tr>
                `
            })
        })

}
atualizar_lista();