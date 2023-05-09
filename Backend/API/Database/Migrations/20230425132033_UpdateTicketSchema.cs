using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTicketSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupportMessages_IdentityUsers_SenderId",
                table: "SupportMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_SupportMessages_SupportTickets_TicketId",
                table: "SupportMessages");

            migrationBuilder.RenameColumn(
                name: "SubmitTime",
                table: "SupportTickets",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "TicketId",
                table: "SupportTickets",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "SupportMessages",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "SendTime",
                table: "SupportMessages",
                newName: "SentAt");

            migrationBuilder.RenameColumn(
                name: "SupportMessageId",
                table: "SupportMessages",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_SupportMessages_SenderId",
                table: "SupportMessages",
                newName: "IX_SupportMessages_UserId");

            migrationBuilder.AlterColumn<int>(
                name: "TicketId",
                table: "SupportMessages",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SupportMessages_IdentityUsers_UserId",
                table: "SupportMessages",
                column: "UserId",
                principalTable: "IdentityUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction,
                onUpdate: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SupportMessages_SupportTickets_TicketId",
                table: "SupportMessages",
                column: "TicketId",
                principalTable: "SupportTickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction,
                onUpdate: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupportMessages_IdentityUsers_UserId",
                table: "SupportMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_SupportMessages_SupportTickets_TicketId",
                table: "SupportMessages");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "SupportTickets",
                newName: "SubmitTime");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "SupportTickets",
                newName: "TicketId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "SupportMessages",
                newName: "SenderId");

            migrationBuilder.RenameColumn(
                name: "SentAt",
                table: "SupportMessages",
                newName: "SendTime");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "SupportMessages",
                newName: "SupportMessageId");

            migrationBuilder.RenameIndex(
                name: "IX_SupportMessages_UserId",
                table: "SupportMessages",
                newName: "IX_SupportMessages_SenderId");

            migrationBuilder.AlterColumn<int>(
                name: "TicketId",
                table: "SupportMessages",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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
        }
    }
}
