﻿CREATE PROC FI_SP_PesqBeneficiario
	@idCliente bigint
AS
BEGIN
	SELECT * FROM BENEFICIARIOS WHERE IDCLIENTE = @idCliente AND DTEXCLUSAO is NULL
END