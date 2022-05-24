using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Avanade.Infra.Data.Migrations
{
    public partial class temperatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("fa33cc40-2cc0-4727-9be9-f01aeb4f08af"));

            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("fda5ef60-1438-466c-9343-553f3c9c9e54"));

            migrationBuilder.CreateTable(
                name: "Temperatures",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Degrees = table.Column<decimal>(type: "DECIMAL", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Temperatures", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("aa842aaf-6fb6-47c1-bd8a-d46bea5ad779"), new DateTime(2021, 12, 10, 14, 12, 36, 61, DateTimeKind.Local).AddTicks(8387), "Line 1", 1m, 550m, 450m });

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("5dad7b04-2f7c-4d86-b478-ac9ff118698e"), new DateTime(2021, 12, 10, 14, 12, 36, 63, DateTimeKind.Local).AddTicks(8185), "Line 2", 1m, 140m, 450m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Temperatures");

            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("5dad7b04-2f7c-4d86-b478-ac9ff118698e"));

            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("aa842aaf-6fb6-47c1-bd8a-d46bea5ad779"));

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("fa33cc40-2cc0-4727-9be9-f01aeb4f08af"), new DateTime(2021, 11, 25, 16, 37, 31, 32, DateTimeKind.Local).AddTicks(1570), "Line 1", 1m, 550m, 450m });

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("fda5ef60-1438-466c-9343-553f3c9c9e54"), new DateTime(2021, 11, 25, 16, 37, 31, 36, DateTimeKind.Local).AddTicks(5589), "Line 2", 1m, 140m, 450m });
        }
    }
}
