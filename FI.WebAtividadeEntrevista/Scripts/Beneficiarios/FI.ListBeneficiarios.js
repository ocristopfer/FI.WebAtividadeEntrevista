
$(document).ready(function () {
    
    console.log(listBeneficiarios ,'dasdasd')
})

function sera() {
    console.log('sera')
}

$("#Beneficiario_Incluir").click(function () {
    console.log('sera')
    Aler('uhul')
    //getBeneficiarios(urlBeneficiario, listBeneficiario, obj.Id, ModalDialog);

});


function getBeneficiarios(urlBeneficiarioList, listBeneficiarios, idCliente, ModalFunction) {
    $.ajax({
        url: urlBeneficiarioList,
        method: "POST",
        data: {
            "idCliente": idCliente,
        },
        error:
            function (r) {
                /*if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");*/
            },
        success:
            function (r) {
                ModalDialog('Beneficiario', r)
                console.log(r)
                //console.log(r.Records);
                //contruirHtmlModal(r.Records, ModalFunction);
                //ModalDialog("Sucesso!", r, redirecionar);

            }
    });
}

function contruirHtmlModal(listBeneficiarios, ModalFunction) {
    
    var texto = '<div id="getModalBeneficiario">                                                                                                                    ' +
        '<div class="row">                                                                                                                                  ' +
        '    <div class="col-md-5">                                                                                                                         ' +
        '        <div class="form-group">                                                                                                                   ' +
        '            <label for="CPF">CPF:</label>                                                                                                          ' +
        '            <input required="required" type="text" class="form-control" id="CPF" name="CPF" placeholder="Ex.: 010.011.111-00" maxlength="14">      ' +
        '        </div>                                                                                                                                     ' +
        '        </div>                                                                                                                                     ' +
        '        <div class="col-md-5">                                                                                                                     ' +
        '            <div class="form-group">                                                                                                               ' +
        '                <label for="Nome">Nome:</label>                                                                                                    ' +
        '                <input required="required" type="text" class="form-control" id="Nome" name="Nome" placeholder="Ex.: João" maxlength="50">          ' +
        '        </div>                                                                                                                                     ' +
        '            </div>                                                                                                                                 ' +
        '            <div class="col-md-5">                                                                                                                   ' +
        '                <div class="pull-right">                                                                                                           ' +
        '                    <button type="submit" class="btn btn-sm btn-success">Incluir</button>                                                          ' +
        '                </div>                                                                                                                             ' +
        '            </div>                                                                                                                                 ' +
        '        </div>                                                                                                                                     ' +
        '        <div class="row">                                                                                                                          ' +
        '        <table id="gridBeneficiarios" class="table"> ' +
        '   <thead> ' +
        '       <tr>' +
        '   <th>CPF</th>' +
        '   <th>Nome</th>' +
        '   </tr>' +
        '</thead>' +
        '<tbody>';

    if (listBeneficiarios.length > 0) {
        listBeneficiarios.forEach(element => {
            console.log(element);
        });
    }

    texto += '<tbody>' +
        '</table > ' +
        '    </div>                                                                                                                                     ' +
        '</div>';
    ModalFunction('Beneficiarios', texto);
}