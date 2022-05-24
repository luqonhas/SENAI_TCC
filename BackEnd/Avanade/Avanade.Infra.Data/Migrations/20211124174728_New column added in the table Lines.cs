using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Avanade.Infra.Data.Migrations
{
    public partial class NewcolumnaddedinthetableLines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LineName",
                table: "Lines",
                type: "VARCHAR(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("e06875d8-a28f-4349-b1c4-d3aa4362d747"), new DateTime(2021, 11, 24, 14, 47, 28, 71, DateTimeKind.Local).AddTicks(2873), "Line 1", 1m, 550m, 450m });

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("facc24bc-cfdf-4dfc-a13d-cc3fb07be761"), new DateTime(2021, 11, 24, 14, 47, 28, 73, DateTimeKind.Local).AddTicks(1326), "Line 2", 1m, 140m, 450m });

            migrationBuilder.CreateIndex(
                name: "IX_Lines_LineName",
                table: "Lines",
                column: "LineName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Lines_LineName",
                table: "Lines");

            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("e06875d8-a28f-4349-b1c4-d3aa4362d747"));

            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("facc24bc-cfdf-4dfc-a13d-cc3fb07be761"));

            migrationBuilder.DropColumn(
                name: "LineName",
                table: "Lines");
        }
    }
}
