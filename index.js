function inserir(){
    event.preventDefault();

    let dados = {
        item: item.value,
        quantidade: parseInt(quantidade.value),
    };

    fetch('http://localhost:8000/compras/', {
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

    await fetch('http://localhost:8000/compras/'+id,{
        method:'DELETE'
    });
    atualizar_lista();
}

function atualizar_lista(){
    tabela_compras.innerHTML = '';
    fetch('http://localhost:8000/compras')
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
                        <button class="btn btn-warning btn-control btn-sm" onclick="editar()">Editar</button>
                        <button class="btn btn-danger btn-control btn-sm" onclick="excluir(${cada_item.id})">Excluir</button>
                    </td>
                </tr>
                `
            })
        })

}
atualizar_lista();