using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    /// <inheritdoc />
    public partial class changeTicketsName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupportMessage_IdentityUsers_SenderId",
                table: "SupportMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_SupportMessage_Ticket_TicketId",
                table: "SupportMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_IdentityUsers_UserId",
                table: "Ticket");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ticket",
                table: "Ticket");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SupportMessage",
                table: "SupportMessage");

            migrationBuilder.RenameTable(
                name: "Ticket",
                newName: "SupportTickets");

            migrationBuilder.RenameTable(
                name: "SupportMessage",
                newName: "SupportMessages");

            migrationBuilder.RenameIndex(
                name: "IX_Ticket_UserId",
                table: "SupportTickets",
                newName: "IX_SupportTickets_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SupportMessage_TicketId",
                table: "SupportMessages",
                newName: "IX_SupportMessages_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_SupportMessage_SenderId",
                table: "SupportMessages",
                newName: "IX_SupportMessages_SenderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SupportTickets",
                table: "SupportTickets",
                column: "TicketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SupportMessages",
                table: "SupportMessages",
                column: "SupportMessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_SupportMessages_IdentityUsers_SenderId",
                table: "SupportMessages",
                column: "SenderId",
                principalTable: "IdentityUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SupportMessages_SupportTickets_TicketId",
                table: "SupportMessages",
                column: "TicketId",
                principalTable: "SupportTickets",
                principalColumn: "TicketId");

            migrationBuilder.AddForeignKey(
                name: "FK_SupportTickets_IdentityUsers_UserId",
                table: "SupportTickets",
                column: "UserId",
                principalTable: "IdentityUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupportMessages_IdentityUsers_SenderId",
                table: "SupportMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_SupportMessages_SupportTickets_TicketId",
                table: "SupportMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_SupportTickets_IdentityUsers_UserId",
                table: "SupportTickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SupportTickets",
                table: "SupportTickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SupportMessages",
                table: "SupportMessages");

            migrationBuilder.RenameTable(
                name: "SupportTickets",
                newName: "Ticket");

            migrationBuilder.RenameTable(
                name: "SupportMessages",
                newName: "SupportMessage");

            migrationBuilder.RenameIndex(
                name: "IX_SupportTickets_UserId",
                table: "Ticket",
                newName: "IX_Ticket_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SupportMessages_TicketId",
                table: "SupportMessage",
                newName: "IX_SupportMessage_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_SupportMessages_SenderId",
                table: "SupportMessage",
                newName: "IX_SupportMessage_SenderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ticket",
                table: "Ticket",
                column: "TicketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SupportMessage",
                table: "SupportMessage",
                column: "SupportMessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_SupportMessage_IdentityUsers_SenderId",
                table: "SupportMessage",
                column: "SenderId",
                principalTable: "IdentityUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SupportMessage_Ticket_TicketId",
                table: "SupportMessage",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "TicketId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_IdentityUsers_UserId",
                table: "Ticket",
                column: "UserId",
                principalTable: "IdentityUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
