using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Avanade.Infra.Data.Migrations
{
    public partial class ColumnStatusAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("5dad7b04-2f7c-4d86-b478-ac9ff118698e"));

            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("aa842aaf-6fb6-47c1-bd8a-d46bea5ad779"));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Temperatures",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("aab594cd-dd3e-4f90-bbc1-93b0f2c03046"), new DateTime(2021, 12, 12, 18, 20, 31, 864, DateTimeKind.Local).AddTicks(9572), "Line 1", 1m, 550m, 450m });

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("a9ef1c1e-a613-48f1-b9bf-36349cb85302"), new DateTime(2021, 12, 12, 18, 20, 31, 866, DateTimeKind.Local).AddTicks(7278), "Line 2", 1m, 140m, 450m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("a9ef1c1e-a613-48f1-b9bf-36349cb85302"));

            migrationBuilder.DeleteData(
                table: "Lines",
                keyColumn: "Id",
                keyValue: new Guid("aab594cd-dd3e-4f90-bbc1-93b0f2c03046"));

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Temperatures");

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("aa842aaf-6fb6-47c1-bd8a-d46bea5ad779"), new DateTime(2021, 12, 10, 14, 12, 36, 61, DateTimeKind.Local).AddTicks(8387), "Line 1", 1m, 550m, 450m });

            migrationBuilder.InsertData(
                table: "Lines",
                columns: new[] { "Id", "CreatedDate", "LineName", "MarginLeft", "MarginTop", "Width" },
                values: new object[] { new Guid("5dad7b04-2f7c-4d86-b478-ac9ff118698e"), new DateTime(2021, 12, 10, 14, 12, 36, 63, DateTimeKind.Local).AddTicks(8185), "Line 2", 1m, 140m, 450m });
        }
    }
}
