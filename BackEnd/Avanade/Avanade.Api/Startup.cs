using Avanade.Domain.Handlers.Alerts;
using Avanade.Domain.Handlers.Authentications;
using Avanade.Domain.Handlers.Users;
using Avanade.Domain.Interfaces;
using Avanade.Infra.Data.Contexts;
using Avanade.Infra.Data.Repositories;
using Avanade.Shared.Services;
using Avanade.Shared.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Net;
using Newtonsoft.Json;
using Avanade.Domain.Handlers.Temperatures;
using Avanade.Domain.Handlers.Lines;

namespace Avanade.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IMailService, MailService>();

            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));

            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });

            // Adding CORS
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                    builder => {
                        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                    }
                );
            });

            // Adding Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Avanade.Api", Version = "v1" });
            });

            // Connecting DB
            services.AddDbContext<AvanadeContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services
                .AddAuthentication(options =>
                {
                    // Authentications
                    options.DefaultAuthenticateScheme = "JwtBearer";
                    options.DefaultChallengeScheme = "JwtBearer";
                })

                .AddJwtBearer("JwtBearer", options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // Validations
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("avanade-authentication-key")),
                        ClockSkew = TimeSpan.FromMinutes(30),
                        ValidIssuer = "avanade",
                        ValidAudience = "avanade"
                    };
                });

            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = (int)HttpStatusCode.TemporaryRedirect;
                options.HttpsPort = 5001;
            });

            #region Users
            services.AddTransient<IUserRepository, UserRepository>();

                // commands:
                services.AddTransient<LoginHandle, LoginHandle>();
                services.AddTransient<CreateAccountHandle, CreateAccountHandle>();
                services.AddTransient<DeleteAccountHandle, DeleteAccountHandle>();
                services.AddTransient<UpdateAccountHandle, UpdateAccountHandle>();
                
                // queries:
                services.AddTransient<ListAccountHandle, ListAccountHandle>();
                services.AddTransient<SearchByEmailHandle, SearchByEmailHandle>();
                services.AddTransient<SearchByIdHandle, SearchByIdHandle>();
            #endregion

            #region Alerts
            services.AddTransient<IAlertRepository, AlertRepository>();

            // commands:
            services.AddTransient<CreateAlertHandle, CreateAlertHandle>();

            // queries:
            services.AddTransient<ListAlertHandle, ListAlertHandle>();
            services.AddTransient<ListByOrderHandle, ListByOrderHandle>();

            #endregion

            #region Temperatures

            services.AddTransient<ITemperatureRepository, TemperatureRepository>();
            services.AddTransient<CreateTemperatureHandle, CreateTemperatureHandle>();

            services.AddTransient<ReadTemperaturesHandle, ReadTemperaturesHandle>();
            #endregion

            #region Lines

            services.AddTransient<ILineRepository, LineRepository>();

            services.AddTransient<ReadLinesHandle, ReadLinesHandle>();
            services.AddTransient<EditLinePositionHandle, EditLinePositionHandle>();


            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Avanade.Api v1"));
            }

            app.UseRouting();

            // JWT
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseStaticFiles();

            // Enable CORS
            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
