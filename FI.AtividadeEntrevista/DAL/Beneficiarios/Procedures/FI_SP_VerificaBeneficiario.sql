﻿CREATE PROC FI_SP_VerificaBeneficiario
	@CPF VARCHAR(14),
	@IDCLIENTE BIGINT
AS
BEGIN
	SELECT 1 FROM BENEFICIARIOS WHERE CPF = @CPF AND IDCLIENTE = @IDCLIENTE AND DTEXCLUSAO is NULL
END