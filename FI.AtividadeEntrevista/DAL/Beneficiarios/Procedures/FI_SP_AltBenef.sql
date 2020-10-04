﻿CREATE PROC FI_SP_AltBenef
    @NOME          VARCHAR (50),
	@CPF           VARCHAR (11),
	@DTEXCLUSAO DATETIME = null,
	@ID			BIGINT
AS
BEGIN
	UPDATE BENEFICIARIOS 
	SET 
		CPF = @CPF,
		NOME = @NOME,
		DTEXCLUSAO = @DTEXCLUSAO
	WHERE ID = @ID
END