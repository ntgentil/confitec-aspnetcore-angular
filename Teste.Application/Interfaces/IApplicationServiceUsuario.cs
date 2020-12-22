using System;
using System.Collections.Generic;
using System.Text;
using Teste.Domain.Models;

namespace Teste.Application.Interfaces
{
    public interface IApplicationServiceUsuario
    {
        void Add(Usuario obj);

        Usuario GetById(int id);

        IEnumerable<Usuario> GetAll();

        void Update(Usuario obj);

        void Remove(Usuario obj);

        void Dispose();

    }
}
