function permInstructions(permission) {

	permissionsObjectInstructions = {
		ADMINISTRATOR 		   : "Administrator",
		CREATE_INSTANT_INVITE  : "Create Instant Invite",
		KICK_MEMBERS		   : "Kick members",
		BAM_MEMBERS			   : "Ban members",
		MANAGE_GUILD		   : "Manage guild",
		ADD_REACTIONS		   : "Add reactions",  
	}
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
			return	'https://goo.gl/DCYz5G'
		break;
		case "SEND_TTS_MESSAGES":
			return	'https://goo.gl/eftfHq'
		break;
		case "MANAGE_MESSAGES":
			return	'https://goo.gl/NBXRjH'
		break;
		case "EMBED_LINKS":
			return	'https://goo.gl/b6MwDP'
		break;
		case "ATTACH_FILES":
			return	'https://goo.gl/abT6vd'
		break;
		case "READ_MESSAGE_HISTORY":
			return	'https://goo.gl/DCYz5G'
		break;
		case "MENTION_EVERYONE":
			return	'https://goo.gl/toX2vh'
		break;
		case "USE_EXTERNAL_EMOJIS":
			return	'https://goo.gl/17i9AY'
		break;
		case "CONNECT":
			return	'https://goo.gl/WDP3Rr'
		break;
		case "SPEAK":
			return	'https://goo.gl/wLURoA'
		break;
		case "MUTE_MEMBERS":
			return	'https://goo.gl/wWiwrt'
		break;
		case "DEAFEN_MEMBERS":
			return	'https://goo.gl/EqqQr3'
		break;
		case "MOVE_MEMBERS":
			return	'https://goo.gl/oDpmKy'
		break;
		case "USE_VAD":
			return	'https://goo.gl/EQqvRB'
		break;
		case "CHANGE_NICKNAME":
			return	'https://goo.gl/YTDeos'
		break;
		case "MANAGE_NICKNAMES":
			return	'https://goo.gl/PBRc8W'
		break;
		case "MANAGE_ROLES":
			return	'https://goo.gl/wKwkNM'
		break;
		case "MANAGE_WEBHOOKS":
			return	'https://goo.gl/59uu7R'
		break;
		case "MANAGE_EMOJIS":
			return	'https://goo.gl/avdATD'
		break;

	}
}

module.exports = permInstructions
