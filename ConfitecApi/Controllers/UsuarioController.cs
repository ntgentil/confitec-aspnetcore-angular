using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Teste.Application.Interfaces;
using Teste.Domain.Models;

namespace ConfitecApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {

        private readonly IApplicationServiceUsuario _applicationServiceUsuario;


        public UsuarioController(IApplicationServiceUsuario ApplicationServiceUsuario)
        {
            _applicationServiceUsuario = ApplicationServiceUsuario;
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return Ok(_applicationServiceUsuario.GetAll());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return Ok(_applicationServiceUsuario.GetById(id));
        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody] Usuario model)
        {
            try
            {
                if (model == null)
                    return NotFound();

                _applicationServiceUsuario.Add(model);
                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public ActionResult Put([FromBody] Usuario model, int id)
        {
            try
            {
                if (model == null)
                    return NotFound();

                model.Id = id;
                _applicationServiceUsuario.Update(model);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var model = _applicationServiceUsuario.GetById(id);
                if (model == null)
                    return NotFound();

                _applicationServiceUsuario.Remove(model);
                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
