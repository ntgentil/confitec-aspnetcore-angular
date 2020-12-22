using Teste.Data.Context;
using Teste.Domain.Interfaces.Repositories;
using Teste.Domain.Models;

namespace Teste.Data.Repositories
{
    public class RepositoryUsuario : RepositoryBase<Usuario>, IRepositoryUsuario
    {
        private readonly SqlContext _context;
        public RepositoryUsuario(SqlContext Context)
            : base(Context)
        {
            _context = Context;
        }
    }
}
