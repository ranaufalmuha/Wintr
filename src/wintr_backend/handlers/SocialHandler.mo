import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

import SocialTypes "./../types/Social";
import ResponseTypes "./../types/Response";

module {
    public class SocialHandler() {
        type Social = SocialTypes.Social;
        type ApiResponse<T> = ResponseTypes.ApiResponse<T>;

        // Validate if platform exists in allowed platforms
        public func isValidPlatform(platform : Text) : Bool {
            for (valid in SocialTypes.platforms.vals()) {
                if (Text.equal(valid, platform)) return true;
            };
            false;
        };

        public func addSocial(socials : ?[Social], newSocial : Social) : ApiResponse<[Social]> {
            // Validate platform first
            if (not isValidPlatform(newSocial.platform)) {
                return #err(#InvalidInput("Invalid platform"));
            };

            let currentSocials = switch (socials) {
                case null { [] };
                case (?existing) { existing };
            };

            let newId = switch (Array.size(currentSocials)) {
                case 0 { 0 };
                case (n) { n };
            };

            let finalSocial = {
                newSocial with
                id = newId;
            };

            #ok(Array.append(currentSocials, [finalSocial]));
        };

        public func removeSocial(socials : [Social], id : Nat) : ApiResponse<[Social]> {
            let buffer = Buffer.Buffer<Social>(socials.size());

            for (social in socials.vals()) {
                if (social.id != id) {
                    buffer.add(social);
                };
            };

            let result = Array.tabulate<Social>(
                buffer.size(),
                func(i : Nat) : Social {
                    let social = buffer.get(i);
                    {
                        social with
                        id = i;
                    };
                },
            );

            #ok(result);
        };

        public func updateSocial(
            socials : [Social],
            id : Nat,
            updatedSocial : Social,
        ) : ApiResponse<[Social]> {
            // Validate platform first
            if (not isValidPlatform(updatedSocial.platform)) {
                return #err(#InvalidInput("Invalid platform"));
            };

            #ok(
                Array.map<Social, Social>(
                    socials,
                    func(social : Social) : Social {
                        if (social.id == id) {
                            {
                                updatedSocial with
                                id = social.id;
                            };
                        } else {
                            social;
                        };
                    },
                )
            );
        };
    };
};
