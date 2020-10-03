
$(document).ready(function () {
    $("#formCadastro #CPF").inputmask("mask", { "mask": "999.999.999-99" }, { 'autoUnmask': true, 'removeMaskOnSubmit': true });
    $("#formCadastro #CEP").inputmask("mask", { "mask": "99999-999" }, { 'autoUnmask': true, 'removeMaskOnSubmit': true });
    $("#formCadastro #Telefone").inputmask("mask", { "mask": "(99) 9999-99999" }, { 'autoUnmask': true, 'removeMaskOnSubmit': true });

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").inputmask("remove").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").inputmask("remove").val(),
                "CPF": $(this).find("#CPF").inputmask("remove").val()
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
                    console.log(r)
                    ModalDialog("Sucesso!", r, null ,reset);
                 

                }
        });
    })

})

function reset() {
    $("#formCadastro")[0].reset();
    window.location.href = urlRetorno;
}

function prencherEndereco(dados_cep) {
    if (dados_cep) {
        $("#formCadastro #Estado").val(dados_cep.uf),
        $("#formCadastro #Cidade").val(dados_cep.localidade),
        $("#formCadastro #Logradouro").val(dados_cep.logradouro)
    }

}

$("#beneficiarios").click(function () {
    getBeneficiariosModal(urlBeneficiario, listBeneficiarios, obj.Id, ModalDialog);
});



