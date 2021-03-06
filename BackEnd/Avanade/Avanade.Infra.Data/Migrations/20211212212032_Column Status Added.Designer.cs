// <auto-generated />
using System;
using Avanade.Infra.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Avanade.Infra.Data.Migrations
{
    [DbContext(typeof(AvanadeContext))]
    [Migration("20211212212032_Column Status Added")]
    partial class ColumnStatusAdded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Avanade.Domain.Entities.Alert", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AmountOfPeople")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("DATETIME")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<string>("Description")
                        .HasMaxLength(80)
                        .HasColumnType("VARCHAR(80)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("UrlImage")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Alerts");
                });

            modelBuilder.Entity("Avanade.Domain.Entities.Line", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("LineName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("VARCHAR(100)");

                    b.Property<decimal>("MarginLeft")
                        .HasColumnType("DECIMAL");

                    b.Property<decimal>("MarginTop")
                        .HasColumnType("DECIMAL");

                    b.Property<decimal>("Width")
                        .HasColumnType("DECIMAL");

                    b.HasKey("Id");

                    b.HasIndex("LineName")
                        .IsUnique();

                    b.ToTable("Lines");

                    b.HasData(
                        new
                        {
                            Id = new Guid("aab594cd-dd3e-4f90-bbc1-93b0f2c03046"),
                            CreatedDate = new DateTime(2021, 12, 12, 18, 20, 31, 864, DateTimeKind.Local).AddTicks(9572),
                            LineName = "Line 1",
                            MarginLeft = 1m,
                            MarginTop = 550m,
                            Width = 450m
                        },
                        new
                        {
                            Id = new Guid("a9ef1c1e-a613-48f1-b9bf-36349cb85302"),
                            CreatedDate = new DateTime(2021, 12, 12, 18, 20, 31, 866, DateTimeKind.Local).AddTicks(7278),
                            LineName = "Line 2",
                            MarginLeft = 1m,
                            MarginTop = 140m,
                            Width = 450m
                        });
                });

            modelBuilder.Entity("Avanade.Domain.Entities.Temperature", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<decimal>("Degrees")
                        .HasColumnType("DECIMAL");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Temperatures");
                });

            modelBuilder.Entity("Avanade.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("DATETIME")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("VARCHAR(60)");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("VARCHAR(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("VARCHAR(60)");

                    b.Property<int>("UserType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
