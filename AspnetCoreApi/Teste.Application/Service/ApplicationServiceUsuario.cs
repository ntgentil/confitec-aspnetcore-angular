using System;
using System.Collections.Generic;
using System.Text;
using Teste.Application.Interfaces;
using Teste.Domain.Interfaces.Services;
using Teste.Domain.Models;

namespace Teste.Application.Service
{
    public class ApplicationServiceUsuario : IApplicationServiceUsuario
    {
        private readonly IServiceUsuario _serviceUsuario;

        public ApplicationServiceUsuario(IServiceUsuario ServiceUsuario)

        {
            _serviceUsuario = ServiceUsuario;
        }


        public void Add(Usuario obj)
        {
            _serviceUsuario.Add(obj);
        }

        public void Dispose()
        {
            _serviceUsuario.Dispose();
        }

        public IEnumerable<Usuario> GetAll()
        {
            return _serviceUsuario.GetAll();
        }

        public Usuario GetById(int id)
        {
            return _serviceUsuario.GetById(id);
        }

        public void Remove(Usuario obj)
        {
            _serviceUsuario.Remove(obj);
        }

        public void Update(Usuario obj)
        {
            _serviceUsuario.Update(obj);
        }
    }
}
