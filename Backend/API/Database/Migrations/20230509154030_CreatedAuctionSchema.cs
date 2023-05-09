using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    /// <inheritdoc />
    public partial class CreatedAuctionSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuctionCategories",
                columns: table => new
                {
                    Key = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentKey = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuctionCategories", x => x.Key);
                    table.ForeignKey(
                        name: "FK_AuctionCategories_AuctionCategories_ParentKey",
                        column: x => x.ParentKey,
                        principalTable: "AuctionCategories",
                        principalColumn: "Key",
                        onDelete: ReferentialAction.NoAction,
                        onUpdate: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Auctions",
                columns: table => new
                {
                    Key = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatorKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryKey = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Auctions", x => x.Key);
                    table.ForeignKey(
                        name: "FK_Auctions_AuctionCategories_CategoryKey",
                        column: x => x.CategoryKey,
                        principalTable: "AuctionCategories",
                        principalColumn: "Key",
                        onDelete: ReferentialAction.SetNull,
                        onUpdate: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Auctions_IdentityUsers_CreatorKey",
                        column: x => x.CreatorKey,
                        principalTable: "IdentityUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade,
                        onUpdate: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuctionCategories_ParentKey",
                table: "AuctionCategories",
                column: "ParentKey");

            migrationBuilder.CreateIndex(
                name: "IX_Auctions_CategoryKey",
                table: "Auctions",
                column: "CategoryKey");

            migrationBuilder.CreateIndex(
                name: "IX_Auctions_CreatorKey",
                table: "Auctions",
                column: "CreatorKey");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Auctions");

            migrationBuilder.DropTable(
                name: "AuctionCategories");
        }
    }
}
