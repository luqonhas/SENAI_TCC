using Avanade.Domain.Entities;
using Flunt.Notifications;
using Microsoft.EntityFrameworkCore;

namespace Avanade.Infra.Data.Contexts
{
    public class AvanadeContext : DbContext
    {
        public AvanadeContext(DbContextOptions<AvanadeContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Alert> Alerts { get; set; }
        public DbSet<Line> Lines { get; set; }
        public DbSet<Temperature> Temperatures { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<Notification>();

            #region Users
                // Adding Table Name
                modelBuilder.Entity<User>().ToTable("Users");

                // Adding Id
                modelBuilder.Entity<User>().Property(x => x.Id);

                // Adding Name
                modelBuilder.Entity<User>().Property(x => x.Name).HasColumnType("VARCHAR(50)");
                modelBuilder.Entity<User>().Property(x => x.Name).HasMaxLength(50);

                // Adding Email
                modelBuilder.Entity<User>().Property(x => x.Email).HasColumnType("VARCHAR(60)");
                modelBuilder.Entity<User>().Property(x => x.Email).HasMaxLength(60);
                modelBuilder.Entity<User>().Property(x => x.Email).IsRequired();
                modelBuilder.Entity<User>().HasIndex(x => x.Email).IsUnique();

                // Adding Password
                modelBuilder.Entity<User>().Property(x => x.Password).HasColumnType("VARCHAR(60)");
                modelBuilder.Entity<User>().Property(x => x.Password).HasMaxLength(60);
                modelBuilder.Entity<User>().Property(x => x.Password).IsRequired();

                // Adding CreatedDate
                modelBuilder.Entity<User>().Property(x => x.CreatedDate).HasColumnType("DATETIME");
                modelBuilder.Entity<User>().Property(x => x.CreatedDate).HasDefaultValueSql("GETDATE()");
            #endregion

            #region Alerts
            // Adding Table Name
            modelBuilder.Entity<Alert>().ToTable("Alerts");

            // Adding Id
            modelBuilder.Entity<Alert>().Property(x => x.Id);

            // Adding Description
            modelBuilder.Entity<Alert>().Property(x => x.Description).HasColumnType("VARCHAR(80)");
            modelBuilder.Entity<Alert>().Property(x => x.Description).HasMaxLength(80);

            //Adding amount of people
            modelBuilder.Entity<Alert>().Property(x => x.AmountOfPeople).IsRequired();

            // Adding CreatedDate
            modelBuilder.Entity<Alert>().Property(x => x.CreatedDate).HasColumnType("DATETIME");
            modelBuilder.Entity<Alert>().Property(x => x.CreatedDate).HasDefaultValueSql("GETDATE()");
            #endregion

            #region Lines

            // --- columns ---

            // LineName
            modelBuilder.Entity<Line>().Property(x => x.LineName).IsRequired();
            modelBuilder.Entity<Line>().Property(x => x.LineName).HasColumnType("VARCHAR(100)");
            modelBuilder.Entity<Line>().Property(x => x.LineName).HasMaxLength(100);
            modelBuilder.Entity<Line>().HasIndex(x => x.LineName).IsUnique();

            // Width
            modelBuilder.Entity<Line>().Property(x => x.Width).IsRequired();
            modelBuilder.Entity<Line>().Property(x => x.Width).HasColumnType("DECIMAL");

            // MarginTop
            modelBuilder.Entity<Line>().Property(x => x.MarginTop).IsRequired();
            modelBuilder.Entity<Line>().Property(x => x.MarginTop).HasColumnType("DECIMAL");

            // MarginLeft
            modelBuilder.Entity<Line>().Property(x => x.MarginLeft).IsRequired();
            modelBuilder.Entity<Line>().Property(x => x.MarginLeft).HasColumnType("DECIMAL");

            // CreatedDate
            modelBuilder.Entity<Line>().Property(x => x.CreatedDate).HasDefaultValueSql("getdate()");

            // --- data ---
            modelBuilder.Entity<Line>().HasData(
                new Line("Line 1", 450, 550, 1),
                new Line("Line 2", 450, 140, 1)
            );

            #endregion

            #region Temperatures
            // Adding Table Name
            modelBuilder.Entity<Temperature>().ToTable("Temperatures");

            // Adding Id
            modelBuilder.Entity<Temperature>().Property(x => x.Id);

            // Adding Degrees
            modelBuilder.Entity<Temperature>().Property(x => x.Degrees).IsRequired();
            modelBuilder.Entity<Temperature>().Property(x => x.Degrees).HasColumnType("DECIMAL");

            // Adding Status
            modelBuilder.Entity<Temperature>().Property(x => x.Status).IsRequired();

            // Adding CreatedDate
            modelBuilder.Entity<Temperature>().Property(x => x.CreatedDate).HasDefaultValueSql("GETDATE()");
            #endregion

            base.OnModelCreating(modelBuilder);
        }

    }
}
