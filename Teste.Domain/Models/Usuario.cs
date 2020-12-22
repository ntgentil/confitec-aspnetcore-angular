using System;
using System.Collections.Generic;
using System.Text;

namespace Teste.Domain.Models
{
    public class Usuario : Base
    {
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public DateTime DataCadastro { get; set; }
        public int Escolaridade { get; set; }
    }
}
