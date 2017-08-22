function permInstructions(permission) {
	switch (permission){
		case "ADMINISTRATOR":
			return 'https://goo.gl/Q1AwBx';
			break;
		case "CREATE_INSTANT_INVITE":
			return 'https://goo.gl/MgWd3E';
			break;
		case "KICK_MEMBERS":
			return 'https://goo.gl/7KhVj7';
		break;
		case "BAM_MEMBERS":
			return	'https://goo.gl/N4UDnu'
		break;
		case "MANAGE_GUILD":
			return 	'https://goo.gl/RSvH9k'
		break;
		case "ADD_REACTIONS":
			return	'https://goo.gl/uyHGjw'
		break;
		case "VIEW_AUDIT_LOG":
			return	'https://goo.gl/S3yz2a'
		break;
		case "READ_MESSAGES":
			return	''
		break;
		case "SEND_TTS_MESSAGES":
			return	''
		break;
		case "MANAGE_MESSAGES":
			return	''
		break;
		case "EMBED_LINKS":
			return	''
		break;
		case "ATTACH_FILES":
			return	''
		break;
		case "READ_MESSAGE_HISTORY":
			return	''
		break;
		case "MENTION_EVERYONE":
			return	''
		break;
		case "USE_EXTERNAL_EMOJIS":
			return
		break;
		case "CONNECT":
			return
		break;
		case "SPEAK":
			return
		break;
		case "MUTE_MEMBERS":
			return
		break;
		case "DEAFEN_MEMBERS":
			return
		break;
		case "MOVE_MEMBERS":
			return
		break;
		case "USE_VAD":
			return
		break;
		case "CHANGE_NICKNAME":
			return
		break;
		case "MANAGE_NICKNAMES":
			return
		break;
		case "MANAGE_ROLES":
			return
		break;
		case "MANAGE_WEBHOOKS":
			return
		break;
		case "MANAGE_EMOJIS":
			return
		break;

	}
}

module.exports = permInstructions
