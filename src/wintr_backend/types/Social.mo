module {
    public type SocialId = Nat;
    public type SocialPlatform = Text;

    public type Social = {
        id : SocialId;
        platform : SocialPlatform;
        directUrl : Text;
        iconUrl : ?Text;
    };

    public let platforms : [SocialPlatform] = [
        "discord",
        "facebook",
        "facebook_messenger",
        "github",
        "instagram",
        "linkedin",
        "line",
        "medium",
        "pinterest",
        "quora",
        "reddit",
        "snapchat",
        "spotify",
        "telegram",
        "threads",
        "tiktok",
        "twitch",
        "viber",
        "vk",
        "whatsapp",
        "x",
        "youtube",
    ];
};
