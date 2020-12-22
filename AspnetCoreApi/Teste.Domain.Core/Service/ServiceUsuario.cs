using Teste.Domain.Core.Interfaces.Repositorys;
using Teste.Domain.Core.Interfaces.Services;
using Teste.Domain.Models;

namespace Teste.Domain.Core.Implements
{
    public class ServiceUsuario : ServiceBase<Usuario>, IServiceUsuario
    {
        public readonly IRepositoryUsuario _repositoryUsuario;

        public ServiceUsuario(IRepositoryUsuario RepositoryUsuario)
            : base(RepositoryUsuario)
        {
            _repositoryUsuario = RepositoryUsuario;
        }

    }
}
