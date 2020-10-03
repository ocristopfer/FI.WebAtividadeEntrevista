/**
 * Função que busca um endereço por CEP.
 * 
 * É necessário ter o JQuery para uso dessa função;
 * @param {*} cep 
 * O Cep a ser buscado 
 * @param {*} funcao_sucesso 
 * Função de callback que será acionado quando a busca for concluida
 */
function buscarCep(cep, funcao_sucesso) {
    console.log(cep)
    cep = cep.toString().replace('-', '');
    if (cep.length == 8) {
        $.get("https://viacep.com.br/ws/" + cep + "/json/",
            function (data) {
                if (data) {
                    funcao_sucesso(data);
                } else {
                    funcao_sucesso(null);
                }
            });
    } else {
        funcao_sucesso(null);
    }

}