using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Avanade.Infra.Data.Migrations
{
    public partial class NewtableAddedLines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Width = table.Column<decimal>(type: "DECIMAL", nullable: false),
                    MarginTop = table.Column<decimal>(type: "DECIMAL", nullable: false),
                    MarginLeft = table.Column<decimal>(type: "DECIMAL", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lines", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lines");
        }
    }
}
