using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    /// <inheritdoc />
    public partial class OnDeleteClientCascadeAndCreatedAuctionCommentsAndBids : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuctionCategories_AuctionCategories_ParentKey",
                table: "AuctionCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Auctions_IdentityUsers_CreatorKey",
                table: "Auctions");

            migrationBuilder.CreateTable(
                name: "AutctionComments",
                columns: table => new
                {
                    Key = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthorKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuctionKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubmitTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutctionComments", x => x.Key);
                    table.ForeignKey(
                        name: "FK_AutctionComments_Auctions_AuctionKey",
                        column: x => x.AuctionKey,
                        principalTable: "Auctions",
                        principalColumn: "Key");
                    table.ForeignKey(
                        name: "FK_AutctionComments_IdentityUsers_AuthorKey",
                        column: x => x.AuthorKey,
                        principalTable: "IdentityUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Bids",
                columns: table => new
                {
                    Key = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuyerKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuctionKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    SubmitTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bids", x => x.Key);
                    table.ForeignKey(
                        name: "FK_Bids_Auctions_AuctionKey",
                        column: x => x.AuctionKey,
                        principalTable: "Auctions",
                        principalColumn: "Key");
                    table.ForeignKey(
                        name: "FK_Bids_IdentityUsers_BuyerKey",
                        column: x => x.BuyerKey,
                        principalTable: "IdentityUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutctionComments_AuctionKey",
                table: "AutctionComments",
                column: "AuctionKey");

            migrationBuilder.CreateIndex(
                name: "IX_AutctionComments_AuthorKey",
                table: "AutctionComments",
                column: "AuthorKey");

            migrationBuilder.CreateIndex(
                name: "IX_Bids_AuctionKey",
                table: "Bids",
                column: "AuctionKey");

            migrationBuilder.CreateIndex(
                name: "IX_Bids_BuyerKey",
                table: "Bids",
                column: "BuyerKey");

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionCategories_AuctionCategories_ParentKey",
                table: "AuctionCategories",
                column: "ParentKey",
                principalTable: "AuctionCategories",
                principalColumn: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_Auctions_IdentityUsers_CreatorKey",
                table: "Auctions",
                column: "CreatorKey",
                principalTable: "IdentityUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuctionCategories_AuctionCategories_ParentKey",
                table: "AuctionCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Auctions_IdentityUsers_CreatorKey",
                table: "Auctions");

            migrationBuilder.DropTable(
                name: "AutctionComments");

            migrationBuilder.DropTable(
                name: "Bids");

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionCategories_AuctionCategories_ParentKey",
                table: "AuctionCategories",
                column: "ParentKey",
                principalTable: "AuctionCategories",
                principalColumn: "Key",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Auctions_IdentityUsers_CreatorKey",
                table: "Auctions",
                column: "CreatorKey",
                principalTable: "IdentityUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
