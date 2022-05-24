using Avanade.Domain.Commands.Alerts;
using Avanade.Domain.Entities;
using Avanade.Domain.Interfaces;
using Avanade.Shared.Commands;
using Avanade.Shared.Enums;
using Avanade.Shared.Handlers.Contracts;
using Avanade.Shared.Services;
using Avanade.Shared.Utils;
using Azure.Storage.Blobs;
using Flunt.Notifications;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace Avanade.Domain.Handlers.Alerts
{
    public class CreateAlertHandle : Notifiable<Notification>, IHandlerCommand<CreateAlertCommand>
    {
        private readonly IAlertRepository _alertRepository;

        private readonly IMailService _mailService;

        private readonly IUserRepository _userRepository;
        public CreateAlertHandle(IAlertRepository alertRepository, IMailService mailService, IUserRepository userRepository)
        {
            _alertRepository = alertRepository;
            _mailService = mailService;
            _userRepository = userRepository;
        }

        public ICommandResult Handler(CreateAlertCommand command)
        {
            string urlImage = "";

            if (!command.IsValid)
                return new GenericCommandResult(false, "Correctly enter alert data", command.Notifications);

            if (command.Imagem != null)
            {
                // Nome do arquivo recebido
                
                var nomeArquivo = Upload.SalvarImagem(command.Imagem);

                var fileName = Guid.NewGuid().ToString() + "jpg";

                // Imagem em base64
                //string fileInBase64 = Convert.ToBase64String(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot/upload/imagens", nomeArquivo)));

                //var data = new Regex(@"^data:image\/[a-z]+;base64,").Replace(fileInBase64, "");

                byte[] imageBytes = System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot/upload/imagens", nomeArquivo));

                var blobClient = new BlobClient("DefaultEndpointsProtocol=https;AccountName=storagefilesgoodye;AccountKey=9sco9ZYl2WC9hfNVdHuxbpIoJjTrHckCHx1lAe1eIP8uwWnSzAmGPAEQVYe4Bew7p752LuGK3DRjFDsfN2n+lg==;EndpointSuffix=core.windows.net", "frames", fileName);

                using (var stream = new MemoryStream(imageBytes))
                {
                    blobClient.Upload(stream);
                }

                urlImage = blobClient.Uri.AbsoluteUri;
            }

            switch (command.AmountOfPeople)
            {
                case 1:
                    command.UpdateDescription("Há 1 pessoa na área de risco!");

                    Notification_.SendMobileNotification("Seguro", command.ReturnDescription(), urlImage);

                    command.UpdateStatus(EnAlertStatus.Safe);

                    break;

                case > 1 and <= 3:
                    command.UpdateDescription("Há " + command.AmountOfPeople + " pessoas na área de risco!");
                    
                    Notification_.SendMobileNotification("Seguro", command.ReturnDescription(), urlImage);
                    
                    command.UpdateStatus(EnAlertStatus.Safe);
                    
                    break;

                case > 3 and <= 7:
                    command.UpdateDescription("Há " + command.AmountOfPeople + " pessoas na área de risco!");

                    Notification_.SendMobileNotification("Cuidado", command.ReturnDescription(), urlImage);
                    
                    command.UpdateStatus(EnAlertStatus.Caution);
                    
                    break;

                case > 7:
                    command.UpdateDescription("Há " + command.AmountOfPeople + " pessoas na área de risco!");

                    Notification_.SendMobileNotification("Perigo", command.ReturnDescription(), urlImage);
                    
                    command.UpdateStatus(EnAlertStatus.Danger);
                    
                    break;

                default:
                    command.UpdateDescription("Há pessoas na área de risco!");

                    Notification_.SendMobileNotification("Invasão", command.ReturnDescription(), urlImage);
                    
                    command.UpdateStatus(EnAlertStatus.Caution);
                    
                    break;
            }

            Alert newAlert = new Alert(command.ReturnDescription(), command.ReturnStatus(), command.AmountOfPeople, urlImage);

            if (!newAlert.IsValid)
                return new GenericCommandResult(false, "Invalid alert data", newAlert.Notifications);
            
            _alertRepository.Create(newAlert);

            // send email to all registered users
            var users = _userRepository.List();

            foreach (var item in users)
            {
                _mailService.SendAlertEmail(item.Email, command.AmountOfPeople);
            }
            
            return new GenericCommandResult(true, "Alert created successfully!", "Alert Created!");
        }
    }
}
