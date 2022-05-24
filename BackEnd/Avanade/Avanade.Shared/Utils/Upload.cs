using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Shared.Utils
{
    public static class Upload
    {
        public static string SalvarImagem(IFormFile imagem)
        {
            var nomeArquivo = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(imagem.FileName);

            var caminhoArquivo = Path.Combine(Directory.GetCurrentDirectory(), @"wwwRoot/upload/imagens", nomeArquivo);

            // Crio um objeto do tipo FileStream passando o caminho do arquivo
            // Passa para criar este arquivo
            using var streamImagem = new FileStream(caminhoArquivo, FileMode.Create);

            // Copia a imagem para o local informado
            imagem.CopyTo(streamImagem);

            return nomeArquivo;
        }
    }
}
