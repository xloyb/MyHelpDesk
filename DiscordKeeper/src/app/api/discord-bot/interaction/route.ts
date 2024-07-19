// import { APIInteractionResponse, InteractionType } from "discord-api-types/v10";
// import { NextResponse } from "next/server";
// import { PUBLIC_KEY } from "../../../../../config";
// import getCommands from "../../../../../utils/getCommands";
// import { verifyInteractionRequest } from "../../../../../utils/verify-discord-request";

// export async function POST(req: Request) {
//   try {
//     const verifyRes = await verifyInteractionRequest(req, PUBLIC_KEY);

//     if (!verifyRes.isValid || !verifyRes.interaction) {
//       return new NextResponse("Invalid request", { status: 401 });
//     }
//     const { interaction } = verifyRes;

//     if (interaction.type === InteractionType.Ping) {
//       return NextResponse.json({ type: 1 });
//     }

//     // get all commands
//     const allCommands = await getCommands();

//     // execute command
//     let reply: APIInteractionResponse | null = null;
//     const commandName = interaction.data.name + ".ts";
//     if (allCommands[commandName]) {
//       reply = await allCommands[commandName].execute(interaction);
//     }

//     if (!reply) throw new Error();
//     return NextResponse.json(reply);
//   } catch (error: any) {
//     console.log(error);
//     console.log("SOMETHING WENT WRONG");
//     return NextResponse.error();
//   }
// }


import { APIInteractionResponse, InteractionType, APIChatInputApplicationCommandInteraction, APIApplicationCommandInteractionDataOption } from "discord-api-types/v10";
import { NextResponse } from "next/server";
import { PUBLIC_KEY, BOT_TOKEN, DISCORD_TICKETS_CHANNEL_ID } from "../../../../../config";
import getCommands from "../../../../../utils/getCommands";
import { verifyInteractionRequest } from "../../../../../utils/verify-discord-request";
import { sendDiscordMessage } from "../../../../../utils/sendDiscordMessage";

export async function POST(req: Request) {
  try {
    const verifyRes = await verifyInteractionRequest(req, PUBLIC_KEY);

    if (!verifyRes.isValid || !verifyRes.interaction) {
      return new NextResponse("Invalid request", { status: 401 });
    }
    const { interaction } = verifyRes;

    if (interaction.type === InteractionType.Ping) {
      return NextResponse.json({ type: 1 });
    }

    // get all commands
    const allCommands = await getCommands();

    // execute command
    let reply: APIInteractionResponse | null = null;
    const commandName = interaction.data.name + ".ts";
    if (allCommands[commandName]) {
      reply = await allCommands[commandName].execute(interaction);

      // Example of sending an embed message when a new ticket is created
      if (commandName === 'createTicket.ts' && isChatInputCommand(interaction)) {
        const ticketDetails = interaction.data.options?.reduce<Record<string, any>>((acc, option) => {
          if ('value' in option) {
            acc[option.name] = option.value;
          }
          return acc;
        }, {});

        const embedContent = {
          embeds: [{
            title: 'New Ticket Created',
            description: `A new ticket has been created:\n\n**Title**: ${ticketDetails?.title}\n**Description**: ${ticketDetails?.description}`,
            color: 0x00AE86
          }]
        };

        await sendDiscordMessage(DISCORD_TICKETS_CHANNEL_ID, embedContent, BOT_TOKEN);
      }
    }

    if (!reply) throw new Error();
    return NextResponse.json(reply);
  } catch (error: any) {
    console.log(error);
    console.log("SOMETHING WENT WRONG");
    return NextResponse.error();
  }
}

// Type guard to check if interaction is a ChatInputCommand
function isChatInputCommand(interaction: any): interaction is { data: APIChatInputApplicationCommandInteraction["data"] } {
  return interaction.data && 'options' in interaction.data;
}
