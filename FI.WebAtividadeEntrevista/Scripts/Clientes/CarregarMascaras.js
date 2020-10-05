$(document).ready(function () {
    $("#formCadastro #CPF").inputmask("mask", { "mask": "999.999.999-99" }, { 'autoUnmask': true, 'removeMaskOnSubmit': true });
    $("#formCadastro #CEP").inputmask("mask", { "mask": "99999-999" }, { 'autoUnmask': true, 'removeMaskOnSubmit': true });
    $("#formCadastro #Telefone").inputmask("mask", { "mask": "(99) 9999-99999" }, { 'autoUnmask': true, 'removeMaskOnSubmit': true });
});