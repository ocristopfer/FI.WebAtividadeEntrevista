
$(document).ready(function () {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").inputmask("unmaskedvalue"),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").inputmask("unmaskedvalue"),
                "CPF": $(this).find("#CPF").inputmask("unmaskedvalue")
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
                function (r) {
                    salvarBeneficario(listBeneficiarios, callbackSucesso, r);  
            }
        });
    })
    
})

function callbackSucesso(r) {
    ModalDialog("Sucesso!", r, null, $("#formCadastro")[0].reset());
}

function prencherEndereco(dados_cep) {
    if (dados_cep) {
        $("#formCadastro #Estado").val(dados_cep.uf),
        $("#formCadastro #Cidade").val(dados_cep.localidade),
        $("#formCadastro #Logradouro").val(dados_cep.logradouro)
    }

}
$("#beneficiarios").click(function () {
    getBeneficiariosModal(urlBeneficiario, listBeneficiarios, 0, ModalDialog);
});