using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneente
        /// </summary>
        /// <param name="beneente">Objeto de beneente</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario bene = new DAL.DaoBeneficiario();
            return bene.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneente
        /// </summary>
        /// <param name="beneente">Objeto de beneente</param>
        public void Alterar(DML.Beneficiario beneente)
        {
            DAL.DaoBeneficiario bene = new DAL.DaoBeneficiario();
            bene.Alterar(beneente);
        }

        /// <summary>
        /// Consulta o beneente pelo id
        /// </summary>
        /// <param name="id">id do beneente</param>
        /// <returns></returns>
        public DML.Beneficiario Consultar(long id)
        {
            DAL.DaoBeneficiario bene = new DAL.DaoBeneficiario();
            return bene.Consultar(id);
        }

        /// <summary>
        /// Excluir o beneente pelo id
        /// </summary>
        /// <param name="id">id do beneente</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario bene = new DAL.DaoBeneficiario();
            bene.Excluir(id);
        }

        /// <summary>
        /// Lista os beneentes
        /// </summary>
        public List<DML.Beneficiario> Listar()
        {
            DAL.DaoBeneficiario bene = new DAL.DaoBeneficiario();
            return bene.Listar();
        }

        /// <summary>
        /// Lista os beneentes
        /// </summary>
        public List<DML.Beneficiario> Pesquisa(long idCliente, int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoBeneficiario bene = new DAL.DaoBeneficiario();
            return bene.Pesquisa(idCliente,iniciarEm,  quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DAL.DaoBeneficiario bene = new DAL.DaoBeneficiario();
            return bene.VerificarExistencia(CPF);
        }
    }
}
