module.exports = {
    status: {
        changing: false,
        statusText: "this is a dumby text",
        statusType: "online", //Types are: dnd, online, offline, idle
    },
    handler: {
        ownerId: "805166992432431124",
    },
    logger: {
        dmLogger: "on",
    },
    scrap: {
        MemberName: {
            Log: false,
            WriteInFile: true,
        },
        MemberAvatar: {
            Log: false,
            WriteInFile: false,
        },
        MemberStatus:{
            Log: false,
            WriteInFile: false,
        },
        // * This Works If Bot has permission
        ChannelRole:{
            Log: false,
            WriteInFile:true,
        },
        ChannelName:{
            Log: false,
            WriteInFile:false,
        },
    },
    rpc: {
        buttonOneName: "",
        buttonOneUrl: "",
        buttonTwoName: "",
        buttonTwoUrl: "",
        details: "",
        largeImageKey: "",
        largeImageText:"",
        clientId: "",
        rpcOn: "true"
    }
}