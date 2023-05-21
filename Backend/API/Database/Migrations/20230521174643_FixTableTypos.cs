using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    /// <inheritdoc />
    public partial class FixTableTypos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutctionComments_Auctions_AuctionKey",
                table: "AutctionComments");

            migrationBuilder.DropForeignKey(
                name: "FK_AutctionComments_IdentityUsers_AuthorKey",
                table: "AutctionComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AutctionComments",
                table: "AutctionComments");

            migrationBuilder.RenameTable(
                name: "AutctionComments",
                newName: "AuctionComments");

            migrationBuilder.RenameIndex(
                name: "IX_AutctionComments_AuthorKey",
                table: "AuctionComments",
                newName: "IX_AuctionComments_AuthorKey");

            migrationBuilder.RenameIndex(
                name: "IX_AutctionComments_AuctionKey",
                table: "AuctionComments",
                newName: "IX_AuctionComments_AuctionKey");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AuctionComments",
                table: "AuctionComments",
                column: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionComments_Auctions_AuctionKey",
                table: "AuctionComments",
                column: "AuctionKey",
                principalTable: "Auctions",
                principalColumn: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionComments_IdentityUsers_AuthorKey",
                table: "AuctionComments",
                column: "AuthorKey",
                principalTable: "IdentityUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuctionComments_Auctions_AuctionKey",
                table: "AuctionComments");

            migrationBuilder.DropForeignKey(
                name: "FK_AuctionComments_IdentityUsers_AuthorKey",
                table: "AuctionComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AuctionComments",
                table: "AuctionComments");

            migrationBuilder.RenameTable(
                name: "AuctionComments",
                newName: "AutctionComments");

            migrationBuilder.RenameIndex(
                name: "IX_AuctionComments_AuthorKey",
                table: "AutctionComments",
                newName: "IX_AutctionComments_AuthorKey");

            migrationBuilder.RenameIndex(
                name: "IX_AuctionComments_AuctionKey",
                table: "AutctionComments",
                newName: "IX_AutctionComments_AuctionKey");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AutctionComments",
                table: "AutctionComments",
                column: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_AutctionComments_Auctions_AuctionKey",
                table: "AutctionComments",
                column: "AuctionKey",
                principalTable: "Auctions",
                principalColumn: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_AutctionComments_IdentityUsers_AuthorKey",
                table: "AutctionComments",
                column: "AuthorKey",
                principalTable: "IdentityUsers",
                principalColumn: "Id");
        }
    }
}
