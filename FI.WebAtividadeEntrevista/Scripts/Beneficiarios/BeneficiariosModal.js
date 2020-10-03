
$(document).ready(function () {
    console.log('bene', listBeneficiarios)
})


$("body").on("click", ".beneficiarioExcluir", function () {
    var elemento = $(this).closest("tr")
    if (this.value) {
        listBeneficiarios = listBeneficiarios.filter(item => item.Id !== this.value)
        $.ajax({
            url: urlBeneficiarioExcluir,
            method: "POST",
            data: {
                id: this.value,
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
                    console.log('remove')
                    elemento.remove();
                }
        });
    } else {
        console.log($(this).closest('tr').children('td:eq(0)').text().replace(/\D/g, ''));
        listBeneficiarios = listBeneficiarios.filter(item => item.CPF !== $(this).closest('tr').children('td:eq(0)').text().replace(/\D/g, ''))
        $(this).closest("tr").remove();
    }
    
});

$("body").on("click", "#beneficiarioEditar", function () {
    console.log('editar')
    console.log(this.value)
});

$("body").on("click", "#beneficiarioIncluir", function () {
    console.log(listBeneficiarios)
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
                console.log(r)
                if (r) {

                    beneficiario = {
                        Id: null,
                        CPF: $('#Beneficiario_CPF').inputmask("unmaskedvalue"),
                        Nome: $('#Beneficiario_Nome').val(),
                        idCliente: _idCliente
                    }

                    var find = listBeneficiarios.find(x => x.CPF === beneficiario.CPF)

                    console.log(find)
                    if (find) {
                        ModalDialog("Ocorreu um erro", "Beneficiário já foi incluido a lista.");
                    } else {
                        listBeneficiarios.push(beneficiario);
                        adicionarALista(beneficiario);
                    }
                           

                }
                //ModalDialog('Beneficiario', r, 'modalBeneficiarios', null, getBeneficiarios(_idCliente, listBeneficiarios));
            }
    });
});



function salvarBeneficario(lista, callbackFuction) {
    lista.forEach(element => {
        console.log(element);
        if (element.Id == null) {

            $.ajax({
                url: urlBeneficiarioIncluir,
                method: "POST",
                data: {
                    idCliente: element.idCliente,
                    Nome: element.Nome,
                    CPF: element.CPF
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
                        if (callbackFuction) {
                            callbackFuction();
                        }
                        
                        // ModalDialog("Sucesso!", r, null);
                    }
            });
        }

    });
}

function adicionarALista(beneficiario) {

    var texto = '<tr id="beneficiario_' + beneficiario.Id + '">                                         ' +
        '<td width="200" class="mascaraCPF">' + $('#Beneficiario_CPF').val() + '</td >                  ' +
        '<td width="200">' + beneficiario.Nome + '</td >                                                ' +
        '<td>                                                                                           ' +
        '   <button id="" type="button" class="btn btn-primary beneficiarioEditar">Editar</button>     ' +
        '   <button id="" type="button" class="btn btn-primary beneficiarioExcluir">Excluir</button>   ' +
        '</td>                                                                                          ' +
        '            </tr >                                                                             ';
    $('#gridBeneficiarios > tbody:last-child').append(texto);
       console.log(listBeneficiarios)
}

function getBeneficiariosModal(urlBeneficiario, listBeneficiarios, idCliente, ModalFunction) {
    _idCliente = idCliente;
    _listBeneficiarios = listBeneficiarios;

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
                ModalDialog('Beneficiario', r, 'modalBeneficiarios', null, callBack);
            }
    });
    
 


}
function callBack() {
    $("#modalBeneficiarios .mascaraCPF").inputmask("mask", { "mask": "999.999.999-99" }, { 'autoUnmask': true, 'removeMaskOnSubmit': true });
    console.log(_idCliente, listBeneficiarios);
    // getBeneficiarios(_idCliente, _listBeneficiarios)
}

function getBeneficiarios(idCliente, listBeneficiarios) {

    console.log(idCliente);
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