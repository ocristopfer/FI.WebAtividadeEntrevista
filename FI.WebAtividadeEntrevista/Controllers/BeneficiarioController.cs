using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        

        public ActionResult Index(long idCliente)
        {
            List<BeneficiarioModel> listBeneficiario = new List<BeneficiarioModel>();
            if (idCliente != 0)
            {
                BoBeneficiario bo = new BoBeneficiario();
                int qtd = 0;
                List<Beneficiario> beneficiarios = bo.Pesquisa(idCliente, 0, 0, "Nome", true, out qtd);

                foreach (var item in beneficiarios)
                {
                    var model = new BeneficiarioModel();
                    model.Id = item.Id;
                    model.Nome = item.Nome;
                    model.CPF = item.CPF;
                    model.idCliente = item.idCliente;
                    listBeneficiario.Add(model);

                }

            }

            return View(listBeneficiario);
        }
        
     
        public ActionResult Incluir()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (bo.VerificarExistencia(model.CPF))
                {
                    Response.StatusCode = 400;
                    return Json(string.Join(Environment.NewLine, "CPF já cadastrado na base de dados!"));
                }
                else
                {
                    
                    model.Id = bo.Incluir(new Beneficiario()
                    {      
                        Nome = model.Nome,
                        CPF = model.CPF,
                        idCliente = model.idCliente
                    }); 


                    return Json("Cadastro efetuado com sucesso");
                }
            }
        }

        [HttpPost]
        public ActionResult Validar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (bo.VerificarExistencia(model.CPF))
                {
                    Response.StatusCode = 400;
                    return Json(string.Join(Environment.NewLine, "CPF já cadastrado na base de dados!"));
                }
                else
                {
                    return Json("true");
                }
            }
        }

        [HttpPost]
        public JsonResult Alterar(Beneficiario model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {

                bo.Alterar(new Beneficiario()
                {
                    Id = model.Id,
                    Nome = model.Nome,
                    CPF = model.CPF
                });

                return Json("Cadastro alterado com sucesso");



            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario beneficiario = bo.Consultar(id);
            Models.BeneficiarioModel model = null;

            if (beneficiario != null)
            {
                model = new BeneficiarioModel()
                {
                    Id = beneficiario.Id,
                    Nome = beneficiario.Nome,
                    CPF = beneficiario.CPF
                };


            }

            return View(model);
        }

        [HttpPost]
        public JsonResult Excluir(long id)
        {
            try {
                BoBeneficiario bo = new BoBeneficiario();
                bo.Excluir(id);
                return Json("true");
            }
            catch(Exception ex)
            {
                return Json("false");
            }
            
           
        }

        [HttpPost]
        public JsonResult BeneficiarioListSemPaginacao(long idCliente)
        {
            try
            {
                int qtd = 0;
                List<Beneficiario> clientes = new BoBeneficiario().Pesquisa(idCliente, 0, 0, "Nome",true, out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult BeneficiarioList(long idCliente, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Beneficiario> beneficiarios = new BoBeneficiario().Pesquisa(idCliente, jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = beneficiarios, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}
