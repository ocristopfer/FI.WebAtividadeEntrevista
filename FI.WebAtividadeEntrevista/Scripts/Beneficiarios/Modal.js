    function getBeneficiarios(urlBeneficiarioList, listBeneficiarios, idCliente) {
        $.ajax({
            url: urlBeneficiarioList,
            method: "POST",
            data: {
                "idCliente": idCliente,
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
                    listBeneficiarios = r.clientes;
                    contruirHtmlModal(listBeneficiarios);
                    console.log(r)
                    //ModalDialog("Sucesso!", r, redirecionar);

                }
        });
    }

    function contruirHtmlModal(listBeneficiarios) {
        var texto = '<div id="getModalBeneficiario">                                                                                                                    ' +
            '<div class="row">                                                                                                                                  ' +
            '    <div class="col-md-6">                                                                                                                         ' +
            '        <div class="form-group">                                                                                                                   ' +
            '            <label for="CPF">CPF:</label>                                                                                                          ' +
            '            <input required="required" type="text" class="form-control" id="CPF" name="CPF" placeholder="Ex.: 010.011.111-00" maxlength="14">      ' +
            '        </div>                                                                                                                                     ' +
            '        </div>                                                                                                                                     ' +
            '        <div class="col-md-6">                                                                                                                     ' +
            '            <div class="form-group">                                                                                                               ' +
            '                <label for="Nome">Nome:</label>                                                                                                    ' +
            '                <input required="required" type="text" class="form-control" id="Nome" name="Nome" placeholder="Ex.: João" maxlength="50">          ' +
            '        </div>                                                                                                                                     ' +
            '            </div>                                                                                                                                 ' +
            '            <div class="col-md">                                                                                                                   ' +
            '                <div class="pull-right">                                                                                                           ' +
            '                    <button type="submit" class="btn btn-sm btn-success">Incluir</button>                                                          ' +
            '                </div>                                                                                                                             ' +
            '            </div>                                                                                                                                 ' +
            '        </div>                                                                                                                                     ' +
            '        <div class="row">                                                                                                                          ' +
            '            <table id="gridBeneficiarios" class="table"></table>                                                                                   ' +
            '        </div>                                                                                                                                     ' +
            '</div>';
        return texto;
    }

