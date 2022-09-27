function excluir(id){
    fetch('http://localhost:8000/compras/'+id,{
        method:'DELETE'
    });

    tabela_compras.innerHTML = '';
    atualizar_lista();
}

function atualizar_lista(){

    fetch('http://localhost:8000/compras')
        .then(function(resposta){
            return resposta.json();
        })
        .then(function(lista){
            lista.map(function(cada_item){
                
                tabela_compras.innerHTML += 
                `
                <tr>
                    <td>
                    ${cada_item.id}
                    </td>
                    <td>
                    ${cada_item.item}
                    </td>
                    <td>
                    ${cada_item.quantidade}
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="excluir(${cada_item.id})">Excluir(${cada_item.id})</button>
                    </td>
                </tr>
                `
            })
        })

}
atualizar_lista();