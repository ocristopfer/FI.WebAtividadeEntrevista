using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Cliente
    /// </summary>
    public class BeneficiarioModel
    {
        public long Id { get; set; }

        /// <summary>
        /// CPF
        /// </summary>
        [Required(ErrorMessage = "CPF obrigatório")]
        [CustomValidation.CustomValidationCPF(ErrorMessage = "CPF inválido")]
        public string CPF { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// idCliente
        /// </summary>
        [Required]
        public long idCliente { get; set; }

        /// <summary>
        /// Data de Exclusão
        /// </summary>
        public Nullable<DateTime> DtExclusao { get; set; }

    }    
}