using Teste.Domain.Interfaces.Repositories;
using Teste.Domain.Interfaces.Services;
using Teste.Domain.Models;
using Teste.Domain.Services;

namespace Teste.Domain.Services
{
    public class ServiceUsuario : ServiceBase<Usuario>, IServiceUsuario
    {
        public readonly IRepositoryUsuario _repositoryCliente;

        public ServiceUsuario(IRepositoryUsuario RepositoryUsuario)
            : base(RepositoryUsuario)
        {
            _repositoryCliente = RepositoryUsuario;
        }

    }
}
