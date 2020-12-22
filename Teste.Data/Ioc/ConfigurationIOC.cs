using Autofac;
using Teste.Application.Interfaces;
using Teste.Application.Service;
using Teste.Data.Repositories;
using Teste.Domain.Interfaces.Repositories;
using Teste.Domain.Interfaces.Services;
using Teste.Domain.Services;

namespace Teste.Data.Ioc
{
    public class ConfigurationIOC
    {
        public static void Load(ContainerBuilder builder)
        {
            #region Registra IOC

            #region IOC Application
            builder.RegisterType<ApplicationServiceUsuario>().As<IApplicationServiceUsuario>();
            #endregion

            #region IOC Services
            builder.RegisterType<ServiceUsuario>().As<IServiceUsuario>();
            #endregion

            #region IOC Repositorys SQL
            builder.RegisterType<RepositoryUsuario>().As<IRepositoryUsuario>();
            #endregion

            #endregion

        }
    }
}
