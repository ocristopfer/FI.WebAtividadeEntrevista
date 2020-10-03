
$(document).ready(function () {
       console.log(listBeneficiarios ,'dasdasd')
})

$('#modalBeneficiarios').on('click', 'button#beneficiarioIncluir', function (e) {
console.log('disgraça')
})


function getBeneficiariosModal(urlBeneficiario, listBeneficiarios, idCliente, ModalFunction) {
    $.ajax({
        url: urlBeneficiario,
        method: "POST",
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialog('Beneficiario', r, 'modalBeneficiarios', null, getBeneficiarios(idCliente));
               }
    });
}

function getBeneficiarios(idCliente, listBeneficiarios) {
    console.log(idCliente);
    if (idCliente) {
        $.ajax({
            url: urlBeneficiarioList,
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
                        
                    }
                    listBeneficiarios = r.Records;
                    console.log(r)
                   
                }
        });
    }
}