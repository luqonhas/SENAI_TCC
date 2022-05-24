using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Avanade.Infra.Data.Migrations
{
    public partial class ColunaUrlImageadicionadaAlerts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("e06875d8-a28f-4349-b1c4-d3aa4362d747"));

            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("facc24bc-cfdf-4dfc-a13d-cc3fb07be761"));

            migrationBuilder.AddColumn<string>(
                name: "UrlImage",
                table: "Alerts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("fa33cc40-2cc0-4727-9be9-f01aeb4f08af"), new DateTime(2021, 11, 25, 16, 37, 31, 32, DateTimeKind.Local).AddTicks(1570), "Line 1", 1m, 550m, 450m });

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("fda5ef60-1438-466c-9343-553f3c9c9e54"), new DateTime(2021, 11, 25, 16, 37, 31, 36, DateTimeKind.Local).AddTicks(5589), "Line 2", 1m, 140m, 450m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("fa33cc40-2cc0-4727-9be9-f01aeb4f08af"));

            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("fda5ef60-1438-466c-9343-553f3c9c9e54"));

            migrationBuilder.DropColumn(
                name: "UrlImage",
                table: "Alerts");

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("e06875d8-a28f-4349-b1c4-d3aa4362d747"), new DateTime(2021, 11, 24, 14, 47, 28, 71, DateTimeKind.Local).AddTicks(2873), "Line 1", 1m, 550m, 450m });

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("facc24bc-cfdf-4dfc-a13d-cc3fb07be761"), new DateTime(2021, 11, 24, 14, 47, 28, 73, DateTimeKind.Local).AddTicks(1326), "Line 2", 1m, 140m, 450m });
        }
    }
}
