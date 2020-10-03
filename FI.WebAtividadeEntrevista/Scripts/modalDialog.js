function ModalDialog(titulo, texto, nomeModal, closeFunction, startFunction) {
    var random = Math.random().toString().replace('.', '');
    if (nomeModal) {
        random = nomeModal;
    }
    
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                            ';

    $('body').append(texto);
    $('#' + random).modal({ backdrop: 'static', keyboard: false });

    if (startFunction != null) {
        $('#' + random).on('shown.bs.modal', function (e) {
            startFunction();
        })
    }

    if (closeFunction != null) {
        $('#' + random).on('hidden.bs.modal', function (e) {
            closeFunction();
         });
    }
    
}

