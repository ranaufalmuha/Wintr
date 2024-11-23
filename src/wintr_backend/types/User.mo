import Text "mo:base/Text";
import Principal "mo:base/Principal";
import SocialTypes "./Social";
import ComponentTypes "./Component";

module {
    public type Username = Text;

    public type Profile = {
        principalId : Principal;
        profileUrl : ?Text;
        username : Username;
        displayName : ?Text;
        bio : ?Text;
        backgroundStyle : ?BackgroundStyle;
        socialLinks : ?[SocialTypes.Social];
        components : ?[ComponentTypes.ComponentGroup];
    };

    public type BackgroundStyle = {
        color : Text;
        url : ?Text;
    };
};
