using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddProfileReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "ParentKey",
                table: "AuctionCategories",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateTable(
                name: "ProfileReviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false),
                    ReviewerKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TargetKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubmitTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileReviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfileReviews_IdentityUsers_ReviewerKey",
                        column: x => x.ReviewerKey,
                        principalTable: "IdentityUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProfileReviews_IdentityUsers_TargetKey",
                        column: x => x.TargetKey,
                        principalTable: "IdentityUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProfileReviews_ReviewerKey",
                table: "ProfileReviews",
                column: "ReviewerKey");

            migrationBuilder.CreateIndex(
                name: "IX_ProfileReviews_TargetKey",
                table: "ProfileReviews",
                column: "TargetKey");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProfileReviews");

            migrationBuilder.AlterColumn<Guid>(
                name: "ParentKey",
                table: "AuctionCategories",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);
        }
    }
}
