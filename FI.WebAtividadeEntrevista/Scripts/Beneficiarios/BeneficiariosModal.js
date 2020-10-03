
$(document).ready(function () {
    var _idCliente;
    console.log('bene', listBeneficiarios)
})


$("body").on("click", "#beneficiarioIncluir", function () {

    var find = listBeneficiarios.find(x => x.CPF === $('#Beneficiario_CPF').inputmask("unmaskedvalue"))
    if (find) {
        ModalDialog("Ocorreu um erro", "Beneficiário detentor do CPF: " + $('#Beneficiario_CPF').val() + " já existe na lista.");
        return;
    }

    $.ajax({
        url: urlBeneficiarioValidar,
        method: "POST",
        data: {
            idCliente: _idCliente,
            Nome: $('#Beneficiario_Nome').val(),
            CPF: $('#Beneficiario_CPF').inputmask("unmaskedvalue")
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
                if (r) {

                    beneficiario = {
                        Id: null,
                        CPF: $('#Beneficiario_CPF').inputmask("unmaskedvalue"),
                        Nome: $('#Beneficiario_Nome').val(),
                        idCliente: _idCliente
                    }
                    listBeneficiarios.push(beneficiario);
                    adicionarALista(beneficiario);
                }
            }
    });
});


$("body").on("click", ".beneficiarioExcluir", function () {
    if (this.value) {
        listBeneficiarios.forEach(element => {
            if (element.Id === parseInt(this.value)) {
                element.dtExclusao = new Date().toJSON();
            }
        });
        $(this).closest("tr").remove();


    } else {
        listBeneficiarios = listBeneficiarios.filter(item => item.CPF !== $(this).closest('tr').children('td:eq(0)').text().replace(/\D/g, ''))
        $(this).closest("tr").remove();
    }

});

var elementoHtml = null;
var id;
var cpf;
var nome;

$("body").on("click", ".beneficiarioSalvar", function () {
    elementoHtml = $(this).closest('tr');
    var find = listBeneficiarios.find(x => x.CPF === cpf)
    if (find != undefined && find.Id != id) {
        ModalDialog("Ocorreu um erro", "Beneficiário detentor do CPF: " + cpf + " já existe na lista.");
        return;
    }

    cpf = $('#edicaoCPF').inputmask("unmaskedvalue");
    nome = $('#edicaoNome').val();

    alterarRow(elementoHtml, false);

    listBeneficiarios.forEach(element => {
        if (element.Id === parseInt(id)) {
            element.CPF = cpf;
            element.Nome = nome;
        }
    });
    
});


$("body").on("click", ".beneficiarioEditar", function () {
    elementoHtml = $(this).closest('tr');
    alterarRow(elementoHtml, true);

});

function alterarRow(elementoHtml, modoEdicao = false) {
    if (modoEdicao) {
        elementoHtml.children('td:eq(3)').children('.beneficiarioEditar').hide()
        elementoHtml.children('td:eq(3)').children('.beneficiarioSalvar').show()

        id = elementoHtml.children('td:eq(0)').text().trim();
        cpf = elementoHtml.children('td:eq(1)').text().replace(/\D/g, '').trim();
        nome = elementoHtml.children('td:eq(2)').text().trim();

        elementoHtml.children('td:eq(1)').html('<input id="edicaoCPF" type="text" class="form-control" value="' + cpf + '" maxlength="14"> </input>')
        elementoHtml.children('td:eq(2)').html('<input id="edicaoNome" type="text" class="form-control" value="' + nome + '" maxlength="50"> </input>')
        $("#modalBeneficiarios #edicaoCPF").inputmask("mask", { "mask": "999.999.999-99" }, { 'autoUnmask': true, 'removeMaskOnSubmit': true });
    } else {
        elementoHtml.children('td:eq(1)').html()
        elementoHtml.children('td:eq(2)').html()
        elementoHtml.children('td:eq(1)').text($('#edicaoCPF').val())
        elementoHtml.children('td:eq(2)').text($('#edicaoNome').val())
        elementoHtml.children('td:eq(3)').children('.beneficiarioSalvar').hide();
        elementoHtml.children('td:eq(3)').children('.beneficiarioEditar').show();
    }
}



function salvarBeneficario(lista, callbackFuction, callBackParametro) {
    var url;
    lista.forEach(element => {

        if (element.Id == null) {
            element.Id = 0;
            url = urlBeneficiarioIncluir;
        } else {
            url = urlBeneficiarioAlterar;
        }

        $.ajax({
            url: url,
            method: "POST",
            data: {
                Id: element.Id,
                Nome: element.Nome,
                CPF: element.CPF,
                idCliente: element.idCliente,
                dtExclusao: element.dtExclusao
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
               
                }
        });


    });

    if (callbackFuction) {
        callbackFuction(callBackParametro);
    }
}

function adicionarALista(beneficiario) {
    
    var texto = '<tr id="beneficiario_' + beneficiario.Id + '">                                         ' +
        '<td style="display:none" value="' + beneficiario.Id + '">' + beneficiario.Id + '</td> ' +
        '<td width="200" class="mascaraCPF">' + $('#Beneficiario_CPF').val() + '</td >                  ' +
        '<td width="200">' + beneficiario.Nome + '</td >                                                ' +
        '<td>                                                                                           ' +
        '   <button id="" type="button" class="btn btn-primary beneficiarioEditar">Editar</button>      ' +
        '   <button id="" type="button" class="btn btn-primary beneficiarioSalvar" style="display:none>Salvar</button>      ' +
        '   <button id="" type="button" class="btn btn-primary beneficiarioExcluir">Excluir</button>    ' +
        '</td>                                                                                          ' +
        '            </tr >                                                                             ';

    $('#gridBeneficiarios > tbody:last-child').append(texto);

}

function getBeneficiariosModal(urlBeneficiario, listBeneficiarios, idCliente, ModalFunction) {
    _idCliente = idCliente
    $.ajax({
        url: urlBeneficiario,
        method: "POST",
        data: {
            idCliente: idCliente
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
                ModalDialog('Beneficiario', r, 'modalBeneficiarios', closeModalFunction, reaplicarMascara);
            }
    });

}

function closeModalFunction() {
    if (elementoHtml != null) {
        alterarRow(elementoHtml)
    }
}

function reaplicarMascara() {
    $("#modalBeneficiarios .mascaraCPF").inputmask("mask", { "mask": "999.999.999-99" }, { 'autoUnmask': true, 'removeMaskOnSubmit': true });
}

function getBeneficiarios(idCliente, listBeneficiarios) {
    if (idCliente) {
        $.ajax({
            url: urlBeneficiarioList + '?idCliente=' + idCliente,
            method: "POST",
            data: {
                idCliente: idCliente
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
                    if (r.Records) {
                        listBeneficiarios = [];
                        r.Records.forEach(element => {
                            element['status'] = 0;
                            listBeneficiarios.push(element);
                        });
                        console.log(listBeneficiarios);
                    }

                }
        });
    }
}